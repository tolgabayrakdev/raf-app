import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Raf'a Hoşgeldin</h1>
        <p className="text-lg mb-6">
          Burada işlerini dijitalleştirip kolaylaştırıyoruz.
        </p>
        <Link href="/sign-in">
          <Button variant="default" className="px-6 py-3">
            Hadi başlayalım
          </Button>
        </Link>
      </div>
    </div>
  )
}
