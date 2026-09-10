import { Logo } from '@/components/ui/Logo'
import { Footer } from '@/components/Footer'
import { OPERATOR, PRIVACY_EMAIL, LEGAL_EFFECTIVE_DATE } from '@/lib/legal'

/**
 * Privacy policy for socialmediajusticetoday.com.
 *
 * Rewritten 2026-09-10. The previous version was copied from an unrelated
 * project and named a different company throughout. It also stated that the
 * site does not use cookies for targeted advertising, which was false: this
 * site runs a Meta pixel, the Meta Conversions API, GA4, TrustedForm and a
 * Growth Channel retargeting pixel.
 *
 * The important structural fact this document turns on: the intake form is the
 * client's Typeform, embedded cross-origin. Names, phone numbers and case
 * details go from the visitor to the client's systems directly. They do not
 * pass through this site. What we hold is advertising and analytics data plus
 * the Typeform submission reference. Say that plainly rather than claiming
 * custody of data we never touch.
 */
export default function PrivacyPolicy() {
  return (
    <>
      <header className="bg-white border-b border-[#E5E7EB] px-5 sm:px-8 py-4">
        <a href="/"><Logo /></a>
      </header>

      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#6B7280] mb-10">
          <strong>Operator:</strong> {OPERATOR} &nbsp;|&nbsp;
          <strong>Effective Date:</strong> {LEGAL_EFFECTIVE_DATE}
        </p>

        <div className="prose prose-sm max-w-none text-[#374151] space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">1. Who Operates This Site</h2>
            <p>
              This website is operated by {OPERATOR} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). We are an
              advertising and marketing company. <strong>We are not a law firm</strong>, we do not
              provide legal advice, and we do not represent anyone. This site advertises on behalf of a
              participating law firm and helps people reach that firm&rsquo;s intake process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">2. The Intake Form Is Not Ours</h2>
            <p>
              The questionnaire on this site is a form hosted and operated by the participating law firm
              through a third-party provider (Typeform), embedded here. When you complete it,{' '}
              <strong>your answers go to that firm, not to us.</strong> Your name, phone number, email
              address and the details of your situation are submitted directly to their systems and are
              governed by their privacy policy, which is linked in the footer of this site.
            </p>
            <p className="mt-2">
              We do not receive, store, or have access to the contents of your form submission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">3. What We Do Collect</h2>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                <strong>Device and usage data:</strong> IP address, browser type and version, operating
                system, referring URL, pages viewed, and time on page.
              </li>
              <li>
                <strong>Advertising identifiers:</strong> Meta click and browser identifiers (the{' '}
                <code>fbclid</code> parameter and the <code>_fbc</code> and <code>_fbp</code> cookies),
                Google Analytics identifiers, and identifiers set by our programmatic advertising
                partner. These tell us which ad brought you here.
              </li>
              <li>
                <strong>A submission reference:</strong> when the firm&rsquo;s form is completed, we
                receive an anonymous reference number for that submission. It lets us count conversions
                and attribute them to an ad. It does not contain your name or your answers.
              </li>
              <li>
                <strong>Consent records:</strong> if the firm&rsquo;s TrustedForm script is active on the
                page, it records evidence of the consent you gave, on their behalf.
              </li>
            </ul>
            <p className="mt-2">
              Where we transmit any contact identifier to an advertising platform for measurement, it is{' '}
              <strong>irreversibly hashed before it leaves this site</strong>. We do not store contact
              details in plain text.
            </p>
          </section>

          <section id="advertising">
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">4. Cookies, Pixels and Advertising</h2>
            <p>
              <strong>This site uses cookies and tracking pixels for advertising, including
              retargeting.</strong> We want to be direct about that rather than bury it. Specifically:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                <strong>Meta (Facebook) Pixel and Conversions API.</strong> Measures ad performance and
                allows Meta to show you ads. Events are sent both from your browser and from our server.
              </li>
              <li>
                <strong>Google Analytics 4.</strong> Aggregate traffic and behaviour measurement.
              </li>
              <li>
                <strong>Programmatic retargeting.</strong> Our demand-side platform partner sets an
                identifier so ads for this campaign can be shown to you on other websites.
              </li>
              <li>
                <strong>Google Tag Manager.</strong> Loads and manages the tags above.
              </li>
            </ul>
            <p className="mt-2">
              You can limit this through your browser&rsquo;s cookie settings, your device&rsquo;s
              advertising controls, Meta&rsquo;s ad preferences, and the Google Analytics opt-out
              browser add-on. Global Privacy Control signals sent by your browser are honoured as an
              opt-out of sharing for targeted advertising.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">5. How We Use It</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To measure which ads, audiences and pages produce results, and to spend the advertising budget accordingly.</li>
              <li>To show ads for this campaign to people who visited this site and did not complete the form.</li>
              <li>To keep the site working, secure and free of fraudulent or automated traffic.</li>
              <li>To comply with legal obligations and advertising platform requirements.</li>
            </ul>
            <p className="mt-2">
              We do not use this data to make automated decisions about you, and we do not evaluate your
              legal claim. Only the participating firm does that.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">6. Who We Share It With</h2>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Advertising and analytics platforms</strong> as described in Section 4, for measurement and ad delivery.</li>
              <li><strong>The participating law firm</strong> we advertise for, in aggregate and at the submission-reference level, so campaign performance can be reconciled against their intake.</li>
              <li><strong>Service providers</strong> who host and operate this site, under confidentiality obligations.</li>
              <li><strong>Legal authorities</strong> where required by law, subpoena or court order.</li>
            </ul>
            <p className="mt-2">
              <strong>We do not sell your personal information for money.</strong> Note that sharing
              advertising identifiers with platforms for targeted advertising may be treated as a
              &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; under some state privacy laws, including
              California&rsquo;s. Section 7 tells you how to opt out.
            </p>
          </section>

          <section id="do-not-sell">
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">7. Your Rights and How to Opt Out</h2>
            <p>Depending on where you live, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Know what personal information we hold about you and request a copy.</li>
              <li>Request correction or deletion of it.</li>
              <li>Opt out of the sale or sharing of your personal information for targeted advertising.</li>
              <li>Withdraw consent, which does not undo processing that already happened.</li>
              <li>Not be discriminated against for exercising any of these rights.</li>
            </ul>
            <p className="mt-2">
              To exercise any of these, email{' '}
              <a href={`mailto:${PRIVACY_EMAIL}`} className="text-[#4A6FA5] hover:underline">
                {PRIVACY_EMAIL}
              </a>
              . We will respond within the time your state&rsquo;s law requires. We may need to confirm
              your identity first.
            </p>
            <p className="mt-2">
              To reach the participating law firm about the contents of a form you submitted, contact
              them directly. We cannot access or delete it for you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">8. How Long We Keep It</h2>
            <p>
              Advertising and analytics data is retained no longer than needed to measure the campaign it
              belongs to. Submission references and any hashed identifiers used for conversion
              measurement are deleted automatically within 30 days. Platform data held by Meta and
              Google is governed by their own retention policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">9. Security</h2>
            <p>
              The site is served over TLS. We apply reasonable technical and organisational measures to
              protect the limited data we hold. No method of transmission or storage is completely
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">10. Children</h2>
            <p>
              This site is directed to adults. We do not knowingly collect information from children
              under 13. Where a parent or guardian submits the firm&rsquo;s form about a minor, that
              submission is handled by the firm under their policy, not by us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">11. Changes</h2>
            <p>
              We may update this policy. Changes take effect when posted, and the effective date above
              will change.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">12. Contact</h2>
            <div className="mt-2 p-4 bg-[#F8F9FC] rounded-xl text-sm">
              <p><strong>{OPERATOR}</strong></p>
              <p>
                Email:{' '}
                <a href={`mailto:${PRIVACY_EMAIL}`} className="text-[#4A6FA5] hover:underline">
                  {PRIVACY_EMAIL}
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
