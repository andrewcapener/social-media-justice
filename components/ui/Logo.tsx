import Link from 'next/link'

/**
 * Brand mark: a solid shield with a knocked-out balance scale.
 *
 * Reworked from thin strokes to a filled emblem. Hairline geometry reads as
 * fintech and disappears at favicon size; a solid crest reads institutional
 * and holds at 16px, which is what "legitimate" actually means visually in
 * this category. The scale is knocked out of the shield rather than drawn on
 * top so the mark stays one confident shape.
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
      <defs>
        <mask id="smj-scale-mask">
          {/* White = shield kept, black = knocked out */}
          <rect width="32" height="32" fill="black" />
          <path
            d="M16 2 27 5.9v9.4c0 6.9-4.7 12-11 14.1-6.3-2.1-11-7.2-11-14.1V5.9L16 2Z"
            fill="white"
          />
          <g stroke="black" strokeWidth="1.6" strokeLinecap="round">
            <path d="M16 10v11" />
            <path d="M10.25 12.5h11.5" />
            <path d="M12.75 21.25h6.5" />
            <path d="M7.9 12.5c0 1.95 1.05 3.15 2.35 3.15s2.35-1.2 2.35-3.15" />
            <path d="M19.4 12.5c0 1.95 1.05 3.15 2.35 3.15s2.35-1.2 2.35-3.15" />
          </g>
          <circle cx="16" cy="8.6" r="1.15" fill="black" />
        </mask>
      </defs>

      <path
        d="M16 2 27 5.9v9.4c0 6.9-4.7 12-11 14.1-6.3-2.1-11-7.2-11-14.1V5.9L16 2Z"
        fill="currentColor"
        mask="url(#smj-scale-mask)"
      />
      {/* Accent keystone at the crest */}
      <circle cx="16" cy="8.6" r="1.5" fill="#E8963C" />
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
  const light = tone === 'light'

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 transition-opacity hover:opacity-80 ${
        light ? 'text-white' : 'text-ink'
      }`}
    >
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="leading-none">
        <span className="block font-serif text-[19px] font-semibold tracking-[-0.01em]">
          Social Media Justice
        </span>
        <span
          className={`mt-1 block text-[9.5px] font-semibold uppercase tracking-[0.22em] ${
            light ? 'text-white/55' : 'text-text-secondary'
          }`}
        >
          Holding Platforms Accountable
        </span>
      </span>
    </Link>
  )
}
