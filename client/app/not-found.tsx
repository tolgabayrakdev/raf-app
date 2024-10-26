"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()
    return (
      <div className="flex h-screen items-center justify-center flex-col">
        <h1 className="text-3xl mb-2">Üzgünüz, aradığınız sayfa bulunamadı!</h1>
        <Button onClick={() => router.back()}>Geri dön</Button>
      </div>
    )
  }