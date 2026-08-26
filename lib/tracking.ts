'use client'

/**
 * Client-side event tracking.
 *
 * Every conversion event is fired TWICE — once from the browser pixel and once
 * from the server via the Conversions API — sharing one `eventId`. Meta
 * deduplicates on (event_name, event_id), so this gives us the resilience of
 * server-side tracking without double-counting. Without a shared event_id the
 * client would report roughly 2x the real conversions.
 */

export interface UtmParams {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/** Cryptographically random event id, shared between pixel and CAPI. */
export function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export function readUtm(): UtmParams {
  if (typeof window === 'undefined') return {}
  const p = new URLSearchParams(window.location.search)
  return {
    utmSource: p.get('utm_source') ?? undefined,
    utmMedium: p.get('utm_medium') ?? undefined,
    utmCampaign: p.get('utm_campaign') ?? undefined,
    utmContent: p.get('utm_content') ?? undefined,
    utmTerm: p.get('utm_term') ?? undefined,
  }
}

/**
 * Programmatic delivery keys.
 *
 * The client's own analysis flags that segment-level CPA is currently
 * impossible for programmatic because spend is only keyed by campaign and date.
 * Fixing that needs these delivery keys captured at the landing page and
 * carried into the intake, so signed cases can be joined back to the line item,
 * creative, and audience that produced them.
 *
 * Growth Channel appends these as macros on the click URL. We read whatever is
 * present and pass it through; absent keys are simply omitted.
 *
 * ⚠️ Typeform silently DROPS hidden fields that are not declared on the form.
 * Each key below has to be added as a hidden field on the client's Typeform or
 * it will never reach their reporting.
 */
export const DELIVERY_KEY_PARAMS = [
  'click_id',
  'audience_id',
  'segment_id',
  'line_item_id',
  'creative_id',
  'placement',
  'publisher',
  'exchange',
  'device',
] as const

export function readDeliveryKeys(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const p = new URLSearchParams(window.location.search)
  const out: Record<string, string> = {}
  for (const key of DELIVERY_KEY_PARAMS) {
    const value = p.get(key)
    // Unreplaced macros (e.g. "{CLICK_ID}") are worse than nothing — they
    // pollute reporting with a value that looks real but means "not set".
    if (value && !value.startsWith('{') && !value.startsWith('%7B')) {
      out[key] = value
    }
  }
  const fbclid = p.get('fbclid')
  if (fbclid) out.fbclid = fbclid
  return out
}

/** Meta's click id / browser id cookies — required for good CAPI match quality. */
export function readMetaCookies(): { fbc?: string; fbp?: string } {
  if (typeof document === 'undefined') return {}
  const get = (name: string) =>
    document.cookie
      .split('; ')
      .find((c) => c.startsWith(`${name}=`))
      ?.split('=')[1]

  let fbc = get('_fbc')
  // If the cookie hasn't been written yet, synthesize it from fbclid so the
  // very first pageview still carries click attribution.
  if (!fbc && typeof window !== 'undefined') {
    const fbclid = new URLSearchParams(window.location.search).get('fbclid')
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`
  }

  return { fbc, fbp: get('_fbp') }
}

interface TrackOptions {
  eventId?: string
  campaign?: string
  variant?: string
  [key: string]: unknown
}

/** Fire a browser-side pixel event (Meta + GA). */
export function trackClient(eventName: string, opts: TrackOptions = {}): string {
  const eventId = opts.eventId ?? newEventId()
  if (typeof window === 'undefined') return eventId

  const { eventId: _omit, ...custom } = opts

  if (typeof window.fbq === 'function') {
    const standard = ['Lead', 'CompleteRegistration', 'ViewContent', 'Contact']
    const method = standard.includes(eventName) ? 'track' : 'trackCustom'
    window.fbq(method, eventName, custom, { eventID: eventId })
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, custom)
  }

  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event: eventName, ...custom })

  return eventId
}

/** Fire the matching server-side CAPI event. Never throws. */
export async function trackServer(
  eventName: string,
  eventId: string,
  opts: {
    campaign?: string
    variant?: string
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
    state?: string
  } = {}
): Promise<void> {
  try {
    const { fbc, fbp } = readMetaCookies()
    await fetch('/api/capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        eventId,
        eventSourceUrl: window.location.href,
        fbc,
        fbp,
        ...opts,
      }),
      keepalive: true,
    })
  } catch {
    // Tracking must never block or break the funnel.
  }
}

/** Fire both sides of a conversion event with a shared id. */
export async function trackConversion(
  eventName: string,
  opts: Parameters<typeof trackServer>[2] & Record<string, unknown> = {}
): Promise<string> {
  const eventId = newEventId()
  trackClient(eventName, { ...opts, eventId })
  await trackServer(eventName, eventId, opts)
  return eventId
}
