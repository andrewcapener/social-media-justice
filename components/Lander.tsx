import Image from 'next/image'
import { TypeformEmbed } from '@/components/TypeformEmbed'
import { Footer } from '@/components/Footer'
import { UrgencyBar } from '@/components/UrgencyBar'
import { TrustBadges } from '@/components/TrustBadges'
import { Testimonials } from '@/components/Testimonials'
import { StickyCTA } from '@/components/StickyCTA'
import { LitigationStatus } from '@/components/LitigationStatus'
import { Logo } from '@/components/ui/Logo'
import { HARMS, STEPS, FAQS, type Variant } from '@/lib/variants'

const PHONE = process.env.NEXT_PUBLIC_PHONE ?? ''

function Nav() {
  return (
    <header className="border-b border-border-default bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
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

function Hero({ variant, campaign }: { variant: Variant; campaign: string }) {
  const { hero } = variant
  const storyLed = variant.id === 'b'

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-8 lg:grid lg:grid-cols-[1fr_minmax(0,500px)] lg:gap-12 lg:pb-16">
        <div className="lg:pt-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo/8 px-3 py-1.5 text-xs font-semibold text-indigo">
            <span className="h-2 w-2 rounded-full bg-success" />
            {hero.eyebrow}
          </span>

          <h1 className="mt-5 font-serif text-[34px] font-semibold leading-[1.1] tracking-[-0.015em] text-ink sm:text-[42px] lg:text-[48px]">
            {hero.headline}{' '}
            <span className={storyLed ? 'text-amber-deep' : 'text-indigo-soft'}>
              {hero.headlineAccent}
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-text-secondary">
            {hero.subheadline}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {variant.assurances.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 text-sm text-text-secondary"
              >
                <span className="font-bold text-success">✓</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Below the fold-critical copy so it never pushes the form down. */}
          <figure className="mt-8 hidden lg:block">
            <Image
              src={variant.image.src}
              alt={variant.image.alt}
              width={940}
              height={627}
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="aspect-[16/10] w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-[11px] text-text-secondary/70">
              Photo: {variant.image.credit}. Depiction by a model, not an actual client.
            </figcaption>
          </figure>
        </div>

        {/* Sticky on desktop so the form stays reachable through the whole scroll. */}
        <div className="mt-8 lg:mt-0 lg:sticky lg:top-6 lg:self-start">
          <div
            id="review"
            className="rounded-2xl border border-border-default bg-white p-4 shadow-[0_4px_32px_rgba(26,35,64,0.10)] sm:p-6"
          >
            <p className="mb-1 text-center text-base font-bold text-ink">
              {hero.cta}
            </p>
            <p className="mb-4 text-center text-xs text-text-secondary">
              Free and confidential — about 2 minutes
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
        <h2 className="text-center font-serif text-[28px] font-semibold tracking-[-0.01em] text-ink sm:text-[34px]">
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

const STEP_ICONS = [
  <path
    key="form"
    d="M6 3.5h9a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5ZM8 8h5M8 12h5M8 16h3"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
  <g key="review" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="m15 15 4.5 4.5" />
  </g>,
  <path
    key="call"
    d="M5 4.5h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C9.9 19.1 4.9 14.1 4.5 6.1A1.5 1.5 0 0 1 5 4.5Z"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />,
]

function Steps({ cta }: { cta: string }) {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-center font-serif text-[28px] font-semibold tracking-[-0.01em] text-ink sm:text-[34px]">
          How It Works
        </h2>

        <ol className="mt-10 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="text-center sm:text-left">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo/8 text-indigo sm:mx-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {STEP_ICONS[i]}
                </svg>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-amber-deep">
                Step {i + 1}
              </p>
              <h3 className="mt-1 font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center">
          <a
            href="#review"
            className="inline-block rounded-xl bg-amber px-8 py-4 font-bold text-white shadow-sm transition-colors hover:bg-amber-deep"
          >
            {cta}
          </a>
          <p className="mt-3 text-xs text-text-secondary">
            No cost, no obligation. Recovery is not guaranteed.
          </p>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section className="bg-cream py-14">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="text-center font-serif text-[28px] font-semibold tracking-[-0.01em] text-ink sm:text-[34px]">
          Common Questions
        </h2>

        <div className="mt-8 divide-y divide-border-default overflow-hidden rounded-xl border border-border-default bg-white">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                {faq.q}
                <span className="shrink-0 text-xl leading-none text-indigo-soft transition-transform group-open:rotate-45">
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
      <UrgencyBar />
      <Nav />
      <Hero variant={variant} campaign={campaign} />
      <TrustBadges />
      <Harms />
      <LitigationStatus />
      <Steps cta={variant.hero.cta} />
      <Testimonials />
      <Faq />
      <Footer />
      <StickyCTA
        label={variant.hero.cta}
        campaign={campaign}
        variant={variant.id}
      />
    </>
  )
}
