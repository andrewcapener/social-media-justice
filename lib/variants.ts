/**
 * A/B variant configuration. All landing page copy lives here.
 *
 * Attribution is path-based (agreed 8/11, no subdomains), so a campaign URL is:
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
  /** Internal label for reporting, not shown to users. */
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
   * These are stock models, not clients. See the disclosure in the footer,
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
  'Confidential, reviewed by licensed attorneys',
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
        'Families across the country are holding YouTube, TikTok, Instagram, Snapchat, and Facebook accountable. Find out in about two minutes whether your family may qualify.',
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
    name: 'Self-submitter / 18-25',
    hero: {
      eyebrow: 'Attorney advertising. Free case review',
      headline: 'You Grew Up on These Apps.',
      headlineAccent: 'They Knew What It Was Doing to You.',
      subheadline:
        'Internal company documents show these platforms studied how to keep teenagers scrolling. If you were under 18 when you started and developed anxiety, depression, an eating disorder, or body dysmorphia, you may have a claim of your own.',
      cta: 'Check My Eligibility',
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

/** Harms shown to both variants. Mirrors the qualifying injury list. */
export const HARMS = [
  {
    title: 'Depression & Severe Anxiety',
    body: 'Persistent hopelessness, panic, or withdrawal that began or worsened during heavy platform use.',
  },
  {
    title: 'Eating Disorders',
    body: 'Anorexia, bulimia, or body dysmorphia linked to appearance-driven content and comparison feeds.',
  },
  {
    title: 'Self-Harm & Suicidal Ideation',
    body: 'Suicidal thoughts, an attempt, or other physical self-harm, including exposure to content that encouraged it.',
  },
  {
    title: 'Body Dysmorphia',
    body: 'A distorted, distressing preoccupation with appearance, driven by filtered and comparison-heavy feeds.',
  },
]

export const STEPS = [
  {
    title: 'Answer a few questions',
    body: 'Which platforms were involved, roughly how much they were used, and what harm followed. About two minutes.',
  },
  {
    title: 'We review your answers',
    body: 'Licensed attorneys evaluate the answers against the criteria for the current litigation.',
  },
  {
    title: 'You hear back quickly',
    body: 'If you qualify, a member of the legal team reaches out to walk through next steps. No obligation.',
  },
]

export const FAQS = [
  {
    q: 'Who can file a claim?',
    a: 'Either a parent or guardian on behalf of someone 17 or younger, or a young adult filing for themselves. About half of current cases are filed by a parent and just over 40 percent by the affected person directly.',
  },
  {
    q: 'What are the basic requirements?',
    a: 'The affected person generally must have used Instagram, Facebook, TikTok, Snapchat, or YouTube between the ages of 5 and 17, be 25 or younger today, have used the platforms roughly three or more hours a day on average, have experienced a qualifying injury, and not currently be represented by another attorney for this claim.',
  },
  {
    q: 'Which injuries qualify?',
    a: 'Body dysmorphia, eating disorders, depression, severe anxiety, suicidal ideation or an attempt, and other forms of physical self-harm, where social media caused or substantially contributed to the harm.',
  },
  {
    q: 'Does treatment matter?',
    a: 'Yes. There generally needs to have been medical treatment for the alleged injury, such as therapy or prescription medication. If the harm began within the last three months and treatment has not started yet, an intention to seek professional treatment can be enough.',
  },
  {
    q: 'How much does this cost?',
    a: 'Nothing upfront. These cases are handled on a contingency basis, which means attorney fees are owed only if the case results in a recovery.',
  },
  {
    q: 'Do I need medical records to start?',
    a: 'No. Nothing needs to be gathered to complete this review. If the case qualifies, the legal team will explain exactly what is helpful and help request it.',
  },
  {
    q: 'Will this become a public lawsuit with my name on it?',
    a: 'Claims involving minors are typically filed with privacy protections. This review is confidential, and an attorney will explain how the information is handled before anything is filed.',
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
 * Client testimonials. EMPTY ON PURPOSE.
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


/**
 * Eligibility checklist, taken from the client's "Social Media Criteria" sheet.
 *
 * Surfaced on-page deliberately. The client is measured on qualified-to-signed
 * conversion and cost per SIGNED case, not raw lead volume, so filtering out
 * people who cannot qualify before they reach the form is worth more than the
 * extra submissions those people would have produced.
 */
export const ELIGIBILITY = [
  'Used Instagram, Facebook, TikTok, Snapchat, or YouTube',
  'Was between 5 and 17 years old while using them',
  'Is 25 or younger today',
  'Used the apps about 3 or more hours a day on average',
  'Experienced a qualifying injury listed above',
  'Received treatment, or intends to if the harm is recent',
  'Is not already represented by an attorney for this claim',
]
