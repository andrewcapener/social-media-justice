import { Logo } from '@/components/ui/Logo'
import { Footer } from '@/components/Footer'
import {
  OPERATOR,
  LEGAL_EMAIL,
  LEGAL_EFFECTIVE_DATE,
  GOVERNING_STATE,
} from '@/lib/legal'

/**
 * Terms of service for socialmediajusticetoday.com.
 *
 * Rewritten 2026-09-10. The previous version was copied from an unrelated
 * project and named Clifford Press LLC as the operator, the contact, the party
 * taking TCPA consent and the party limiting its liability, throughout.
 *
 * The line this document has to hold: we sell advertising, we are not a law
 * firm, and we do not evaluate anyone's claim. Every clause below is written so
 * that it stays true if a regulator reads it next to the landing page.
 */
export default function TermsOfService() {
  return (
    <>
      <header className="bg-white border-b border-[#E5E7EB] px-5 sm:px-8 py-4">
        <a href="/"><Logo /></a>
      </header>

      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-2">Terms of Service</h1>
        <p className="text-sm text-[#6B7280] mb-10">
          <strong>Operator:</strong> {OPERATOR} &nbsp;|&nbsp;
          <strong>Effective Date:</strong> {LEGAL_EFFECTIVE_DATE}
        </p>

        <div className="prose prose-sm max-w-none text-[#374151] space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">1. Acceptance</h2>
            <p>
              By using this website you agree to these Terms. If you do not agree, do not use the site.
              This site is operated by {OPERATOR} (&ldquo;we&rdquo;, &ldquo;us&rdquo;).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">2. What This Site Is</h2>
            <p>
              This site is <strong>attorney advertising</strong>. We are an advertising and marketing
              company. We publish information about a legal matter and provide a way to reach a
              participating law firm&rsquo;s intake process.
            </p>
            <p className="mt-2">
              <strong>We are not a law firm.</strong> We do not practise law, we do not give legal
              advice, we do not evaluate claims, and we do not decide whether anyone qualifies for
              representation. Those decisions are made solely by the participating firm.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">3. No Attorney-Client Relationship</h2>
            <p>
              Using this site, reading anything on it, or submitting the intake form does not create an
              attorney-client relationship with us, with the participating firm, or with any attorney.
              That relationship is created only by a signed written agreement with a law firm, and only
              if that firm chooses to offer one.
            </p>
            <p className="mt-2">
              Nothing you submit through this site is protected by attorney-client privilege at the time
              you submit it. Do not send anything you would not want disclosed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">4. The Intake Form Is Operated by the Firm</h2>
            <p>
              The questionnaire on this site is hosted and operated by the participating law firm through
              a third-party provider and embedded here. Your answers go to that firm, not to us. Their
              terms and privacy policy govern what they do with them, and both are linked in the footer.
              We do not receive or store the contents of your submission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">5. Eligibility</h2>
            <p>
              You must be at least 18 years old to submit the form. A parent or legal guardian may
              submit on behalf of a minor. This site is intended for use in the United States only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">6. Consent to Be Contacted</h2>
            <p>
              By submitting the intake form, you give express written consent to be contacted about your
              potential claim by the participating law firm and its agents, by telephone, text message
              and email at the contact details you provide, including by automated dialling systems,
              pre-recorded messages and artificial intelligence.
            </p>
            <p className="mt-2">
              <strong>Consent is not a condition of any purchase or of legal representation.</strong>{' '}
              Message and data rates may apply. Reply STOP to any text to opt out of texts, and use the
              unsubscribe link in any email to opt out of email. To be removed entirely, contact the
              firm directly, since they hold your submission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">7. No Guarantee of Outcome</h2>
            <p>
              Nothing on this site is a promise or prediction about any case. Recovery is not
              guaranteed. Results depend on the specific facts, and prior results do not guarantee a
              similar outcome. Any figures mentioned in advertising refer to other matters and are not a
              representation about yours.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">8. Not Medical Advice</h2>
            <p>
              Health information on this site is general and educational. It is not medical advice, it
              is not a diagnosis, and it is not a substitute for care from a qualified professional. If
              you or someone you know is in crisis, call or text 988 in the United States.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">9. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Submit information that is false, or that belongs to someone else without their permission.</li>
              <li>Use automated means to scrape, overload, probe or interfere with the site.</li>
              <li>Attempt to gain unauthorised access to any part of the site or its infrastructure.</li>
              <li>Use the site for any unlawful purpose.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">10. Content and Imagery</h2>
            <p>
              Text, layout and design on this site are owned by {OPERATOR} or used under licence.
              Photographs depict models, not actual clients, and do not portray any actual client or
              case. Third-party names and marks belong to their owners and their use here does not imply
              endorsement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">11. Disclaimer</h2>
            <p>
              The site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties
              of any kind, express or implied, to the fullest extent permitted by law. We do not warrant
              that the site will be uninterrupted or error-free, or that information on it is complete
              or current.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">12. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, {OPERATOR} is not liable for any indirect,
              incidental, special, consequential or punitive damages arising from your use of this site,
              and our total liability for any claim relating to the site will not exceed one hundred US
              dollars ($100).
            </p>
            <p className="mt-2">
              Nothing here limits liability that cannot be limited by law, and nothing here limits the
              obligations of the participating law firm to you, which are a matter between you and them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">13. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of {GOVERNING_STATE}, without regard to
              its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">14. Changes</h2>
            <p>
              We may revise these Terms. Changes take effect when posted and the effective date above
              will change. Continued use after that constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">15. Contact</h2>
            <div className="p-4 bg-[#F8F9FC] rounded-xl">
              <p><strong>{OPERATOR}</strong></p>
              <p>
                Email:{' '}
                <a href={`mailto:${LEGAL_EMAIL}`} className="text-[#4A6FA5] hover:underline">
                  {LEGAL_EMAIL}
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
