import { landerMetadata, renderLander } from '@/lib/render-lander'
import { AWAITING_FIRM_APPROVAL } from '@/lib/legal'

export const metadata = {
  ...landerMetadata(),
  // The bare domain is the one page that SHOULD be indexable, once the firm
  // has approved it. Until then it follows draft mode like everything else,
  // or this override would put an unapproved firm-branded page in search.
  robots: AWAITING_FIRM_APPROVAL
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
}

/**
 * Bare domain.
 *
 * Renders the parent variant directly rather than redirecting, so
 * socialmediajusticetoday.com works as a clean shareable link.
 *
 * ⚠️ Traffic here reports `url` as "/" with no variant or campaign, so paid
 * traffic should point at a named path (/parents, /adults) or a campaign cell.
 * Sending ads to the bare domain silently discards the A/B split.
 */
export default function RootPage() {
  return renderLander('direct', 'a')
}
