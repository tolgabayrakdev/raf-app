import type { Metadata } from 'next'
import SignIn from './sign-in'

export const metadata: Metadata = {
  title: 'Raf | Giriş Yap',
  description: 'Burası giriş sayfasıdır.',
}

export default function page() {
  return <SignIn />
}
