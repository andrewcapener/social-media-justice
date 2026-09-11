import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { FIRM_DISCLAIMER } from '@/lib/legalContent'
import { FIRM_NAME } from '@/lib/legal'

export const metadata: Metadata = {
  title: `Disclaimer | ${FIRM_NAME}`,
}

/**
 * The firm's disclaimer, hosted here rather than linked out so the reader does
 * not leave the landing page to find it.
 *
 * Mirrored verbatim. Their CTA block is deliberately not carried across: it
 * ends with a headline recovery figure, which belongs on their site and not
 * inside a disclaimer on an ad landing page.
 */
export default function Disclaimer() {
  return (
    <LegalPage
      title="Website Disclaimer"
      blocks={FIRM_DISCLAIMER}
    />
  )
}
