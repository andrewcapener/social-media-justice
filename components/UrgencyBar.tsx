'use client'

import { useEffect, useState } from 'react'

/**
 * Top urgency bar.
 *
 * The claim here is deliberately factual: filing deadlines on these claims are
 * real and vary by state. We are NOT running a fake countdown or a fabricated
 * scarcity signal. This is attorney advertising for a real firm, and invented
 * urgency is exactly the kind of thing that draws bar complaints.
 */
export function UrgencyBar() {
  const [dismissed, setDismissed] = useState(true)

  // Render nothing on the server pass, then reveal. This avoids a hydration
  // flash and lets us respect a prior dismissal.
  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem('smjn_urgency_dismissed') === '1')
    } catch {
      setDismissed(false)
    }
  }, [])

  if (dismissed) return null

  return (
    <div className="relative bg-navy px-10 py-2.5 text-center text-white">
      <p className="text-[13px] leading-snug">
        <span className="font-semibold">Filing deadlines apply.</span>{' '}
        <span className="text-white/80">
          Every state limits how long families have to bring a claim.
        </span>{' '}
        <a href="#review" className="font-semibold underline underline-offset-2">
          Check your eligibility now
        </a>
      </p>

      <button
        type="button"
        onClick={() => {
          setDismissed(true)
          try {
            sessionStorage.setItem('smjn_urgency_dismissed', '1')
          } catch {}
        }}
        aria-label="Dismiss"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/60 transition-colors hover:text-white"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M1 1l12 12M13 1L1 13"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  )
}
