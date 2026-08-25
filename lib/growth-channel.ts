'use client'

/**
 * Growth Channel (programmatic DSP) pixels.
 *
 * Two distinct pixels with different firing rules:
 *
 *   Retargeting — every page, on load. Injected site-wide from the layout.
 *   Conversion  — ONLY on the event being optimized toward, never on page load.
 *
 * The conversion pixel is a plain <script src>, so it fires by being injected
 * into the DOM. That means it has to be appended at conversion time rather than
 * rendered in the layout, and it must be guarded against firing twice — a
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
 * Safe to call when unconfigured — it no-ops rather than throwing.
 */
export function fireGrowthChannelConversion(): void {
  if (typeof window === 'undefined') return
  if (!CONVERSION_PIXEL) return
  if (conversionFired) return

  conversionFired = true

  try {
    const script = document.createElement('script')
    script.async = true
    script.src = CONVERSION_PIXEL
    document.body.appendChild(script)
  } catch {
    // A tracking failure must never surface to the user or block the funnel.
  }
}
