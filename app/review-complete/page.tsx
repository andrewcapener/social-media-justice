import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { Logo } from '@/components/ui/Logo'

export const metadata: Metadata = {
  title: 'Case Review Complete | Social Media Justice',
  description: 'Information about your case review.',
  robots: { index: false, follow: false },
}

/**
 * The disqualified path.
 *
 * On the client's own numbers roughly 40% of completed intakes do not
 * qualify. Until now those people finished the form and landed on a raw
 * webhook URL, which renders as a blank white page. That is the worst
 * possible response to someone who has just described their child's
 * self-harm to a stranger, and at this point in the funnel the audience
 * skews toward exactly the people least able to absorb being dropped.
 *
 * Three rules shaped this page:
 *
 * 1. Do not imply the person has no legal options at all. The criteria that
 *    matter here belong to one specific MDL. Saying anything broader would be
 *    legal advice we are not in a position to give.
 * 2. Separate "does not match this litigation" from "what happened to you was
 *    not real". Those get conflated, and the conflation is what does harm.
 * 3. Crisis resources are more important here than on the thank-you page, not
 *    less. Somebody disclosing self-harm and then being told they are not a
 *    fit is the highest risk moment in the entire funnel.
 *
 * Deliberately fires no conversion event. The Lead event already fired at
 * form submit, before qualification was known.
 */

const RESOURCES = [
  {
    name: '988 Suicide & Crisis Lifeline',
    detail: 'Call or text 988. Free, confidential, 24 hours a day.',
    href: 'tel:988',
    action: 'Call 988',
  },
  {
    name: 'Crisis Text Line',
    detail: 'Text HOME to 741741 to reach a trained crisis counselor, any time.',
    href: 'sms:741741&body=HOME',
    action: 'Text 741741',
  },
  {
    name: 'SAMHSA National Helpline',
    detail:
      'Call 1-800-662-4357 for free, confidential treatment referrals and information, 24 hours a day.',
    href: 'tel:18006624357',
    action: 'Call SAMHSA',
  },
]

export default function ReviewCompletePage() {
  return (
    <>
      <header className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-5 py-3.5 sm:px-8">
          <Logo />
        </div>
      </header>

      <main className="bg-white">
        <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8 sm:py-20">
          <h1 className="font-sans text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-navy sm:text-[34px]">
            Thank you for telling us. Based on your answers, we are not able to
            move forward with a claim right now.
          </h1>

          <p className="mt-5 font-serif text-lg leading-relaxed text-navy-soft">
            We know that is not the answer you were hoping for, and we are sorry.
            Please read the next part, because it matters.
          </p>

          <div className="mt-10 rounded-2xl border border-line bg-paper p-6 sm:p-8">
            <h2 className="font-sans text-lg font-bold text-navy">
              This is not a judgment about what your family has been through
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-soft">
              The claims in this litigation are limited to a specific set of
              circumstances: particular platforms, particular injuries, and use
              that began before the age of 18. Those boundaries were set by the
              court, not by us, and they are narrower than the harm that is
              actually out there.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-navy-soft">
              Falling outside them does not mean your experience was not real or
              not serious. It means it does not match this particular case.
            </p>
          </div>

          <h2 className="mt-12 font-sans text-xl font-extrabold tracking-[-0.01em] text-navy">
            If you need someone to talk to
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone">
            These are free, confidential, and not connected to us or to any law
            firm.
          </p>

          <ul className="mt-6 space-y-4">
            {RESOURCES.map((r) => (
              <li
                key={r.name}
                className="flex flex-col gap-3 rounded-xl border border-line p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-sans font-bold text-navy">{r.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-stone">
                    {r.detail}
                  </p>
                </div>
                <a
                  href={r.href}
                  className="shrink-0 rounded-lg bg-brass px-5 py-2.5 text-center font-sans text-sm font-bold text-navy transition-colors hover:bg-brass-deep hover:text-paper"
                >
                  {r.action}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 border-t border-line pt-8">
            <h2 className="font-sans text-lg font-bold text-navy">
              If something changes
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-soft">
              This litigation is active and its scope has changed before. If
              your circumstances are different from what you described, or if
              you left something out, you are welcome to submit again.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-navy-soft">
              You may also want to speak with an attorney of your own choosing.
              Nothing here is legal advice, and not qualifying for this case
              says nothing about whether you have other options.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
