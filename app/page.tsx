import { redirect } from 'next/navigation'

/**
 * Bare domain hits go to the default campaign path so every session — including
 * direct and organic traffic — carries an attribution path the client's backend
 * can read from the Typeform `url` hidden field.
 */
export default function RootPage() {
  redirect('/start/a')
}
