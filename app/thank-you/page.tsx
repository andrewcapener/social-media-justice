import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { Logo } from '@/components/ui/Logo'

export const metadata: Metadata = {
  title: 'Thank You | Social Media Justice',
  description: 'Your case review has been received.',
  robots: { index: false, follow: false },
}

/**
 * Post-submission confirmation.
 *
 * This is the emotional handoff point. Someone has just described their
 * child's depression, eating disorder, or self-harm to a form, and the very
 * next thing they see decides whether they feel heard or abandoned. It is also
 * the step immediately before the e-sign retainer, which is where the signed
 * rate is actually won or lost, so the page's job is to confirm receipt, set
 * a concrete expectation, and remove the fear of what happens next.
 *
 * Deliberately no marketing, no upsell, no urgency mechanics. Anything that
 * reads as a sales page here undercuts the trust the intake just earned.
 */

const NEXT_STEPS = [
  {
    title: 'A specialist reviews your answers',
    body: 'Someone from the legal team reads through what you shared and checks it against the criteria for the current litigation.',
  },
  {
    title: 'You hear back',
    body: 'If your case qualifies, you will be contacted by phone, text, or email using the details you provided. Most families hear back within one business day.',
  },
  {
    title: 'You decide what happens next',
    body: 'Nothing is filed and nothing is committed to until you have spoken with an attorney and chosen to move forward. There is no cost to you either way.',
  },
]

export default function ThankYouPage() {
  return (
    <>
      <header className="border-b border-border-default bg-white">
        <div className="mx-auto max-w-6xl px-5 py-3.5 sm:px-8">
          <Logo />
        </div>
      </header>

      <main className="bg-white">
        <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path
                  d="M9 16.5 14 21.5 23 11"
                  stroke="#0F9D6E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h1 className="mt-6 text-center font-serif text-[30px] font-semibold leading-tight text-ink sm:text-[38px]">
            Thank you. We&apos;ve received your information.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-center text-lg leading-relaxed text-text-secondary">
            Sharing this takes courage, and we don&apos;t take it lightly. Your
            answers are with the legal team now.
          </p>

          <ol className="mt-12 space-y-8">
            {NEXT_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-bold text-ink">{step.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-2xl border border-border-default bg-cream p-6 sm:p-8">
            <h2 className="font-serif text-lg font-semibold text-ink">
              Nothing to do right now
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              You don&apos;t need to gather records or prepare anything. If it
              would help your case, the legal team will tell you exactly what to
              look for and help you request it.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              If you think of something you forgot to mention, keep it, you can
              share it when the team reaches out.
            </p>
          </div>

          <p className="mt-10 text-center text-sm text-text-secondary">
            If you or someone you know is in crisis, call or text{' '}
            <a href="tel:988" className="font-semibold text-indigo underline">
              988
            </a>{' '}
            to reach the Suicide &amp; Crisis Lifeline, available 24/7.
          </p>
        </div>
      </main>

      <Footer />
    </>
  )
}
