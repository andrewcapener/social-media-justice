'use client'

import { useEffect, useState } from 'react'
import { trackClient } from '@/lib/tracking'

/**
 * Mobile sticky CTA.
 *
 * Appears once the hero form has scrolled out of view, so it never competes
 * with the form it's pointing at. Desktop keeps the form in a sticky column
 * instead, so this is mobile-only.
 */
export function StickyCTA({
  label,
  campaign,
  variant,
}: {
  label: string
  campaign: string
  variant: string
}) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const target = document.getElementById('review')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px' }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <a
        href="#review"
        onClick={() => trackClient('StickyCTAClick', { campaign, variant })}
        className="block rounded-lg bg-brass py-3.5 text-center font-sans font-bold text-navy transition-colors active:bg-brass-deep"
      >
        {label}
      </a>
    </div>
  )
}
