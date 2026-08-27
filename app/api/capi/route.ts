import { NextRequest } from 'next/server'
import { createHash } from 'crypto'

/**
 * Meta Conversions API relay.
 *
 * The browser pixel is increasingly blocked (iOS, ad blockers, ITP), so every
 * conversion is mirrored server-side. Client and server share an `eventId` and
 * Meta dedupes on it. See lib/tracking.ts.
 *
 * PII is SHA-256 hashed here, server-side, and raw values are never persisted.
 */

const GRAPH_VERSION = 'v21.0'

interface CapiBody {
  eventName?: string
  eventId?: string
  eventSourceUrl?: string
  fbc?: string
  fbp?: string
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  state?: string
  campaign?: string
  variant?: string
}

/** Meta requires lowercase, trimmed, SHA-256 hex. */
function hash(value: string | undefined): string | undefined {
  if (!value) return undefined
  const normalized = value.trim().toLowerCase()
  if (!normalized) return undefined
  return createHash('sha256').update(normalized).digest('hex')
}

/** Phones must be digits only, E.164 without the leading +, before hashing. */
function hashPhone(value: string | undefined): string | undefined {
  if (!value) return undefined
  let digits = value.replace(/\D/g, '')
  if (!digits) return undefined
  if (digits.length === 10) digits = `1${digits}`
  return createHash('sha256').update(digits).digest('hex')
}

export async function POST(request: NextRequest) {
  const token = process.env.FB_CAPI_ACCESS_TOKEN
  const datasetId = process.env.FB_CAPI_DATASET_ID

  // Not configured yet. Accept and no-op so the funnel is never blocked.
  if (!token || !datasetId) {
    return Response.json({ ok: true, skipped: 'capi_not_configured' })
  }

  let body: CapiBody
  try {
    body = (await request.json()) as CapiBody
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { eventName, eventId } = body
  if (!eventName || !eventId) {
    return Response.json(
      { error: 'eventName and eventId are required' },
      { status: 422 }
    )
  }

  const clientIp =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    undefined
  const userAgent = request.headers.get('user-agent') ?? undefined

  const userData: Record<string, string | string[]> = {}
  const em = hash(body.email)
  const ph = hashPhone(body.phone)
  const fn = hash(body.firstName)
  const ln = hash(body.lastName)
  const st = hash(body.state)

  if (em) userData.em = [em]
  if (ph) userData.ph = [ph]
  if (fn) userData.fn = [fn]
  if (ln) userData.ln = [ln]
  if (st) userData.st = [st]
  if (body.fbc) userData.fbc = body.fbc
  if (body.fbp) userData.fbp = body.fbp
  if (clientIp) userData.client_ip_address = clientIp
  if (userAgent) userData.client_user_agent = userAgent

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: body.eventSourceUrl,
        action_source: 'website',
        user_data: userData,
        custom_data: {
          campaign: body.campaign,
          variant: body.variant,
        },
      },
    ],
  }

  if (process.env.FB_CAPI_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.FB_CAPI_TEST_EVENT_CODE
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${datasetId}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    if (!res.ok) {
      const detail = await res.text()
      console.error('[capi] Meta rejected event:', res.status, detail)
      // Still 200 to the browser. A tracking failure must not surface to users.
      return Response.json({ ok: false, error: 'upstream_rejected' })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error('[capi] request failed:', err instanceof Error ? err.message : err)
    return Response.json({ ok: false, error: 'request_failed' })
  }
}
