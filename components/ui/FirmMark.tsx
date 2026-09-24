import Image from 'next/image'
import { FIRM_NAME, FIRM_WEBSITE, FIRM_LOGO_SRC } from '@/lib/legal'

/**
 * The participating firm's logo, used as the header mark across the funnel.
 *
 * AJ offered two options on 2026-09-10: double brand, keeping the unbranded
 * Social Media Justice wordmark alongside the firm's, or flip to the firm logo
 * alone. Andrew chose firm only, so this replaced the wordmark in the header
 * on the lander and on the post-submission pages.
 *
 * The colour variant, because every header on this site sits on white. The
 * navy footer uses FIRM_LOGO_SRC_LIGHT instead; a navy mark disappears on a
 * dark ground.
 *
 * Falls back to the firm name set as a text mark if the asset is ever missing.
 * An identification that renders as plain text is fine. One that renders as a
 * broken image is a compliance problem, not a cosmetic one. That fallback
 * carried the page through the Simmons to Johnson swap before the new assets
 * arrived.
 */
export function FirmMark({
  /**
   * Height only, width auto, so the browser uses the file's real aspect ratio
   * and the mark cannot be stretched by a wrong dimension prop.
   *
   * Shorter than the previous firm's at the same nominal size: this is a
   * stacked two-line lockup rather than a single-line wordmark, so it reads
   * heavier for the same height.
   */
  className = 'h-8 w-auto sm:h-10',
  /**
   * Whether the mark links to the firm's site.
   *
   * Off by default, and off on the lander. That link was the last remaining
   * way out of the funnel, sitting at the very top of a conversion page. The
   * mark identifies the firm either way; it does not have to be a door.
   *
   * The legal pages pass `linked` because a reader who has opened the privacy
   * policy has already stepped away from the form, and letting them verify the
   * firm upstream is worth more there than holding them.
   */
  linked = false,
}: {
  className?: string
  linked?: boolean
}) {
  const mark = FIRM_LOGO_SRC ? (
    <Image
      src={FIRM_LOGO_SRC}
      alt={FIRM_NAME}
      // Approximate intrinsic size. These reserve layout space; the rendered
      // size comes from the className above, so a small error costs a little
      // layout shift rather than a distorted logo.
      width={1200}
      height={260}
      priority
      className={className}
    />
  ) : (
    <span className="block text-[11px] font-semibold uppercase leading-tight tracking-wide text-navy sm:text-xs">
      {FIRM_NAME}
    </span>
  )

  if (!linked) return <div className="shrink-0">{mark}</div>

  return (
    <a
      href={FIRM_WEBSITE}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={FIRM_NAME}
      className="shrink-0 transition-opacity hover:opacity-70"
    >
      {mark}
    </a>
  )
}
