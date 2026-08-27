/**
 * Trust badge strip.
 *
 * Every claim here is verifiable and true of this funnel. No invented ratings,
 * no fabricated award badges. If the client wants a star rating or a case-count
 * badge added, it needs a real source behind it first.
 */

const BADGES = [
  {
    label: 'Confidential',
    icon: (
      <path
        d="M8 1.5 13.5 3.5v4C13.5 10.9 11.1 13.4 8 14.5 4.9 13.4 2.5 10.9 2.5 7.5v-4L8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: 'Secure & encrypted',
    icon: (
      <>
        <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.4" />
      </>
    ),
  },
  {
    label: 'No fee unless you win',
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5.5 8.2 7.2 10l3.4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: 'Reviewed by licensed attorneys',
    icon: (
      <>
        <path d="M8 2v11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M4 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M6 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: 'TCPA compliant',
    icon: (
      <>
        <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5.5 8.2 7.2 10l3.4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
]

export function TrustBadges() {
  return (
    <section className="border-y border-border-default bg-white py-4">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-5 sm:px-8">
        {BADGES.map((badge) => (
          <li
            key={badge.label}
            className="flex items-center gap-1.5 rounded-full border border-border-default px-3 py-1.5 text-[11px] font-semibold text-text-secondary sm:text-xs"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0 text-indigo-soft"
              aria-hidden="true"
            >
              {badge.icon}
            </svg>
            {badge.label}
          </li>
        ))}
      </ul>
    </section>
  )
}
