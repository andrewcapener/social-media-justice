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

/** Legal entity that operates these landing pages. */
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
 * Which firm this deployment advertises for.
 *
 * One codebase, more than one site. socialmediajusticetoday.com runs for
 * Johnson and socialmediajusticetomorrow.com runs for Weitz & Luxenberg, a
 * separate fund. Each is its own Vercel project on this repo, and the project
 * picks its firm with NEXT_PUBLIC_FIRM. Unset means Johnson, so the original
 * site needs no new configuration and cannot change by accident.
 *
 * Everything below that names a firm reads from the selected profile, so a
 * swap is still one file, and adding a fund is one more profile rather than a
 * fork of the whole funnel.
 */
export type FirmId = 'johnson' | 'weitz'

type FirmProfile = {
  name: string
  addressLines: readonly string[]
  phone: string
  email: string | null
  /** Shown in the footer. Null renders nothing rather than a guess. */
  licensure: string | null
  website: string
  /** The firm's own published website policy. Null drops every line pointing at it. */
  policyUrl: string | null
  /** "Where the Firm Practises" on the disclaimer page. */
  practiceNotice: string
  /** "State-Specific Notices" on the disclaimer page. Null drops the section. */
  stateNotice: string | null
  logoSrc: string | null
  logoSrcLight: string | null
  awaitingApproval: boolean
}

/**
 * Johnson Firm LLP.
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
 * The licensure line is quoted from their own disclaimers page. It matters more
 * here than the equivalent Simmons line did: they are licensed in two states
 * and we run national traffic, so the association language has to travel with
 * the claim.
 *
 * The policy URL is their own published website policy. They asked for this
 * specifically: our pages carry a line pointing readers to it, and the
 * state-specific advertising notices they publish there form part of this
 * advertising. The only outbound link on the site, and it is there at the
 * firm's instruction rather than by default.
 *
 * Two logo files, not one. The header sits on white and the footer on navy,
 * and this mark is navy and red: on the footer the navy half would vanish. An
 * invisible logo where an attorney advertising identification belongs is a
 * compliance problem, not a cosmetic one. The header uses the webp, which is a
 * fifth the size of the equivalent png for the same mark, on the one image that
 * loads above the fold on every page.
 *
 * Draft mode was used for the Simmons approval window and released on
 * 2026-09-24. Worth a decision, not an assumption: Johnson has not reviewed
 * this page. Ads are live and pointed at it, so flipping it back on would not
 * stop traffic, only indexing. Raised with Andrew rather than changed
 * unilaterally.
 */
const JOHNSON: FirmProfile = {
  name: 'Johnson Firm LLP',
  addressLines: ['417 Main St. #129', 'Little Rock, Arkansas 72201'],
  phone: '(501) 372-1300',
  email: 'info@yourattorney.com',
  licensure:
    'Johnson Firm lawyers are licensed to practice law only within the states of Arkansas and Tennessee, but we associate on certain types of cases with lawyers licensed or otherwise admitted to practice law throughout the United States.',
  website: 'https://yourattorney.com',
  policyUrl: 'https://yourattorney.com/disclaimers',
  practiceNotice:
    'This advertising is seen across the United States. The participating firm is not licensed in every state. The licensure statement in the footer of this page sets out where its lawyers are admitted and how matters outside those states are handled.',
  stateNotice:
    'Several states require their own wording in attorney advertising, and the firm publishes those notices, including for Alabama, Arizona, Colorado, Florida, Iowa, Kentucky, Mississippi, Missouri, Nevada, New Jersey, New Mexico, New York, Oregon, Tennessee, Texas and Wyoming. If you are in one of those states, the notice that applies to you is published at {POLICY} and forms part of this advertising.',
  logoSrc: '/brand/firm/johnson-header-v2.webp',
  logoSrcLight: '/brand/firm/johnson-footer-v2.png',
  awaitingApproval: false,
}

/**
 * Weitz & Luxenberg P.C., for socialmediajusticetomorrow.com.
 *
 * Per Taylor on 2026-10-06 the site carries the firm's Los Angeles office, for
 * the California attorney advertising requirement that an ad name the firm
 * and an address responsible for it. Taken from
 * weitzlux.com/locations/los-angeles-ca on 2026-10-07, which names Benno
 * Ashrafi and Alexandra Shef as leading that office but designates no single
 * responsible attorney.
 *
 * ⚠️ Still to come from the firm, and deliberately not invented here:
 * - A licensure statement. Their LA page carries none, so the footer shows no
 *   licensure line rather than a paraphrase of something they never said.
 * - A published website policy or state notices page to point readers to.
 *   Until there is one, every line that would link to it is left out.
 * - Their logo. The header and footer fall back to the firm name as a text
 *   mark, which is a valid identification on its own.
 *
 * Draft mode is on: a firm-branded page the firm has not approved stays out of
 * search indexes. Paid traffic is unaffected. Turn it off once they sign off.
 */
const WEITZ: FirmProfile = {
  name: 'Weitz & Luxenberg P.C.',
  addressLines: ['1880 Century Park East, Suite 700', 'Los Angeles, CA 90067'],
  phone: '(310) 247-0921',
  email: null,
  licensure: null,
  website: 'https://www.weitzlux.com',
  policyUrl: null,
  practiceNotice:
    'This advertising is seen across the United States. The participating firm\'s lawyers are not admitted in every state, and whether the firm can take on a particular matter depends on where you are and is decided by the firm after review.',
  stateNotice: null,
  logoSrc: null,
  logoSrcLight: null,
  awaitingApproval: true,
}

const PROFILES: Record<FirmId, FirmProfile> = { johnson: JOHNSON, weitz: WEITZ }

/**
 * NEXT_PUBLIC_ so the value is inlined into client bundles as well as server
 * code, and the header and footer cannot disagree about which firm this is.
 *
 * An unrecognised value fails the build rather than quietly falling back. A
 * typo in a Vercel setting should not put one firm's name on the other's
 * domain.
 */
function selectFirm(): FirmId {
  const raw = process.env.NEXT_PUBLIC_FIRM?.trim().toLowerCase()
  if (!raw) return 'johnson'
  if (raw in PROFILES) return raw as FirmId
  throw new Error(`Unknown NEXT_PUBLIC_FIRM "${raw}". Expected one of: ${Object.keys(PROFILES).join(', ')}`)
}

export const FIRM_ID: FirmId = selectFirm()
const FIRM = PROFILES[FIRM_ID]

export const FIRM_NAME = FIRM.name

/**
 * The firm's name where it ends a sentence.
 *
 * "P.C." and "LLP" end differently, and "for Weitz & Luxenberg P.C.." on a page
 * whose whole job is to identify the firm correctly reads as careless.
 */
export const FIRM_NAME_END = FIRM.name.endsWith('.') ? FIRM.name : `${FIRM.name}.`
export const FIRM_ADDRESS_LINES = FIRM.addressLines
export const FIRM_PHONE = FIRM.phone
export const FIRM_EMAIL = FIRM.email
export const FIRM_LICENSURE = FIRM.licensure
export const FIRM_WEBSITE = FIRM.website
export const FIRM_POLICY_URL = FIRM.policyUrl
export const FIRM_PRACTICE_NOTICE = FIRM.practiceNotice
export const FIRM_STATE_NOTICE = FIRM.stateNotice
export const FIRM_LOGO_SRC = FIRM.logoSrc
export const FIRM_LOGO_SRC_LIGHT = FIRM.logoSrcLight

/**
 * Draft mode.
 *
 * While true, every page emits `noindex, nofollow`, so a crawler cannot index a
 * firm-branded page that firm has not approved. Set per firm above.
 */
export const AWAITING_FIRM_APPROVAL = FIRM.awaitingApproval
