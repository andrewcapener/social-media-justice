import Link from 'next/link'

export function Logo({ href = '/' }: { href?: string }) {
  return (
    <Link
      href={href}
      className="text-lg font-bold tracking-tight text-ink transition-opacity hover:opacity-80"
    >
      Social Media Justice
    </Link>
  )
}
