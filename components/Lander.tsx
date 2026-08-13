import { TypeformEmbed } from '@/components/TypeformEmbed'
import { Footer } from '@/components/Footer'
import { Logo } from '@/components/ui/Logo'
import { HARMS, STEPS, FAQS, type Variant } from '@/lib/variants'

const PHONE = process.env.NEXT_PUBLIC_PHONE ?? ''

function Nav() {
  return (
    <header className="border-b border-border-default bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Logo />
        {PHONE && (
          <a
            href={`tel:${PHONE.replace(/[^0-9+]/g, '')}`}
            className="text-sm font-semibold text-indigo transition-colors hover:text-indigo-soft"
          >
            {PHONE}
          </a>
        )}
      </div>
    </header>
  )
}

function Hero({
  variant,
  campaign,
}: {
  variant: Variant
  campaign: string
}) {
  const { hero } = variant
  const storyLed = variant.id === 'b'

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-8 lg:grid lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-12 lg:pb-16">
        <div className="lg:pt-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo/8 px-3 py-1.5 text-xs font-semibold text-indigo">
            <span className="h-2 w-2 rounded-full bg-success" />
            {hero.eyebrow}
          </span>

          <h1 className="mt-5 text-[32px] font-bold leading-[1.12] text-ink sm:text-[40px] lg:text-[46px]">
            {hero.headline}{' '}
            <span className={storyLed ? 'text-amber-deep' : 'text-indigo-soft'}>
              {hero.headlineAccent}
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-text-secondary">
            {hero.subheadline}
          </p>

          <ul className="mt-6 space-y-2">
            {variant.assurances.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <span className="mt-0.5 font-bold text-success">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 lg:mt-0">
          <div
            id="review"
            className="rounded-2xl border border-border-default bg-white p-4 shadow-[0_4px_32px_rgba(26,35,64,0.08)] sm:p-6"
          >
            <p className="mb-3 text-center text-sm font-semibold text-ink">
              {hero.cta}
            </p>
            <TypeformEmbed campaign={campaign} variant={variant.id} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Harms() {
  return (
    <section className="bg-cream py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-center text-[26px] font-bold text-ink sm:text-[32px]">
          Harm These Platforms Are Accused of Causing
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-text-secondary">
          Lawsuits allege these products were engineered to maximize time spent,
          with known risks to developing minds.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {HARMS.map((harm) => (
            <div
              key={harm.title}
              className="rounded-xl border border-border-default bg-white p-6"
            >
              <h3 className="font-bold text-ink">{harm.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {harm.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Steps() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-center text-[26px] font-bold text-ink sm:text-[32px]">
          How It Works
        </h2>

        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <a
            href="#review"
            className="inline-block rounded-xl bg-amber px-8 py-4 font-bold text-white shadow-sm transition-colors hover:bg-amber-deep"
          >
            Start My Free Case Review
          </a>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section className="bg-cream py-14">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="text-center text-[26px] font-bold text-ink sm:text-[32px]">
          Common Questions
        </h2>

        <div className="mt-8 divide-y divide-border-default overflow-hidden rounded-xl border border-border-default bg-white">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                {faq.q}
                <span className="shrink-0 text-indigo-soft transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Lander({
  variant,
  campaign,
}: {
  variant: Variant
  campaign: string
}) {
  return (
    <>
      <Nav />
      <Hero variant={variant} campaign={campaign} />
      <Harms />
      <Steps />
      <Faq />
      <Footer />
    </>
  )
}
