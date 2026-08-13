/**
 * Site-wide footer.
 *
 * The disclaimers here are compliance surface, not decoration — attorney
 * advertising notice, no-attorney-client-relationship, no-guarantee-of-recovery,
 * TCPA consent language, and the medical-advice disclaimer. Meta also requires
 * a reachable privacy policy for lead-gen ad accounts. Do not trim these
 * without running the change past the client's counsel.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink py-12 text-white/70">
      <div className="mx-auto max-w-4xl space-y-4 px-5 text-xs leading-relaxed sm:px-8">
        <p className="text-sm font-bold uppercase tracking-wide text-white">
          Attorney Advertising
        </p>

        <p>
          This is attorney advertising. This website is not a law firm and does
          not provide legal advice. Submitting information through this site does
          not create an attorney-client relationship. Recovery is not guaranteed,
          and results may vary depending on the facts of your case. Prior results
          do not guarantee a similar outcome.
        </p>

        <p>
          By submitting the form on this page, you agree to be contacted by
          telephone, text message, and email at the contact information you
          provide, including by automated means, regarding your potential claim.
          Consent is not a condition of any purchase or of legal representation.
          Message and data rates may apply. You may opt out at any time.
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

        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
          <a href="/privacy-policy" className="underline hover:text-white">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="underline hover:text-white">
            Terms of Service
          </a>
        </div>

        <p className="pt-2">
          © {year} Social Media Justice. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
