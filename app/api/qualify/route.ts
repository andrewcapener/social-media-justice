import { NextRequest } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { recallLead, matchStoreConfigured } from '@/lib/leadStore'

/**
 * Server-to-server qualification signal.
 *
 * The client's n8n knows which submissions qualify and which sign. It has been
 * firing `Qualified` and `Retained` straight at Meta, which works — both events
 * are in the dataset — but they arrive with no `fbc`/`fbp`, because n8n never
 * saw the browser. Meta therefore cannot tie them to an ad, their event match
 * quality is blank, and they never surface in Ads Manager.
 *
 * Posting here instead solves that. We hold the match data from the original
 * `Lead` (see lib/leadStore.ts) and re-attach it on the way out, so the same
 * event lands attributable.
 *
 *   POST /api/qualify
 *   Authorization: Bearer <QUALIFY_WEBHOOK_SECRET>
 *   { "entry_id": "8133877981788631187665", "event": "Qualified" }
 *
 * Batches are accepted too, since backfills come in runs:
 *   { "events": [ { "entry_id": "...", "event": "Qualified" }, ... ] }
 *
 * The response reports Meta's actual verdict per item rather than a bare 200.
 * A previous backfill of eight events was lost because `fbtrace_id` came back
 * on the error responses and looked like success, so the caller needs to be
 * able to see `events_received` and any `messages` for itself.
 */

const GRAPH_VERSION = 'v21.0'
const EVENTS = ['Qualified', 'Retained'] as const
type EventName = (typeof EVENTS)[number]

/**
 * Meta rejects events older than 7 days outright. Backfills routinely brush
 * that edge, so clamp just inside it and say so rather than being rejected.
 */
const MAX_AGE_SECONDS = 6.5 * 86_400

interface Item {
  entry_id?: string
  entryId?: string
  event?: string
  event_time?: number
}

interface Result {
  entry_id: string
  event: EventName | null
  status: 'sent' | 'rejected' | 'invalid'
  matched: boolean
  event_time_clamped?: boolean
  events_received?: number
  detail?: string
}

function authorized(request: NextRequest): boolean {
  const secret = process.env.QUALIFY_WEBHOOK_SECRET
  if (!secret) return false
  const header = request.headers.get('authorization') ?? ''
  const presented = header.replace(/^Bearer\s+/i, '')
  const a = Buffer.from(presented)
  const b = Buffer.from(secret)
  // timingSafeEqual throws on a length mismatch, which would itself leak length.
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

function normalizeEvent(value: string | undefined): EventName | null {
  if (!value) return null
  const match = EVENTS.find((e) => e.toLowerCase() === value.trim().toLowerCase())
  return match ?? null
}

async function send(item: Item): Promise<Result> {
  const entryId = (item.entry_id ?? item.entryId ?? '').trim()
  const event = normalizeEvent(item.event)

  if (!entryId || !event) {
    return {
      entry_id: entryId,
      event,
      status: 'invalid',
      matched: false,
      detail: !entryId
        ? 'entry_id is required'
        : `event must be one of ${EVENTS.join(', ')}`,
    }
  }

  const parked = await recallLead(entryId)

  const now = Math.floor(Date.now() / 1000)
  const floor = now - MAX_AGE_SECONDS
  let eventTime = Number.isFinite(item.event_time) ? Math.floor(Number(item.event_time)) : now
  let clamped = false
  if (eventTime < floor) {
    eventTime = floor
    clamped = true
  } else if (eventTime > now) {
    eventTime = now
    clamped = true
  }

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: event,
        event_time: eventTime,
        event_id: entryId,
        // Reusing entry_id as event_id means that if n8n keeps firing its own
        // copy, Meta collapses the pair instead of counting two conversions.
        event_source_url: parked?.eventSourceUrl,
        action_source: parked?.eventSourceUrl ? 'website' : 'system_generated',
        user_data: parked?.userData ?? {},
        custom_data: {
          campaign: parked?.campaign,
          variant: parked?.variant,
        },
      },
    ],
  }
  if (process.env.FB_CAPI_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.FB_CAPI_TEST_EVENT_CODE
  }

  const base: Result = {
    entry_id: entryId,
    event,
    status: 'sent',
    matched: Boolean(parked),
    ...(clamped ? { event_time_clamped: true } : {}),
  }

  const token = process.env.FB_CAPI_ACCESS_TOKEN
  const datasetId = process.env.FB_CAPI_DATASET_ID
  if (!token || !datasetId) {
    return { ...base, status: 'rejected', detail: 'capi_not_configured' }
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
    const text = await res.text()
    if (!res.ok) {
      console.error('[qualify] Meta rejected:', entryId, res.status, text)
      return { ...base, status: 'rejected', detail: text.slice(0, 500) }
    }
    let received: number | undefined
    try {
      received = (JSON.parse(text) as { events_received?: number }).events_received
    } catch {
      /* leave undefined */
    }
    return { ...base, events_received: received }
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err)
    console.error('[qualify] request failed:', entryId, detail)
    return { ...base, status: 'rejected', detail }
  }
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return Response.json({ error: 'unauthorized' }, { status: 401 })
  }

  let body: { events?: Item[] } & Item
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'invalid JSON' }, { status: 400 })
  }

  const items = Array.isArray(body.events) ? body.events : [body]
  if (items.length === 0 || items.length > 200) {
    return Response.json(
      { error: 'send between 1 and 200 events' },
      { status: 422 }
    )
  }

  const results: Result[] = []
  for (const item of items) {
    results.push(await send(item))
  }

  return Response.json({
    ok: results.every((r) => r.status === 'sent'),
    match_store_configured: matchStoreConfigured(),
    // `matched: false` means the entry_id had no parked Lead, so the event
    // went out unattributable. Usually the lead predates this endpoint or the
    // TTL expired; a run of them means the store is misconfigured.
    unmatched: results.filter((r) => !r.matched).length,
    results,
  })
}
