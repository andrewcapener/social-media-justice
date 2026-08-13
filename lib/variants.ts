/**
 * A/B variant configuration — all landing page copy lives here.
 *
 * Attribution is path-based (agreed 8/11 — no subdomains), so a campaign URL is:
 *
 *   /fb-parents/a      → campaign "fb-parents", variant A
 *   /prog-retarget/b   → campaign "prog-retarget", variant B
 *
 * The campaign segment is opaque and passes straight through to the Typeform's
 * `url` hidden field and to Meta CAPI, so media buyers can mint new paths
 * without a code change.
 *
 * Copy is centralized here on purpose: swapping A/B messaging should never
 * require editing a component.
 */

export type VariantId = 'a' | 'b'

export interface Variant {
  id: VariantId
  /** Internal label for reporting — not shown to users. */
  name: string
  hero: {
    eyebrow: string
    headline: string
    headlineAccent: string
    subheadline: string
    cta: string
  }
  /**
   * Hero imagery, sourced from Pexels and served locally so we never hotlink.
   * These are stock models, not clients — see the disclosure in the footer,
   * which attorney advertising rules require whenever actors depict clients.
   */
  image: {
    src: string
    alt: string
    credit: string
  }
  /** Emotional proof points under the hero. */
  assurances: string[]
}

const SHARED_ASSURANCES = [
  'No cost unless your case wins',
  'Confidential — reviewed by licensed attorneys',
  'Takes about 2 minutes',
]

export const VARIANTS: Record<VariantId, Variant> = {
  a: {
    id: 'a',
    name: 'Direct / eligibility-first',
    hero: {
      eyebrow: 'Free, confidential case review',
      headline: 'Was Your Child Harmed by',
      headlineAccent: 'Social Media?',
      subheadline:
        'Families across the country are holding Meta, TikTok, and Snap accountable. Find out in about two minutes whether your family may qualify.',
      cta: 'See If You Qualify',
    },
    image: {
      src: '/img/hero-a.jpg',
      alt: 'A parent comforting their teenage child at home.',
      credit: 'Kaboompics on Pexels',
    },
    assurances: SHARED_ASSURANCES,
  },
  b: {
    id: 'b',
    name: 'Accountability / story-led',
    hero: {
      eyebrow: 'Attorney advertising — free case review',
      headline: 'They Knew It Was Addictive.',
      headlineAccent: 'Your Child Paid the Price.',
      subheadline:
        'Internal company documents show these platforms studied how to keep kids scrolling. If your child developed anxiety, depression, or an eating disorder before turning 18, you may have a claim.',
      cta: 'Start Your Free Review',
    },
    image: {
      src: '/img/hero-b.jpg',
      alt: 'A child using a smartphone alone in a dark room, lit only by the screen.',
      credit: 'Towfiqu barbhuiya on Pexels',
    },
    assurances: SHARED_ASSURANCES,
  },
}

export const VARIANT_IDS = Object.keys(VARIANTS) as VariantId[]

export function isVariantId(value: string): value is VariantId {
  return value === 'a' || value === 'b'
}

export function getVariant(value: string): Variant | null {
  return isVariantId(value) ? VARIANTS[value] : null
}

/** Harms shown to both variants — mirrors the qualifying injury list. */
export const HARMS = [
  {
    title: 'Anxiety & Depression',
    body: 'Persistent worry, hopelessness, or withdrawal that began or worsened during heavy platform use.',
  },
  {
    title: 'Eating Disorders',
    body: 'Anorexia, bulimia, or body dysmorphia linked to appearance-driven content and comparison feeds.',
  },
  {
    title: 'Self-Harm & Suicidal Ideation',
    body: 'Self-injury or suicidal thoughts, including exposure to content that encouraged them.',
  },
  {
    title: 'Sleep Loss & Academic Decline',
    body: 'Compulsive late-night use, falling grades, and withdrawal from activities your child once loved.',
  },
]

export const STEPS = [
  {
    title: 'Answer a few questions',
    body: 'Tell us what happened, which platforms were involved, and how old your child was. About two minutes.',
  },
  {
    title: 'We review your answers',
    body: 'Licensed attorneys evaluate whether your family meets the criteria for the current litigation.',
  },
  {
    title: 'You hear back quickly',
    body: 'If you qualify, a member of the legal team reaches out to walk you through next steps. No obligation.',
  },
]

export const FAQS = [
  {
    q: 'How much does this cost?',
    a: 'Nothing upfront. These cases are handled on a contingency basis, which means attorney fees are owed only if your case results in a recovery.',
  },
  {
    q: 'Who can file a claim?',
    a: 'Generally, a parent or guardian files on behalf of a child who began using platforms such as Instagram, TikTok, Facebook, or Snapchat before turning 18 and who experienced documented harm. Young adults may also qualify for harm that began while they were minors.',
  },
  {
    q: 'Which platforms are involved?',
    a: 'The current litigation focuses on Meta (Instagram and Facebook), TikTok, Snapchat, and YouTube.',
  },
  {
    q: 'Do I need medical records to start?',
    a: 'No. You do not need to gather anything to complete the review. If your family qualifies, the legal team will tell you exactly what is helpful and help you request it.',
  },
  {
    q: 'Will this become a public lawsuit with my name on it?',
    a: 'Claims involving minors are typically filed with privacy protections. Your case review is confidential, and an attorney will explain how your family’s information is handled before anything is filed.',
  },
  {
    q: 'How long does a case take?',
    a: 'Mass tort litigation moves over months and years rather than weeks. Recovery is never guaranteed, and timelines depend on the facts of each case.',
  },
]

export interface Testimonial {
  quote: string
  name: string
  location?: string
}

/**
 * Client testimonials — EMPTY ON PURPOSE.
 *
 * The Testimonials section does not render while this array is empty, which is
 * the correct default. Fabricated testimonials and invented recovery figures
 * violate attorney advertising rules (ABA Model Rule 7.1 and state analogues),
 * and this page runs under a real firm's name.
 *
 * To populate: get real, written, client-approved quotes from the firm. Any
 * specific dollar figure needs their explicit sign-off. The "results vary"
 * disclaimer is already rendered beneath the grid.
 */
export const TESTIMONIALS: Testimonial[] = []
