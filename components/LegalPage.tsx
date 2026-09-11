import { FirmMark } from '@/components/ui/FirmMark'
import { Footer } from '@/components/Footer'
import type { LegalBlock } from '@/lib/legalContent'

/**
 * Shared shell for the mirrored legal pages.
 *
 * These live on our domain rather than being linked out, so the reader never
 * leaves the landing page mid-consideration. That makes the back link matter:
 * someone who opens the disclaimer has to be able to get back to the form in
 * one click, or the page becomes an exit.
 */
export function LegalPage({
  title,
  source,
  blocks,
  addendum,
}: {
  title: string
  /** Where the text came from, shown so the reader can verify it upstream. */
  source: { label: string; href: string }
  blocks: readonly LegalBlock[]
  addendum?: readonly LegalBlock[]
}) {
  return (
    <>
      <header className="border-b border-[#E5E7EB] bg-white px-5 py-4 sm:px-8">
        <FirmMark />
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <h1 className="mb-2 text-3xl font-bold text-[#1A1A2E]">{title}</h1>
        <p className="mb-10 text-sm text-[#6B7280]">
          Reproduced from{' '}
          <a
            href={source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4A6FA5] underline"
          >
            {source.label}
          </a>
          .
        </p>

        <Section blocks={blocks} />

        {addendum && (
          /*
            Visually separated and on a tinted ground so it cannot be mistaken
            for the firm's text. It is ours, it says so, and it corrects the
            policy above for this domain.
          */
          <div className="mt-12 rounded-xl border border-[#E5E7EB] bg-[#F8F9FC] p-6 sm:p-8">
            <Section blocks={addendum} />
          </div>
        )}

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

/** Renders the block list, grouping consecutive list items into one <ul>. */
function Section({ blocks }: { blocks: readonly LegalBlock[] }) {
  const out: React.ReactNode[] = []
  let list: string[] = []

  const flush = (key: string) => {
    if (!list.length) return
    out.push(
      <ul key={`ul-${key}`} className="mb-4 list-disc space-y-1 pl-5 text-[#374151]">
        {list.map((t, i) => (
          <li key={i}>{t}</li>
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
          {text}
        </h2>
      )
    } else {
      out.push(
        <p key={i} className="mb-4 leading-relaxed text-[#374151]">
          {text}
        </p>
      )
    }
  })
  flush('end')

  return <div className="text-sm">{out}</div>
}
