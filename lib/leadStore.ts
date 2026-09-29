/**
 * Match data parking lot.
 *
 * Server only. Nothing here may be imported into a client component: it reads
 * KV_REST_API_TOKEN, which must never reach the browser.
 *
 * A conversion arrives in two halves that are hours or days apart. At `Lead`
 * time the browser is present, so we hold `fbc`, `fbp`, the client IP and user
 * agent, and whatever the form gave us. When the client's n8n later tells us
 * that submission qualified, all it knows is the Typeform `entry_id` — no
 * browser, no cookies, no IP that means anything.
 *
 * Meta attributes a server event back to an ad almost entirely on `fbc` (which
 * carries the original `fbclid`) and `fbp`. Without them a `Qualified` event
 * lands in the dataset with no ad attached, which is exactly what has been
 * happening: `Qualified` and `Retained` show in Events Manager with a blank
 * event match quality and never appear in Ads Manager at all.
 *
 * So we park the match data against the `entry_id` at Lead time and pick it up
 * again when the qualification signal arrives.
 *
 * PII NOTE: only SHA-256 hashes are stored, never raw email or phone. Hashing
 * already happens at Lead time in /api/capi, so this stores the same values
 * that go to Meta and nothing more.
 *
 * Backed by Upstash Redis over its REST API — no SDK, just fetch. If
 * KV_REST_API_URL / KV_REST_API_TOKEN are unset every function no-ops and the
 * caller carries on without match data. Degrading is always better than
 * breaking the funnel.
 */

/** Exactly the `user_data` shape Meta's CAPI expects, already hashed. */
export interface MatchData {
  em?: string[]
  ph?: string[]
  fn?: string[]
  ln?: string[]
  st?: string[]
  fbc?: string
  fbp?: string
  client_ip_address?: string
  client_user_agent?: string
}

/**
 * Which ad produced this lead.
 *
 * Parked because a signed case is the only number that should drive budget, and
 * Meta cannot give it to us. A case signs days or weeks after the click, long
 * past Meta's 7-day attribution window, so it attributes to nothing no matter
 * how good the match data is. Holding the ad set against the entry_id means the
 * join is exact and has no window at all.
 *
 * adSet comes from utm_term, which the ad URLs populate with {{adset.name}}.
 */
export interface LeadAttribution {
  campaign?: string
  variant?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  /** Ad set name, from utm_term. The field that answers "which audience". */
  adSet?: string
  landingPath?: string
  /**
   * Where this person came from the first time we saw them, which may be a
   * different channel entirely from the one that converted them. Without it a
   * case Growth Channel sourced and Meta retargeting closed is credited wholly
   * to Meta, and counted a second time by Growth Channel's own pixel.
   */
  firstTouch?: Record<string, unknown>
}

export interface ParkedLead {
  userData: MatchData
  eventSourceUrl?: string
  campaign?: string
  variant?: string
  attribution?: LeadAttribution
  /** Unix seconds. Lets the caller see how stale the attribution is. */
  parkedAt: number
}

const PREFIX = 'smj:match:'

function config(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return null
  return { url: url.replace(/\/$/, ''), token }
}

function ttlSeconds(): number {
  const days = Number(process.env.LEAD_MATCH_TTL_DAYS ?? 30)
  return (Number.isFinite(days) && days > 0 ? days : 30) * 86_400
}

/** One Redis command over the REST API. Returns null on any failure. */
async function command(args: (string | number)[]): Promise<unknown> {
  const cfg = config()
  if (!cfg) return null
  try {
    const res = await fetch(cfg.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
      cache: 'no-store',
    })
    if (!res.ok) {
      console.error('[leadStore] redis rejected:', res.status, await res.text())
      return null
    }
    const json = (await res.json()) as { result?: unknown }
    return json.result ?? null
  } catch (err) {
    console.error('[leadStore] request failed:', err instanceof Error ? err.message : err)
    return null
  }
}

/**
 * Park a lead's match data under its Typeform entry_id.
 *
 * Never throws. A storage failure must not fail the Lead event that triggered
 * it — a lead reported without future attribution beats a lead not reported.
 */
export async function parkLead(entryId: string, lead: Omit<ParkedLead, 'parkedAt'>): Promise<void> {
  if (!entryId) return
  const payload: ParkedLead = { ...lead, parkedAt: Math.floor(Date.now() / 1000) }
  await command(['SET', `${PREFIX}${entryId}`, JSON.stringify(payload), 'EX', ttlSeconds()])
}

/** Retrieve parked match data. Null when absent, expired, or unconfigured. */
export async function recallLead(entryId: string): Promise<ParkedLead | null> {
  if (!entryId) return null
  const raw = await command(['GET', `${PREFIX}${entryId}`])
  if (typeof raw !== 'string') return null
  try {
    return JSON.parse(raw) as ParkedLead
  } catch {
    return null
  }
}

/** True when the store is wired up. Used by health checks and the dashboard. */
export function matchStoreConfigured(): boolean {
  return config() !== null
}
