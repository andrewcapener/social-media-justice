import { TESTIMONIALS } from '@/lib/variants'

/**
 * Client results / testimonials.
 *
 * Renders nothing unless real, client-approved testimonials are supplied in
 * lib/variants.ts. This is deliberate: fabricated testimonials and invented
 * recovery figures are a straightforward violation of attorney advertising
 * rules (ABA Model Rule 7.1 and its state analogues), and this page runs under
 * a real firm's name. Placeholder social proof does not ship.
 *
 * When real ones arrive they still need the "results vary" disclaimer below,
 * and any specific dollar figure needs the firm's sign-off.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-amber-deep">
          Real families
        </p>
        <h2 className="mt-2 text-center font-serif text-[28px] font-semibold tracking-[-0.01em] text-ink sm:text-[34px]">
          Families We&apos;ve Helped
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="rounded-xl border border-border-default bg-cream p-6"
            >
              <blockquote className="text-sm leading-relaxed text-text-primary">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-xs font-semibold text-text-secondary">
                {t.name}
                {t.location && <span className="font-normal"> — {t.location}</span>}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-text-secondary">
          Individual results vary based on the facts of each case. Past outcomes
          do not guarantee future results.
        </p>
      </div>
    </section>
  )
}
