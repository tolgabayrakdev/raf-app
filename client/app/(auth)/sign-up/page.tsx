import type { Metadata } from 'next'
import SignUp from './sign-up'

export const metadata: Metadata = {
  title: 'Raf | Kayıt Ol',
  description: 'Burası kayıt oluşturma sayfasıdır.',
}

export default function page() {
  return <SignUp />
}
