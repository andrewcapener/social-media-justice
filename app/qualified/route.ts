import { NextRequest } from 'next/server'
import { createHash } from 'crypto'

/**
 * The qualification relay.
 *
 * Only qualified leads get redirected to the retainer; unqualified ones stay on
 * the Typeform and see its own thank-you screen. So the redirect itself is the
 * qualification signal, and it is the only one observable from our side: the
 * form is cross-origin, so we cannot see inside it.
 *
 * Pointing that existing redirect here rather than straight at the retainer
 * turns it into a `Qualified` conversion we can report to Meta, and costs the
 * client one URL change instead of instrumenting n8n.
 *
 * Why this matters more than it looks: today the campaigns optimise on `Lead`,
 * which fires for every completed form including the ~40% that never qualify.
 * Meta is therefore being taught to find people who fill in forms. Firing
 * `Qualified` lets it learn to find people who have a case.
 *
 *   /qualified?next=<retainer url>&entry_id=<typeform entry_id>
 *
 * The redirect happens regardless of whether reporting succeeds. A tracking
 * failure must never strand someone between the form and their retainer.
 */

const GRAPH_VERSION = 'v21.0'

/**
 * Open-redirect guard.
 *
 * `next` arrives in a URL, so without an allowlist this endpoint would happily
 * bounce anyone anywhere while wearing our domain. Hosts come from
 * RETAINER_ALLOWED_HOSTS (comma separated); anything else falls back to the
 * configured retainer, and failing that to /thank-you.
 */
function safeDestination(next: string | null): string {
  const fallback =
    process.env.RETAINER_REDIRECT_URL ?? 'https://www.socialmediajusticetoday.com/thank-you'
  if (!next) return fallback

  let url: URL
  try {
    url = new URL(next)
  } catch {
    return fallback
  }
  if (url.protocol !== 'https:') return fallback

  const allowed = (process.env.RETAINER_ALLOWED_HOSTS ?? '')
    .split(',')
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean)

  const host = url.hostname.toLowerCase()
  const ok = allowed.some((a) => host === a || host.endsWith(`.${a}`))
  return ok ? url.toString() : fallback
}

async function reportQualified(eventId: string, sourceUrl: string, req: NextRequest) {
  const token = process.env.FB_CAPI_ACCESS_TOKEN
  const datasetId = process.env.FB_CAPI_DATASET_ID
  if (!token || !datasetId) return

  const userData: Record<string, string> = {}
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    ''
  const ua = req.headers.get('user-agent') ?? ''
  if (ip) userData.client_ip_address = ip
  if (ua) userData.client_user_agent = ua

  const cookie = req.headers.get('cookie') ?? ''
  const pick = (name: string) =>
    cookie.split('; ').find((c) => c.startsWith(`${name}=`))?.split('=')[1]
  const fbc = pick('_fbc')
  const fbp = pick('_fbp')
  if (fbc) userData.fbc = fbc
  if (fbp) userData.fbp = fbp

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: 'Qualified',
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: sourceUrl,
        action_source: 'website',
        user_data: userData,
      },
    ],
  }
  if (process.env.FB_CAPI_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.FB_CAPI_TEST_EVENT_CODE
  }

  await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${datasetId}/events?access_token=${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  )
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const destination = safeDestination(searchParams.get('next'))

  /**
   * The Typeform entry_id is the dedup key we already use for `Lead`, so
   * reusing it here ties the qualification back to the exact submission. When
   * it is absent we hash the request so the event still has a stable id rather
   * than none, which Meta would treat as unmergeable.
   */
  const entryId = searchParams.get('entry_id')
  const eventId =
    entryId ??
    createHash('sha256')
      .update(`${Date.now()}-${request.headers.get('user-agent') ?? ''}`)
      .digest('hex')
      .slice(0, 32)

  try {
    await reportQualified(eventId, request.nextUrl.toString(), request)
  } catch {
    // Reporting is never allowed to block the handoff to the retainer.
  }

  return Response.redirect(destination, 302)
}
