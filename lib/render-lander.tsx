import type { Metadata } from 'next'
import { Lander } from '@/components/Lander'
import { getVariant } from '@/lib/variants'

/**
 * Shared renderer for the named, human-readable entry points.
 *
 * Ad destinations need to LOOK clean in a link preview while still carrying
 * attribution, because the client's Typeform reads document.location.pathname
 * into its `url` hidden field. A single readable segment gets both: /parents
 * reads fine in an ad and still lands a distinct value in their reporting,
 * where /start/a read as a meaningless token.
 */
export function landerMetadata(): Metadata {
  return {
    title: 'Social Media Harm Claims — Free Case Review',
    description:
      'Harmed by YouTube, TikTok, Instagram, Snapchat, or Facebook before turning 18? Find out in about two minutes whether you may qualify. Free and confidential.',
    // Ad destinations must not compete with the canonical page in search.
    robots: { index: false, follow: false },
  }
}

export function renderLander(campaign: string, variantId: 'a' | 'b') {
  const variant = getVariant(variantId)
  if (!variant) throw new Error(`unknown variant: ${variantId}`)
  return <Lander variant={variant} campaign={campaign} />
}
