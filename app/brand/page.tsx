import type { Metadata } from 'next'
import { LogoMark } from '@/components/ui/Logo'

export const metadata: Metadata = {
  title: 'Brand Assets | Social Media Justice',
  description: 'Logo, palette, and typography reference.',
  // Unlisted, not secret. Shareable by link, kept out of search.
  robots: { index: false, follow: false },
}

/**
 * Brand reference page.
 *
 * Deliberately not linked from the nav. It exists so the mark, palette, and
 * type rules can be handed to a designer as one URL instead of a pile of
 * screenshots, and so the values they build against are the ones actually
 * shipping rather than a stale copy in a doc.
 */

const PALETTE = [
  { name: 'Civic Navy', hex: '#132840', use: 'Primary brand, headlines, dark surfaces' },
  { name: 'Brass', hex: '#B0873C', use: 'Accent and calls to action. Navy text only.' },
  { name: 'Stone', hex: '#5F6A79', use: 'Secondary text' },
  { name: 'Paper', hex: '#F6F3EE', use: 'Warm ground, alternating sections' },
  { name: 'Line', hex: '#D9D2C7', use: 'Borders on paper' },
  { name: 'Slate', hex: '#3D4A5C', use: 'Body text' },
]

function Swatch({ name, hex, use }: { name: string; hex: string; use: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <div className="h-20" style={{ backgroundColor: hex }} />
      <div className="p-4">
        <p className="font-sans text-sm font-bold text-navy">{name}</p>
        <p className="font-mono text-xs text-stone">{hex}</p>
        <p className="mt-2 font-serif text-xs leading-relaxed text-stone">{use}</p>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-10">
      <h2 className="font-sans text-xl font-extrabold tracking-[-0.01em] text-navy">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export default function BrandPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-4xl space-y-12 px-5 py-14 sm:px-8">
        <header>
          <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-brass-deep">
            Brand reference
          </p>
          <h1 className="mt-2 font-sans text-[34px] font-extrabold tracking-[-0.02em] text-navy">
            Social Media Justice
          </h1>
          <p className="mt-3 max-w-2xl font-serif text-lg leading-relaxed text-stone">
            Everything below is the live specification. These are the same values
            the site renders from, so anything built against this page will match
            production exactly.
          </p>
        </header>

        <Section title="Primary lockup">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-1 items-center gap-3 rounded-lg border border-line bg-white p-8 text-navy">
              <LogoMark className="h-10 w-10 shrink-0" />
              <span className="leading-none">
                <span className="block font-serif text-[22px] font-semibold tracking-[-0.01em]">
                  Social Media Justice
                </span>
                <span className="mt-1 block font-serif text-xs italic text-stone">
                  Holding platforms accountable
                </span>
              </span>
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-lg bg-navy p-8 text-paper">
              <LogoMark className="h-10 w-10 shrink-0" />
              <span className="leading-none">
                <span className="block font-serif text-[22px] font-semibold tracking-[-0.01em]">
                  Social Media Justice
                </span>
                <span className="mt-1 block font-serif text-xs italic text-paper/60">
                  Holding platforms accountable
                </span>
              </span>
            </div>
          </div>
        </Section>

        <Section title="Mark">
          <div className="flex flex-wrap items-end gap-8 rounded-lg border border-line bg-paper p-8">
            {[80, 48, 32, 20].map((size) => (
              <div key={size} className="text-center">
                <LogoMark
                  className="text-navy"
                  style={{ width: size, height: size }}
                />
                <p className="mt-2 font-mono text-[11px] text-stone">{size}px</p>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-stone">
            A courthouse portico on a 64 by 64 grid: entablature, three columns,
            plinth, and a notch cut from the left of the entablature. Solid
            blocks, no strokes, so it survives small sizes. Minimums: horizontal
            lockup 200px, stacked 96px, mark alone 20px.
          </p>
        </Section>

        <Section title="Palette">
          <div className="grid gap-4 sm:grid-cols-3">
            {PALETTE.map((c) => (
              <Swatch key={c.hex} {...c} />
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-flag/30 bg-flag/5 p-5">
            <p className="font-sans text-sm font-bold text-flag">
              Contrast rule
            </p>
            <p className="mt-1.5 max-w-2xl font-serif text-sm leading-relaxed text-navy-soft">
              Never place Paper on Brass. It measures 2.98:1, well under the
              4.5:1 floor. Navy on Brass clears AA at 4.5:1 with almost nothing
              to spare, so Brass is an accent surface carrying navy text, never a
              light-text surface.
            </p>
          </div>
        </Section>

        <Section title="Typography">
          <div className="space-y-6">
            <div className="rounded-lg border border-line p-6">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-stone">
                Archivo, headlines and interface
              </p>
              <p className="mt-3 font-sans text-3xl font-extrabold tracking-[-0.02em] text-navy">
                Was Your Child Harmed by Social Media?
              </p>
              <p className="mt-2 font-mono text-xs text-stone">
                Headlines, buttons, labels. Weights 400 to 800.
              </p>
            </div>
            <div className="rounded-lg border border-line p-6">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-stone">
                Newsreader, wordmark, tagline and long-form
              </p>
              <p className="mt-3 font-serif text-xl leading-relaxed text-navy-soft">
                Families across the country are holding YouTube, TikTok,
                Instagram, Snapchat, and Facebook accountable.
              </p>
              <p className="mt-2 font-mono text-xs text-stone">
                Wordmark, body copy, taglines. Weights 400 to 600, roman and italic.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Files">
          <ul className="space-y-2 font-serif text-sm text-stone">
            <li>
              <a href="/brand/logo.svg" className="text-navy underline">
                logo.svg
              </a>{' '}
              mark only, currentColor, scales to any size
            </li>
            <li>
              <a href="/brand/logo-navy.svg" className="text-navy underline">
                logo-navy.svg
              </a>{' '}
              mark in Civic Navy, for light grounds
            </li>
            <li>
              <a href="/brand/logo-paper.svg" className="text-navy underline">
                logo-paper.svg
              </a>{' '}
              mark in Paper, for navy grounds
            </li>
            <li>
              <a href="/icon.svg" className="text-navy underline">
                icon.svg
              </a>{' '}
              app icon, navy tile with paper mark
            </li>
          </ul>
        </Section>

        <p className="border-t border-line pt-8 font-serif text-xs text-stone">
          Unlisted page, shareable by link and kept out of search. Not linked
          from site navigation.
        </p>
      </div>
    </main>
  )
}
