import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { FIRM_PRIVACY_POLICY, PRIVACY_ADDENDUM } from '@/lib/legalContent'
import { FIRM_NAME } from '@/lib/legal'

export const metadata: Metadata = {
  title: `Privacy Policy | ${FIRM_NAME}`,
}

/**
 * The firm's privacy policy, hosted here rather than linked out so the reader
 * does not leave the landing page to find it.
 *
 * Replaces an earlier version of this page that was written with Milkneck as
 * the site operator. The client wants parity with the firm's own LP, so the
 * firm's policy is what a visitor should see.
 *
 * The addendum is ours and is the reason this page is not a straight copy.
 * Their policy states that their Sites do not track activity across third
 * party websites over time. True of simmonsfirm.com, false of this page, which
 * runs Meta and programmatic retargeting. See lib/legalContent.ts.
 */
export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      source={{
        label: 'simmonsfirm.com/privacy-policy',
        href: 'https://simmonsfirm.com/privacy-policy/',
      }}
      blocks={FIRM_PRIVACY_POLICY}
      addendum={PRIVACY_ADDENDUM}
    />
  )
}
