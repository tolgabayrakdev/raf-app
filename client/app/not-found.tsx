"use client"
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl">404 - Page Not Found</h1>
        <button className="ml-4" onClick={() => router.back()}>Geri</button>
      </div>
    )
  }