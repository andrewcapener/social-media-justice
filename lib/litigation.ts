/**
 * Public-record facts about the social media adolescent addiction litigation.
 *
 * ⚠️ THIS FILE GOES STALE. Case counts move monthly and bellwether outcomes
 * land without warning. Everything here is presented to the public on attorney
 * advertising, so a number that has drifted is not a cosmetic problem.
 *
 * Re-verify against the MDL docket and the JPML statistics page before each
 * campaign push, and bump LITIGATION_VERIFIED_ON when you do. If nobody has
 * checked in a while, prefer cutting a stat over shipping a stale one.
 *
 * Sources: N.D. Cal. MDL No. 3047 docket; JPML pending-case statistics;
 * reported outcomes in K.G.M. v. Meta & YouTube (L.A. Super. Ct., Mar. 25,
 * 2026) and the Breathitt County School District federal bellwether (June 2026).
 */

export const LITIGATION_VERIFIED_ON = 'August 2026'

export interface LitigationFact {
  value: string
  label: string
}

export const LITIGATION_FACTS: LitigationFact[] = [
  {
    value: '2,800+',
    label:
      'Cases pending in MDL No. 3047 as of July 2026, making it one of the fastest-growing personal injury MDLs in the federal system.',
  },
  {
    value: '$6M',
    label:
      'Jury verdict returned in the first state-court bellwether, K.G.M. v. Meta & YouTube, in Los Angeles Superior Court in March 2026.',
  },
  {
    value: '4 of 4',
    label:
      'Defendants settled before opening statements in the first federal bellwether in June 2026, rather than put the case to a jury.',
  },
]
