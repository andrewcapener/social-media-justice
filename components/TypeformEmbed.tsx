'use client'

import { useEffect, useRef, useState } from 'react'
import { readUtm, trackConversion, trackClient } from '@/lib/tracking'

/**
 * Embeds the client's existing Typeform survey.
 *
 * IMPORTANT — this mirrors the client's production embed contract exactly.
 * Their live page (socialmediajusticehelp.com) passes two hidden fields that
 * their downstream backend and e-sign retainer flow depend on:
 *
 *   entry_id  — `${random9digits}${epochMillis}`, their unique lead key
 *   url       — document.location.pathname, their attribution dimension
 *
 * Change the shape of either and their backend stops recognizing our leads.
 * Everything we add (campaign, variant, utm_*) is layered on top, never
 * in place of, those two.
 *
 * Note this is a `data-tf-live` id, not a classic `/to/{id}` form id — the
 * live embeds are initialized by embed.js scanning data attributes, so we
 * build the element the same way rather than calling createWidget().
 */

const EMBED_SCRIPT = 'https://embed.typeform.com/next/embed.js'
const SUBMIT_CALLBACK = '__smjnTypeformSubmit'

declare global {
  interface Window {
    [SUBMIT_CALLBACK]?: () => void
  }
}

function loadEmbedScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve()

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SCRIPT}"]`
    )
    if (existing) {
      if (existing.dataset.loaded === 'true') return resolve()
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('typeform script failed')))
      return
    }

    const script = document.createElement('script')
    script.src = EMBED_SCRIPT
    script.async = true
    script.onload = () => {
      script.dataset.loaded = 'true'
      resolve()
    }
    script.onerror = () => reject(new Error('typeform script failed'))
    document.head.appendChild(script)
  })
}

/** Reproduces the client's entry_id scheme verbatim. */
function makeEntryId(): string {
  const randomNum = Math.floor(Math.random() * 1_000_000_000)
  return `${randomNum}${Date.now()}`
}

/** Typeform hidden fields are a flat `k=v,k=v` string — values can't contain commas. */
function serializeHidden(fields: Record<string, string>): string {
  return Object.entries(fields)
    .filter(([, v]) => v !== '')
    .map(([k, v]) => `${k}=${v.replace(/,/g, ' ')}`)
    .join(',')
}

export interface TypeformEmbedProps {
  /** Campaign path segment — our attribution layer. */
  campaign: string
  /** A/B variant id. */
  variant: string
  /** Answers already collected on-page, piped in so users don't re-answer. */
  prefill?: Record<string, string | undefined>
  height?: number
  className?: string
}

export function TypeformEmbed({
  campaign,
  variant,
  prefill = {},
  height = 620,
  className = '',
}: TypeformEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const liveId = process.env.NEXT_PUBLIC_TYPEFORM_LIVE_ID

  useEffect(() => {
    if (!liveId || !containerRef.current) return

    const container = containerRef.current
    let cancelled = false

    const entryId = makeEntryId()
    const utm = readUtm()

    // Their two required fields first — order is cosmetic but keeps parity.
    const hidden: Record<string, string> = {
      entry_id: entryId,
      url: window.location.pathname,
      // Our additions.
      campaign,
      variant,
      utm_source: utm.utmSource ?? '',
      utm_medium: utm.utmMedium ?? '',
      utm_campaign: utm.utmCampaign ?? '',
      utm_content: utm.utmContent ?? '',
      utm_term: utm.utmTerm ?? '',
    }
    for (const [key, value] of Object.entries(prefill)) {
      if (value) hidden[key] = value
    }

    window[SUBMIT_CALLBACK] = () => {
      // Typeform owns qualification; this fires on any completed submission.
      // Qualified-only events come from the client's backend.
      void trackConversion('Lead', { campaign, variant })
    }

    const el = document.createElement('div')
    el.id = entryId
    el.setAttribute('data-tf-live', liveId)
    el.setAttribute('data-tf-opacity', '100')
    el.setAttribute('data-tf-inline-on-mobile', 'true')
    el.setAttribute('data-tf-hidden', serializeHidden(hidden))
    el.setAttribute('data-tf-on-submit', SUBMIT_CALLBACK)
    el.setAttribute('style', `width:100%;height:${height}px;`)

    container.replaceChildren(el)

    loadEmbedScript()
      .then(() => {
        if (cancelled) return
        // embed.js scans for data-tf-* on load; if it loaded before this element
        // existed, the iframe appears on the next scan tick. Poll briefly.
        const start = Date.now()
        const check = () => {
          if (cancelled) return
          if (el.querySelector('iframe')) return setStatus('ready')
          if (Date.now() - start > 10_000) return setStatus('error')
          setTimeout(check, 200)
        }
        check()
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
      delete window[SUBMIT_CALLBACK]
      container.replaceChildren()
    }
  }, [liveId, campaign, variant, prefill, height])

  useEffect(() => {
    if (status === 'ready') {
      trackClient('ViewContent', { campaign, variant, content_name: 'intake_form' })
    }
  }, [status, campaign, variant])

  if (!liveId) {
    return (
      <div className="rounded-xl border-2 border-dashed border-border-default bg-cream p-8 text-center">
        <p className="text-sm font-semibold text-text-primary">Typeform not configured</p>
        <p className="mt-1 text-xs text-text-secondary">
          Set <code className="font-mono">NEXT_PUBLIC_TYPEFORM_LIVE_ID</code> in your environment.
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      {status === 'loading' && (
        <div
          className="flex items-center justify-center rounded-xl bg-cream"
          style={{ height }}
          aria-live="polite"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-border-default border-t-indigo" />
          <span className="sr-only">Loading your case review form</span>
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-xl border border-border-default bg-white p-8 text-center">
          <p className="font-semibold text-text-primary">We couldn&apos;t load the form.</p>
          <p className="mt-1 text-sm text-text-secondary">
            Please refresh the page, or call and we&apos;ll take your information directly.
          </p>
        </div>
      )}

      <div ref={containerRef} style={{ display: status === 'ready' ? 'block' : 'none' }} />
    </div>
  )
}
