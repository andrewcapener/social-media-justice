'use client'

/**
 * Growth Channel (programmatic DSP) pixels.
 *
 * Two distinct pixels with different firing rules:
 *
 *   Retargeting, every page, on load. Injected site-wide from the layout.
 *   Conversion , ONLY on the event being optimized toward, never on page load.
 *
 * The conversion pixel is a plain <script src>, so it fires by being injected
 * into the DOM. That means it has to be appended at conversion time rather than
 * rendered in the layout, and it must be guarded against firing twice, a
 * duplicate conversion teaches the DSP's bidding model the wrong thing and
 * inflates reported performance.
 *
 * ⚠️ If these pixels are later moved into GTM, unset the corresponding env vars
 * here. Running them in both places double-fires every event.
 */

const CONVERSION_PIXEL = process.env.NEXT_PUBLIC_GC_CONVERSION_PIXEL

let conversionFired = false

/**
 * Fire the Growth Channel conversion pixel. Idempotent for the page lifetime.
 * Safe to call when unconfigured, it no-ops rather than throwing.
 */
export function fireGrowthChannelConversion(): void {
  if (typeof window === 'undefined') return
  if (!CONVERSION_PIXEL) return
  if (conversionFired) return

  conversionFired = true

  try {
    // Belt and braces, because the intake form redirects to the client's
    // webhook the instant it submits. An injected <script> can be cancelled
    // mid-flight when the page unloads, which would silently lose the
    // conversion, the exact event we cannot afford to drop.
    //
    // The script tag runs the vendor's full pixel logic when there is time.
    // The keepalive fetch guarantees the request itself survives navigation,
    // so the hit lands either way. The vendor dedupes on their side; a
    // duplicate here is far cheaper than a miss.
    const script = document.createElement('script')
    script.async = true
    script.src = CONVERSION_PIXEL
    document.body.appendChild(script)

    void fetch(CONVERSION_PIXEL, {
      method: 'GET',
      mode: 'no-cors',
      credentials: 'include',
      keepalive: true,
    }).catch(() => {})
  } catch {
    // A tracking failure must never surface to the user or block the funnel.
  }
}
