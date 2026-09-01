'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { readUtm, readDeliveryKeys, trackConversion, trackClient } from '@/lib/tracking'
import { fireGrowthChannelConversion } from '@/lib/growth-channel'

/**
 * Embeds the client's existing Typeform survey.
 *
 * IMPORTANT, this mirrors the client's production embed contract exactly.
 * Their live page passes two hidden fields their downstream backend and e-sign
 * retainer flow depend on:
 *
 *   entry_id , `${random9digits}${epochMillis}`, their unique lead key
 *   url      , document.location.pathname, their attribution dimension
 *
 * Change the shape of either and their backend stops recognizing our leads.
 * Everything we add (campaign, variant, utm_*) layers on top, never in place
 * of, those two. Because our paths are /{campaign}/{variant}, the `url` field
 * alone already carries our A/B attribution into their existing reporting.
 *
 * This is a `data-tf-live` id, not a classic /to/{id} form id, live embeds are
 * initialized by embed.js scanning data attributes, so we build the element the
 * same way rather than calling createWidget().
 *
 * ⚠️ The mount target must stay VISIBLE. Typeform measures its container to
 * size the iframe, so a `display: none` wrapper means it never renders, and
 * if readiness is detected by looking for that iframe, the two deadlock. The
 * loading state is therefore an overlay on top of a laid-out container, never
 * a toggle on the container itself.
 */

const EMBED_SCRIPT = 'https://embed.typeform.com/next/embed.js'
const SUBMIT_CALLBACK = '__smjnTypeformSubmit'
const READY_POLL_MS = 250
const SLOW_AFTER_MS = 15_000
const GIVE_UP_AFTER_MS = 45_000

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

/** Typeform hidden fields are a flat `k=v,k=v` string, values can't contain commas. */
function serializeHidden(fields: Record<string, string>): string {
  return Object.entries(fields)
    .filter(([, v]) => v !== '')
    .map(([k, v]) => `${k}=${v.replace(/,/g, ' ')}`)
    .join(',')
}

export interface TypeformEmbedProps {
  campaign: string
  variant: string
  /** Answers already collected on-page, piped in so users don't re-answer. */
  prefill?: Record<string, string | undefined>
  height?: number
  className?: string
}

export function TypeformEmbed({
  campaign,
  variant,
  prefill,
  height = 620,
  className = '',
}: TypeformEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'slow' | 'error'>('loading')
  const liveId = process.env.NEXT_PUBLIC_TYPEFORM_LIVE_ID

  // A bare `prefill = {}` default would be a new object every render, which
  // would re-run the effect and tear down a working widget on each pass.
  const prefillKey = useMemo(() => JSON.stringify(prefill ?? {}), [prefill])

  useEffect(() => {
    if (!liveId || !containerRef.current) return

    const container = containerRef.current
    let cancelled = false

    const entryId = makeEntryId()
    const utm = readUtm()

    const hidden: Record<string, string> = {
      // The client's two required fields, first and unmodified.
      entry_id: entryId,
      url: window.location.pathname,
      // Ours, additive only.
      campaign,
      variant,
      utm_source: utm.utmSource ?? '',
      utm_medium: utm.utmMedium ?? '',
      utm_campaign: utm.utmCampaign ?? '',
      utm_content: utm.utmContent ?? '',
      utm_term: utm.utmTerm ?? '',
      // Programmatic delivery keys, when the click URL carries them.
      ...readDeliveryKeys(),
    }
    for (const [key, value] of Object.entries(
      JSON.parse(prefillKey) as Record<string, string | undefined>
    )) {
      if (value) hidden[key] = value
    }

    window[SUBMIT_CALLBACK] = () => {
      // The optimized event. Fires Meta (pixel + CAPI, deduped) and the
      // Growth Channel conversion pixel together, once per completed form.
      // event_id is the Typeform entry_id on purpose. It already travels
      // with the submission into the client's n8n intake, so if their system
      // also reports this lead to Meta, both reports carry the same id and
      // Meta dedupes instead of double counting.
      void trackConversion('Lead', { campaign, variant, eventId: entryId })
      fireGrowthChannelConversion()
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
        const start = Date.now()
        const check = () => {
          if (cancelled) return
          if (el.querySelector('iframe')) return setStatus('ready')
          const elapsed = Date.now() - start
          if (elapsed > GIVE_UP_AFTER_MS) return setStatus('error')
          if (elapsed > SLOW_AFTER_MS) setStatus('slow')
          setTimeout(check, READY_POLL_MS)
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
  }, [liveId, campaign, variant, prefillKey, height])

  useEffect(() => {
    if (status === 'ready') {
      trackClient('ViewContent', { campaign, variant, content_name: 'intake_form' })
    }
  }, [status, campaign, variant])

  if (!liveId) {
    return (
      <div className="rounded-xl border-2 border-dashed border-line bg-paper p-8 text-center">
        <p className="text-sm font-semibold text-navy-soft">Typeform not configured</p>
        <p className="mt-1 text-xs text-stone">
          Set <code className="font-mono">NEXT_PUBLIC_TYPEFORM_LIVE_ID</code> in your environment.
        </p>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ minHeight: height }}>
      {/* Always laid out and visible, Typeform measures this to size itself. */}
      <div ref={containerRef} style={{ minHeight: height }} />

      {status !== 'ready' && (
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-paper text-center"
          aria-live="polite"
        >
          {status === 'error' ? (
            <div className="pointer-events-auto px-6">
              <p className="font-semibold text-navy-soft">
                We couldn&apos;t load the form.
              </p>
              <p className="mt-1 text-sm text-stone">
                Please refresh the page, or call and we&apos;ll take your
                information directly.
              </p>
            </div>
          ) : (
            <>
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-navy" />
              <span className="sr-only">Loading your case review form</span>
              {status === 'slow' && (
                <p className="mt-3 px-6 text-xs text-stone">
                  Still loading, thanks for your patience.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
