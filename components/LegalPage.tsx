import { FirmMark } from '@/components/ui/FirmMark'
import { Footer } from '@/components/Footer'
import type { LegalBlock } from '@/lib/legalContent'
import { FIRM_NAME, FIRM_POLICY_URL, PRIVACY_EMAIL } from '@/lib/legal'

/**
 * Shared shell for the legal pages.
 *
 * These live on our domain rather than being linked out, so the reader never
 * leaves the landing page mid-consideration. That makes the back link matter:
 * someone who opens the disclaimer has to be able to get back to the form in
 * one click, or the page becomes an exit.
 */
export function LegalPage({
  title,
  blocks,
}: {
  title: string
  blocks: readonly LegalBlock[]
}) {
  return (
    <>
      <header className="border-b border-[#E5E7EB] bg-white px-5 py-4 sm:px-8">
        <FirmMark linked />
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <h1 className="mb-10 text-3xl font-bold text-[#1A1A2E]">{title}</h1>

        <Section blocks={blocks} />

        <p className="mt-12 border-t border-[#E5E7EB] pt-6 text-sm">
          <a href="/parents" className="text-[#4A6FA5] underline">
            Back to the case review
          </a>
        </p>
      </main>

      <Footer />
    </>
  )
}

/**
 * Placeholder substitution.
 *
 * The copy in lib/legalContent.ts never writes the firm's name out. It says
 * {FIRM} and this fills it in from lib/legal.ts, so swapping firms stays a
 * one-file change. Three firms in two weeks have made that worth it, and a
 * name baked into prose is exactly how an unrelated company's legal entity
 * ended up on a live page once already.
 */
function substitute(text: string): string {
  return text
    .replaceAll('{FIRM}', FIRM_NAME)
    .replaceAll('{POLICY}', FIRM_POLICY_URL)
    .replaceAll('{PRIVACY_EMAIL}', PRIVACY_EMAIL)
}

const EMAIL = /[\w.+-]+@[\w-]+\.[\w.]+/
const URL_OR_EMAIL = /(https?:\/\/[^\s)]+[^\s.,)]|[\w.+-]+@[\w-]+\.[\w.]+)/g

/**
 * Make contact addresses and the firm's policy URL clickable.
 *
 * A data right you have to retype by hand on a phone is a right with friction
 * in front of it. The firm's policy link is the one deliberate outbound link on
 * the site, present because they asked for it, so it opens in a new tab and the
 * reader keeps their place.
 */
function linkify(text: string): React.ReactNode {
  const parts = substitute(text).split(URL_OR_EMAIL)
  if (parts.length === 1) return parts[0]

  return parts.map((part, i) => {
    if (EMAIL.test(part) && !part.startsWith('http')) {
      return (
        <a key={i} href={`mailto:${part}`} className="text-[#4A6FA5] underline">
          {part}
        </a>
      )
    }
    if (part.startsWith('http')) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4A6FA5] underline"
        >
          {part.replace(/^https?:\/\//, '')}
        </a>
      )
    }
    return part
  })
}

/** Renders the block list, grouping consecutive list items into one <ul>. */
function Section({ blocks }: { blocks: readonly LegalBlock[] }) {
  const out: React.ReactNode[] = []
  let list: string[] = []

  const flush = (key: string) => {
    if (!list.length) return
    out.push(
      <ul key={`ul-${key}`} className="mb-4 list-disc space-y-1 pl-5 text-[#374151]">
        {list.map((t, i) => (
          <li key={i}>{substitute(t)}</li>
        ))}
      </ul>
    )
    list = []
  }

  blocks.forEach(([kind, text], i) => {
    if (kind === 'li') {
      list.push(text)
      return
    }
    flush(String(i))
    if (kind === 'h') {
      out.push(
        <h2 key={i} className="mb-3 mt-8 text-xl font-bold text-[#1A1A2E] first:mt-0">
          {substitute(text)}
        </h2>
      )
    } else {
      out.push(
        <p key={i} className="mb-4 leading-relaxed text-[#374151]">
          {linkify(text)}
        </p>
      )
    }
  })
  flush('end')

  return <div className="text-sm">{out}</div>
}
