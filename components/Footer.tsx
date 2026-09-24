/**
 * Site-wide footer.
 *
 * The disclaimers here are compliance surface, not decoration: attorney
 * advertising notice, firm identification, no-attorney-client-relationship,
 * no-guarantee-of-recovery, TCPA consent language, and the medical-advice
 * disclaimer. Meta also requires a reachable privacy policy for lead-gen ad
 * accounts. Do not trim these without running the change past the firm's
 * counsel.
 *
 * Per AJ on 2026-09-10, this footer is the most important surface on the page
 * and the language and address have to be exactly right. The firm appears here
 * and in the header only; the body narrative stays unbranded, which is why
 * changing firms costs one file rather than a rewrite.
 */
import Image from 'next/image'
import {
  FIRM_NAME,
  FIRM_ADDRESS_LINES,
  FIRM_PHONE,
  FIRM_LICENSURE,
  FIRM_LOGO_SRC_LIGHT,
  PRIVACY_POLICY_PATH,
  DISCLAIMER_PATH,
} from '@/lib/legal'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy py-12 text-white/70">
      <div className="mx-auto max-w-4xl space-y-4 px-5 text-xs leading-relaxed sm:px-8">
        {/*
          The Social Media Justice wordmark was removed here and from the header
          on 2026-09-10. Firm-only branding, per Andrew, taking the second of
          the two options AJ offered. The name survives in the page title, the
          domain and the copyright line below.

          Logo leads, then the ATTORNEY ADVERTISING label, then the firm
          identification. The whole group sits at the top of the footer rather
          than the bottom, because a disclosure nobody scrolls to is not a
          disclosure.

          The light variant of the mark: this one is navy and red, and the navy
          half would vanish on this ground.
        */}
        {FIRM_LOGO_SRC_LIGHT && (
          <Image
            src={FIRM_LOGO_SRC_LIGHT}
            alt={FIRM_NAME}
            width={1256}
            height={300}
            className="h-8 w-auto"
          />
        )}

        <p className="pt-2 text-sm font-bold uppercase tracking-wide text-white">
          Attorney Advertising
        </p>

        {/*
          Firm identification. Bar advertising rules want the name and office
          address of the firm responsible for the ad, and this is the block that
          satisfies that.

          The name stays in text rather than being carried by the logo alone. A
          bar identification disclosure has to be readable when images are
          blocked, and alt text is not the same thing.
        */}
        <div className="space-y-2 text-white">
          <p className="font-bold">{FIRM_NAME}</p>
          {FIRM_ADDRESS_LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p>{FIRM_PHONE}</p>
        </div>

        <p>
          {/*
            The old copy read "This website is not a law firm", which stops
            making sense the moment the firm's logo is in the header. Naming who
            the advertising is FOR, then saying the site itself is not the firm,
            keeps the same disclaimer without the contradiction.
          */}
          This is attorney advertising for {FIRM_NAME}. This website is not
          itself a law firm and does not provide legal advice. Submitting
          information through this site does not create an attorney-client
          relationship. Recovery is not guaranteed, and results may vary
          depending on the facts of your case. Prior results do not guarantee a
          similar outcome.
        </p>

        <p>
          {/*
            Quoted from the firm's own disclaimers page. They are admitted in
            two states and this campaign runs nationally, so the association
            language has to travel with the claim rather than be implied by it.
          */}
          {FIRM_LICENSURE}
        </p>

        <p>
          By submitting the form on this page, you agree to be contacted by{' '}
          {FIRM_NAME} and its agents by telephone, text message, and email at the
          contact information you provide, including by automated means,
          regarding your potential claim. Consent is not a condition of any
          purchase or of legal representation. Message and data rates may apply.
          You may opt out at any time.
        </p>

        <p>
          Photographs on this site depict models, not actual clients, and do not
          portray any actual client or case.
        </p>

        <p>
          Any medical information presented here is for educational purposes only
          and does not replace professional medical advice. Consult a qualified
          medical professional for diagnosis or treatment.
        </p>

        {/*
          Internal links, same tab, no target="_blank", so a reader checking
          them never leaves the page. Two external hosts were tried first and
          both were worse: socialmediajusticehelp.com went down the day it was
          supplied, and linking the firm's own domain sends the reader off the
          funnel.

          Both pages are our documents naming the firm, not copies of the firm's.
          The firm's published policy is linked from the bottom of each, which is
          what they asked for, and their state-specific advertising notices live
          there.

          /terms-of-service stays unlinked: it is the Milkneck operator document
          and still needs the governing-law state before anyone should see it.
        */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
          <a href={PRIVACY_POLICY_PATH} className="underline hover:text-white">
            Privacy Policy
          </a>
          <a href={DISCLAIMER_PATH} className="underline hover:text-white">
            Disclaimer
          </a>
        </div>

        <p className="pt-2">
          © {year} Social Media Justice. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
