"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut, Settings, User, Menu, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import AuthProvider from "@/providers/auth-provider"


function NavLink({ href, children, subLinks }: { href: string; children: React.ReactNode; subLinks?: { href: string; label: string }[] }) {
  const pathname = usePathname()
  const isActive = pathname === href || (subLinks && subLinks.some(subLink => pathname === subLink.href))

  return (
    <div className="relative group">
      <Link
        href={href}
        className={`text-primary-foreground hover:text-primary-foreground/80 font-medium px-2 py-1.5 rounded-md bg-primary-foreground/10 relative group text-sm`}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-foreground transform ${isActive ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 ease-in-out`}></span>
      </Link>
      {subLinks && (
        <div className="absolute left-0 mt-2 w-48 bg-primary rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          {subLinks.map((subLink) => (
            <Link
              key={subLink.href}
              href={subLink.href}
              className={`block px-4 py-2 text-sm text-primary-foreground hover:bg-primary-foreground/10 ${pathname === subLink.href ? 'bg-primary-foreground/20' : ''}`}
            >
              {subLink.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileNav({ isOpen, setIsOpen, closeMobileMenu }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void; closeMobileMenu: () => void }) {
  const pathname = usePathname()
  const [isExploreOpen, setIsExploreOpen] = useState(false)

  const linkStyle = "block w-full text-primary-foreground hover:text-primary-foreground/80 font-medium px-2 py-1.5 rounded-md bg-primary-foreground/10 text-sm relative group"
  const activeLinkStyle = "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-foreground"

  useEffect(() => {
    closeMobileMenu()
  }, [pathname])

  return (
    <div className={`
      fixed inset-0 bg-primary z-40 transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:hidden
    `}>
      <div className="flex flex-col p-4">
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col space-y-2 mt-8">
          <Link href="/main" className={`${linkStyle} ${pathname === '/main' ? activeLinkStyle : ''}`}>
            Ana Sayfa
          </Link>
          <Link href="/main/profile" className={`${linkStyle} ${pathname === '/main/profile' ? activeLinkStyle : ''}`}>
            Profil
          </Link>
          <button
            onClick={() => setIsExploreOpen(!isExploreOpen)}
            className={`${linkStyle} w-full text-left flex justify-between items-center ${pathname.startsWith('/explore') ? activeLinkStyle : ''}`}
          >
            Keşfet
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExploreOpen ? 'rotate-180' : ''}`} />
          </button>
          {isExploreOpen && (
            <div className="mt-2 space-y-2">
              <Link
                href="/archive/user-archive"
                className={`${linkStyle} ${pathname === '/archive/user-archive' ? activeLinkStyle : ''}`}
              >
                Gündem Keşfet
              </Link>
              <Link
                href="/explore/people"
                className={`${linkStyle} ${pathname === '/explore/people' ? activeLinkStyle : ''}`}
              >
                İnsanları Keşfet
              </Link>
              <Link
                href="/explore/topics"
                className={`${linkStyle} ${pathname === '/explore/topics' ? activeLinkStyle : ''}`}
              >
                Konuları Keşfet
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}

function Header() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('Yükleniyor...')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/auth/verify`, {
          method: "POST",
          credentials: 'include'
        })

        if (response.ok) {
          const data = await response.json()
          setEmail(data.email)
        } else {
          router.push('/sign-in')
        }
      } catch (error) {
        console.error('Doğrulama hatası:', error)
        router.push('/sign-in')
      }
    }

    verifyUser()
  }, [router])

  const handleLogout = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })

      if (response.ok) {
        router.push('/sign-in')
      } else {
        console.error('Çıkış yapılırken bir hata oluştu')
      }
    } catch (error) {
      console.error('Çıkış yapılırken bir hata oluştu:', error)
    }
  }

  const exploreSubLinks = [
    { href: '/main/archive/user-archive', label: 'Kişi Arşivi' },
    { href: '/explore/people', label: 'İnsanları Keşfet' },
    { href: '/explore/topics', label: 'Konuları Keşfet' },
  ]

  return (
    <header className="bg-primary text-primary-foreground py-2 px-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold">Raf.</h1>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-3">
            <NavLink href="/main">Ana Sayfa</NavLink>
            <NavLink href="/main/profile">Profil</NavLink>
            <NavLink href="/explore" subLinks={exploreSubLinks}>Arşiv</NavLink>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-primary-foreground h-8 w-8"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="flex items-center space-x-2 h-8 text-sm">
                <span className="text-sm hidden sm:inline">{email}</span>
                <span className="text-sm sm:hidden">Menu</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Ayarlar</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/main/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Çıkış Yap</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} closeMobileMenu={closeMobileMenu} />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-2 text-center text-sm">
      <div className="container mx-auto">
        <p>&copy; 2024 @Raf. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  )
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto py-8">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}