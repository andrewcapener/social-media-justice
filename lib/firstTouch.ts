'use client'

import { DELIVERY_KEY_PARAMS, readUtm, readDeliveryKeys } from '@/lib/tracking'

/**
 * First-touch attribution.
 *
 * The question this exists to answer: how many signed cases did Growth Channel
 * source and Meta retargeting close?
 *
 * Without it that case is invisible. Someone arrives from a programmatic ad,
 * leaves without submitting, joins the Meta retargeting audience because they
 * hit the site, comes back on a Meta ad and signs. Every system involved
 * reports it as its own: Meta claims it on last click, Growth Channel claims it
 * on its own conversion pixel, and summing them counts one case twice. That is
 * the same double-count that made a $172 lead read as $86 earlier in this
 * account, and it is worse here because these are signed cases.
 *
 * So we record where someone came from the FIRST time we ever saw them, keep it
 * for the length of the retargeting window, and send it alongside the
 * converting session's source. Then a signed case carries both ends: who
 * sourced it and who closed it.
 *
 * localStorage rather than a cookie: it is never sent on every request, it
 * survives the cross-origin hop to the client's Typeform, and it is per-device,
 * which is the same resolution the retargeting audiences work at anyway.
 */

const KEY = 'smj_first_touch'

/**
 * 180 days, matching the retargeting audience window. A first touch older than
 * the window cannot have produced the retargeting impression that closed, so
 * keeping it would credit a channel that had nothing to do with the outcome.
 */
const TTL_MS = 180 * 24 * 60 * 60 * 1000

export interface FirstTouch {
  at: number
  landingPath?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
  /** Growth Channel delivery macros, when the visit came from the DSP. */
  delivery?: Record<string, string>
}

function read(): FirstTouch | null {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as FirstTouch
    if (!parsed?.at || Date.now() - parsed.at > TTL_MS) return null
    return parsed
  } catch {
    // Private browsing, blocked storage, corrupt value. Attribution is a
    // reporting nicety and must never break the funnel.
    return null
  }
}

/**
 * Record this visit as the first touch, if we have not seen this device before.
 *
 * Deliberately never overwrites. The whole point is the ORIGINAL source, so a
 * later retargeting visit must not clobber the programmatic one that sourced it.
 * Safe to call on every page load.
 */
export function captureFirstTouch(): FirstTouch | null {
  if (typeof window === 'undefined') return null

  const existing = read()
  if (existing) return existing

  const utm = readUtm()
  const delivery = readDeliveryKeys()

  const touch: FirstTouch = {
    at: Date.now(),
    landingPath: window.location.pathname,
    // Where they came from when there are no UTMs at all, which is how organic
    // and unparameterised placements show up.
    referrer: document.referrer ? new URL(document.referrer).hostname : undefined,
    ...utm,
    ...(Object.keys(delivery).length ? { delivery } : {}),
  }

  try {
    window.localStorage.setItem(KEY, JSON.stringify(touch))
  } catch {
    // Unstorable is fine; the caller still gets this visit's values.
  }
  return touch
}

/** The stored first touch, or null. Does not create one. */
export function getFirstTouch(): FirstTouch | null {
  if (typeof window === 'undefined') return null
  return read()
}

/**
 * Flatten to the handful of fields worth sending to our server.
 *
 * Only the source-identifying ones. The full delivery macro set stays on the
 * device: it is wide, it changes per DSP, and none of it is needed to answer
 * "which channel sourced this case".
 */
export function firstTouchSummary(t: FirstTouch | null) {
  if (!t) return undefined
  return {
    at: t.at,
    landingPath: t.landingPath,
    referrer: t.referrer,
    utmSource: t.utmSource,
    utmMedium: t.utmMedium,
    utmCampaign: t.utmCampaign,
    utmTerm: t.utmTerm,
    clickId: t.delivery?.click_id,
    publisher: t.delivery?.publisher,
    lineItemId: t.delivery?.line_item_id,
  }
}

/** Re-exported so callers do not need two imports to know what a macro is. */
export { DELIVERY_KEY_PARAMS }
