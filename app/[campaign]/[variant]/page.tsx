import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Lander } from '@/components/Lander'
import { getVariant, VARIANT_IDS } from '@/lib/variants'

/**
 * Campaign + variant landing route.
 *
 *   /{campaign}/{variant}
 *
 * `campaign` is opaque — media buyers mint new paths without a code change, and
 * the segment flows through to the Typeform `url` hidden field and Meta CAPI.
 * `variant` must be a known A/B id.
 */

// `campaign` is unbounded, so render on demand and cache thereafter.
export const dynamicParams = true

interface PageProps {
  params: Promise<{ campaign: string; variant: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { variant: variantId } = await params
  const variant = getVariant(variantId)

  const title = 'Social Media Harm Claims — Free Case Review'
  const description =
    'Was your child harmed by Instagram, TikTok, Snapchat, or Facebook? Find out in about two minutes whether your family may qualify. Free and confidential.'

  return {
    title,
    description,
    // Campaign paths are ad traffic — keep them out of the index and never
    // let them compete with the canonical page.
    robots: { index: false, follow: false },
    openGraph: {
      title: variant ? `${variant.hero.headline} ${variant.hero.headlineAccent}` : title,
      description,
      type: 'website',
    },
  }
}

export default async function CampaignPage({ params }: PageProps) {
  const { campaign, variant: variantId } = await params
  const variant = getVariant(variantId)

  if (!variant) notFound()

  return <Lander variant={variant} campaign={campaign} />
}

/** Pre-render the default campaign paths; everything else renders on demand. */
export function generateStaticParams() {
  return VARIANT_IDS.map((variant) => ({ campaign: 'start', variant }))
}
