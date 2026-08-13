import Link from 'next/link'

/**
 * Brand mark: a shield holding a balance scale.
 *
 * The two ideas the audience needs to read instantly are *protection* (this is
 * for parents acting on behalf of a child) and *legal remedy*. A shield alone
 * reads as security software; a scale alone reads as any law firm. Together
 * they're specific to what this is.
 *
 * Drawn on a 32x32 grid with stroked geometry so it stays legible at favicon
 * size. The shield inherits currentColor so the mark works on both the white
 * nav and the dark footer; only the scale carries the fixed accent.
 */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 2.75 26.5 6.4v9.1c0 6.4-4.5 11.2-10.5 13.2C10 26.7 5.5 21.9 5.5 15.5V6.4L16 2.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* balance scale */}
      <g stroke="#E8963C" strokeWidth="1.75" strokeLinecap="round">
        <path d="M16 10.5v10.75" />
        <path d="M10 13h12" />
        <path d="M12.75 21.5h6.5" />
        <path d="M7.5 13c0 2 1.1 3.25 2.5 3.25S12.5 15 12.5 13" />
        <path d="M19.5 13c0 2 1.1 3.25 2.5 3.25s2.5-1.25 2.5-3.25" />
      </g>
    </svg>
  )
}

export function Logo({
  href = '/',
  tone = 'dark',
}: {
  href?: string
  /** `dark` = ink mark for light backgrounds; `light` = white mark for the footer. */
  tone?: 'dark' | 'light'
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 transition-opacity hover:opacity-80 ${
        tone === 'light' ? 'text-white' : 'text-ink'
      }`}
    >
      <LogoMark className="h-8 w-8 shrink-0" />
      <span className="text-[17px] font-bold leading-none tracking-tight">
        Social Media
        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-amber">
          Justice
        </span>
      </span>
    </Link>
  )
}
