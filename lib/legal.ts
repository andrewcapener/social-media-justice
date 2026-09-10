/**
 * Single source of truth for who legally operates this site.
 *
 * These strings appear on the privacy policy and terms as the owner, the
 * contact, and the party taking consent. They were wrong once already: both
 * pages shipped naming Clifford Press LLC, an unrelated company, because the
 * documents were copied from another build and the entity was buried in prose
 * in a dozen places. Keeping it here means it is one edit, not twelve, and a
 * grep for the wrong name actually finds everything.
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
export const LEGAL_EFFECTIVE_DATE = 'September 10, 2026'

/**
 * Governing law for the terms.
 *
 * ⚠️ DELIBERATELY UNFILLED. The old terms said California, inherited from the
 * other project along with everything else, and there is no reason to think
 * that is right for Milkneck. This renders visibly broken on the page so it
 * cannot ship unnoticed. Replace with the state Milkneck is organised in.
 */
export const GOVERNING_STATE = '[CONFIRM STATE]'

/**
 * The participating firm's own policies, supplied by their team 2026-09-10.
 * They are the advertiser of record and these are counsel-approved, so ours
 * must not contradict them.
 */
export const CLIENT_PRIVACY_POLICY_URL = 'https://socialmediajusticehelp.com/privacy-policy'
export const CLIENT_DISCLAIMER_URL = 'https://socialmediajusticehelp.com/disclaimer'

/**
 * The participating law firm.
 *
 * Changed 2026-09-10 from Lanier to Simmons Hanly Conroy. Per AJ, the firm
 * appears in the header and footer only; the body narrative stays unbranded.
 *
 * FIRM_NAME carries the LLP deliberately. Taylor passed it along without, but
 * the firm's own site writes it as an Illinois limited liability partnership,
 * and the entity suffix is the point of an identification disclosure.
 *
 * FIRM_LICENSURE is lifted verbatim from simmonsfirm.com's own footer. We show
 * a San Francisco address against national traffic, so the jurisdictional limit
 * has to travel with it.
 */
export const FIRM_NAME = 'Simmons Hanly Conroy LLP'
export const FIRM_ADDRESS_LINES = [
  '455 Market Street, Suite 1270',
  'San Francisco, California 94105',
] as const
export const FIRM_LICENSURE =
  "Simmons Hanly Conroy LLP's lawyers are licensed in Illinois and a limited number of other jurisdictions."
export const FIRM_WEBSITE = 'https://simmonsfirm.com'

/**
 * Firm logo, both tones.
 *
 * Taken from the firm's own theme assets and self-hosted rather than hotlinked,
 * so their server is not serving our traffic and a change on their end cannot
 * break or silently alter our header.
 *
 * Two files because the mark is not tone-agnostic. The colour version is black
 * text plus their #0072CE blue and needs a light ground; the white version is
 * a single flat #fff and disappears on one. Header is white, footer is navy, so
 * each gets the one that works. Using the wrong one renders an invisible logo,
 * which on an attorney advertising disclosure is a compliance problem, not a
 * cosmetic one.
 *
 * Both fall back to the firm name as a text mark if the file fails to load.
 */
export const FIRM_LOGO_SRC: string | null = '/brand/firm/simmons-color.svg'
export const FIRM_LOGO_SRC_LIGHT: string | null = '/brand/firm/simmons-white.svg'

/**
 * Draft mode.
 *
 * AJ is presenting this to the firm as a draft lander pending approval and has
 * asked that zero traffic reach it until they sign off. While this is true the
 * pages emit `noindex, nofollow` so a crawler cannot put a Simmons-branded page
 * nobody approved into a search index. Flip to false at launch.
 */
export const AWAITING_FIRM_APPROVAL = true
