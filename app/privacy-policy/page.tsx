import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { FIRM_PRIVACY_POLICY } from '@/lib/legalContent'
import { FIRM_NAME } from '@/lib/legal'

export const metadata: Metadata = {
  title: `Privacy Policy | ${FIRM_NAME}`,
}

/**
 * Privacy policy for this landing page, hosted here rather than linked out so
 * the reader does not leave to find it.
 *
 * This is our policy, not the firm's. It describes the advertising and
 * analytics technology that runs on this page, which the firm's own policy does
 * not cover and is not theirs to disclose. The firm's published policy is
 * linked at the bottom, which is what they asked for.
 *
 * Previously this mirrored Simmons Hanly Conroy's policy verbatim with an
 * addendum correcting the one claim in it that was false here. The firm changed
 * on 2026-09-24 and mirroring a third party's document was always the more
 * fragile shape, so the copy is ours now and the addendum is gone with it.
 */
export default function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" blocks={FIRM_PRIVACY_POLICY} />
}
