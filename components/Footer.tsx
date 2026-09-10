/**
 * Site-wide footer.
 *
 * The disclaimers here are compliance surface, not decoration, attorney
 * advertising notice, firm identification, no-attorney-client-relationship,
 * no-guarantee-of-recovery, TCPA consent language, and the medical-advice
 * disclaimer. Meta also requires a reachable privacy policy for lead-gen ad
 * accounts. Do not trim these without running the change past the client's
 * counsel.
 *
 * Per AJ on 2026-09-10, this footer is the most important surface on the page
 * and the language and address have to be exactly right. The firm appears here
 * and in the header only; the body narrative stays unbranded.
 */
import Image from 'next/image'
import {
  FIRM_NAME,
  FIRM_ADDRESS_LINES,
  FIRM_LICENSURE,
  FIRM_LOGO_SRC_LIGHT,
  CLIENT_PRIVACY_POLICY_URL,
  CLIENT_DISCLAIMER_URL,
  CLIENT_SMS_TERMS_URL,
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
          identification. The whole group still sits at the top of the footer
          rather than the bottom, because a disclosure nobody scrolls to is not
          a disclosure.
        */}
        {FIRM_LOGO_SRC_LIGHT && (
          <Image
            src={FIRM_LOGO_SRC_LIGHT}
            alt={FIRM_NAME}
            width={319}
            height={47}
            className="h-7 w-auto"
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
            Verbatim from the firm's own footer. We show a San Francisco address
            against national traffic, so the jurisdictional limit has to travel
            with the address rather than be implied by it.
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
          These point at the firm's own counsel-approved pages on simmonsfirm.com.
          They were briefly pointed at socialmediajusticehelp.com, which the
          client's team supplied on 2026-09-10 and which went down the same day,
          leaving the only compliance links on a live landing page dead. See
          lib/legal.ts.

          New tab, deliberately. These are read mid-consideration and navigating
          away from a landing page loses the lead.

          The local /privacy-policy and /terms-of-service links were removed on
          2026-09-10. Both pages were copied wholesale from the Claim Anchor
          build and still name Clifford Press LLC as the owner, the contact and
          the party taking TCPA consent. Shipping a different client's legal
          entity on this campaign is worse than having no link at all, so they
          were unlinked. Both have since been rewritten, but they stay unlinked
          until the operator question and the governing-law state are settled.

          Open question for the client's counsel: their privacy policy covers
          their site, not the tracking that runs on THIS domain (Meta pixel and
          CAPI, GA4, TrustedForm, the Growth Channel pixel). Someone has to
          decide whether that needs its own disclosure. Do not paper over it by
          restoring the old pages.
        */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
          <a
            href={CLIENT_PRIVACY_POLICY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Privacy Policy
          </a>
          <a
            href={CLIENT_DISCLAIMER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Disclaimer
          </a>
          <a
            href={CLIENT_SMS_TERMS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            SMS Terms
          </a>
        </div>

        <p className="pt-2">
          © {year} Social Media Justice. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
