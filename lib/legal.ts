/**
 * Single source of truth for who operates this site and which firm it
 * advertises for.
 *
 * These strings appear on the privacy policy, the disclaimer and the footer as
 * the owner, the contact, and the party taking consent. They were wrong once
 * already: both pages shipped naming Clifford Press LLC, an unrelated company,
 * because the documents were copied from another build and the entity was
 * buried in prose in a dozen places. Keeping it here means it is one edit, not
 * twelve, and a grep for the wrong name actually finds everything.
 *
 * That has now paid for itself twice: Lanier to Simmons on 2026-09-10, and
 * Simmons to Johnson on 2026-09-24.
 *
 * ⚠️ OPERATOR is the trading name. If Milkneck is a registered LLC or has a
 * formal legal name, that is what belongs here, not the brand. Confirm before
 * this is treated as final by anyone's counsel.
 */

/** Legal entity that operates socialmediajusticetoday.com. */
export const OPERATOR = 'Milkneck'

/** Privacy and data-rights requests. */
export const PRIVACY_EMAIL = 'andrew@milkneck.co'

/** Terms, disputes and general legal contact. */
export const LEGAL_EMAIL = 'andrew@milkneck.co'

/** Shown on both documents. Bump whenever either is materially revised. */
export const LEGAL_EFFECTIVE_DATE = 'September 24, 2026'

/**
 * Governing law for the terms.
 *
 * ⚠️ DELIBERATELY UNFILLED. The old terms said California, inherited from an
 * unrelated project along with everything else, and there is no reason to think
 * that is right for Milkneck. This renders visibly broken on the page so it
 * cannot ship unnoticed.
 *
 * /terms-of-service is NOT linked from the footer while this is unfilled, so
 * nothing broken is reachable. Do not link it until this is a real state.
 */
export const GOVERNING_STATE = '[CONFIRM STATE]'

/**
 * The compliance pages in the footer.
 *
 * Internal, not outbound. Per Andrew on 2026-09-11 the firm's privacy policy
 * and disclaimer live on this domain rather than being linked to, so a reader
 * checking them never leaves the landing page.
 */
export const PRIVACY_POLICY_PATH = '/privacy-policy'
export const DISCLAIMER_PATH = '/disclaimer'

/**
 * The participating law firm.
 *
 * Third firm on this build. Lanier, then Simmons Hanly Conroy on 2026-09-10,
 * then Johnson Firm on 2026-09-24. The firm appears in the header and footer
 * only; the body narrative stays unbranded, which is why a swap costs one file
 * and not a rewrite.
 *
 * Address confirmed by Andrew on 2026-09-24 as the one the firm emailed us.
 * Worth knowing that two others are in circulation and are not the same place:
 * their own disclaimers page designates 2226 Cottondale Lane, Suite 210 as the
 * office responsible for their website, naming attorney Anthony Johnson, and
 * their homepage footer shows 610 President Clinton Avenue, Suite 200. An
 * attorney advertising block exists to name the office answerable for the ad,
 * so if their counsel ever queries this, that is why.
 *
 * FIRM_LICENSURE is quoted from their own disclaimers page. It matters more
 * here than the equivalent Simmons line did: they are licensed in two states
 * and we run national traffic, so the association language has to travel with
 * the claim.
 */
export const FIRM_NAME = 'Johnson Firm LLP'
export const FIRM_ADDRESS_LINES = [
  '417 Main St. #129',
  'Little Rock, Arkansas 72201',
] as const
export const FIRM_PHONE = '(501) 372-1300'
export const FIRM_EMAIL = 'info@yourattorney.com'
export const FIRM_LICENSURE =
  'Johnson Firm lawyers are licensed to practice law only within the states of Arkansas and Tennessee, but we associate on certain types of cases with lawyers licensed or otherwise admitted to practice law throughout the United States.'
export const FIRM_WEBSITE = 'https://yourattorney.com'

/**
 * The firm's own published website policy.
 *
 * They asked for this specifically: our pages carry a line pointing readers to
 * it, and the state-specific advertising notices they publish there form part
 * of this advertising. The only outbound link on the site, and it is there at
 * the firm's instruction rather than by default.
 */
export const FIRM_POLICY_URL = 'https://yourattorney.com/disclaimers'

/**
 * Firm logo, both tones.
 *
 * Two files, not one. The header sits on white and the footer on navy, and this
 * mark is navy and red: on the footer the navy half would vanish. An invisible
 * logo where an attorney advertising identification belongs is a compliance
 * problem, not a cosmetic one.
 *
 * The header uses the webp, which is a fifth the size of the equivalent png for
 * the same mark, on the one image that loads above the fold on every page.
 *
 * Both fall back to the firm name as a text mark if the file fails to load,
 * which is what carried the page through the swap before these arrived.
 */
export const FIRM_LOGO_SRC: string | null = '/brand/firm/johnson-header-v2.webp'
export const FIRM_LOGO_SRC_LIGHT: string | null = '/brand/firm/johnson-footer-v2.png'

/**
 * Draft mode.
 *
 * While true, every page emits `noindex, nofollow`, so a crawler cannot index a
 * firm-branded page that firm has not approved. Used for the Simmons approval
 * window and released on 2026-09-24.
 *
 * ⚠️ Worth a decision, not an assumption: Johnson has not reviewed this page.
 * Ads are live and pointed at it, so flipping this back on would not stop
 * traffic, only indexing. Raised with Andrew rather than changed unilaterally.
 */
export const AWAITING_FIRM_APPROVAL = false
