import Image from 'next/image'
import { LITIGATION_FACTS, LITIGATION_VERIFIED_ON } from '@/lib/litigation'

/**
 * Litigation status band.
 *
 * This is the page's strongest legitimacy asset and it costs nothing to be
 * honest about: the underlying case really is a federal MDL with a public
 * docket, real bellwether outcomes, and a named judge. Verifiable specifics
 * outperform adjectives, "one of the fastest-growing MDLs in the federal
 * system" beats "trusted by thousands" precisely because a reader can check it.
 *
 * These are matters of public record about the litigation as a whole, NOT
 * results obtained by the sponsoring firm and NOT a prediction of any
 * individual outcome. The disclaimer below says so, and it needs to stay.
 */
export function LitigationStatus() {
  return (
    <section className="bg-ink py-14 text-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber">
              Where the litigation stands
            </p>
            <h2 className="mt-3 font-serif text-[26px] font-semibold leading-tight sm:text-[32px]">
              This is active federal litigation, not a cold call
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
              Claims are consolidated in{' '}
              <em className="not-italic text-white">
                In re: Social Media Adolescent Addiction/Personal Injury Products
                Liability Litigation
              </em>
              , MDL No. 3047, before Judge Yvonne Gonzalez Rogers in the U.S.
              District Court for the Northern District of California.
            </p>

            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              {LITIGATION_FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-serif text-[26px] font-semibold text-amber">
                    {fact.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-white/60">
                    {fact.label}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 max-w-2xl text-[11px] leading-relaxed text-white/45">
              The above are matters of public record concerning this litigation
              generally. They are not results obtained by the sponsoring firm and
              are not a prediction or guarantee of any outcome in any individual
              case. Court records verified {LITIGATION_VERIFIED_ON}.
            </p>
          </div>

          <div className="mt-10 hidden lg:mt-0 lg:block">
            <Image
              src="/img/courthouse.jpg"
              alt="The neoclassical facade of a historic county courthouse."
              width={940}
              height={627}
              sizes="380px"
              className="aspect-[4/3] w-full rounded-2xl object-cover opacity-95"
            />
            <p className="mt-2 text-[11px] text-white/40">
              Photo: Phil Evenden on Pexels
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
