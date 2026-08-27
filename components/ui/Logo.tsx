import Link from 'next/link'

/**
 * Brand mark from the Social Media Justice logo system.
 *
 * A courthouse portico reduced to geometry on a 64x64 grid: entablature, three
 * columns, plinth, and a notch cut from the left of the entablature. It reads
 * as a civic institution rather than a law firm, which is the right register
 * for a page whose credibility rests on an active federal MDL.
 *
 * Drawn in solid blocks with no strokes, so it holds at favicon size. Minimum
 * sizes from the system: horizontal lockup 200px, stacked 96px, mark alone 20px.
 */
export function LogoMark({
  className = '',
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <rect x="5" y="4" width="54" height="11" rx="1.5" />
      <path d="M5 15 H11 L5 22 Z" />
      <rect x="11" y="19" width="10" height="32" />
      <rect x="27" y="19" width="10" height="32" />
      <rect x="43" y="19" width="10" height="32" />
      <rect x="3" y="51" width="58" height="9" rx="1.5" />
    </svg>
  )
}

export function Logo({
  href = '/',
  tone = 'dark',
}: {
  href?: string
  /** `dark` = navy mark for light grounds. `light` = paper mark for navy grounds. */
  tone?: 'dark' | 'light'
}) {
  const light = tone === 'light'

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 transition-opacity hover:opacity-80 ${
        light ? 'text-paper' : 'text-navy'
      }`}
    >
      <LogoMark className="h-8 w-8 shrink-0" />
      <span className="leading-none">
        <span className="block font-sans text-[19px] font-bold tracking-[-0.015em]">
          Social Media Justice
        </span>
        <span
          className={`mt-1 block font-serif text-[11px] italic ${
            light ? 'text-paper/60' : 'text-stone'
          }`}
        >
          Holding platforms accountable
        </span>
      </span>
    </Link>
  )
}
