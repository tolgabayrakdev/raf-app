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



function NavLink({ href, children: children }: { href: string, children: React.ReactNode }) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={`text-primary-foreground hover:text-primary-foreground/80 font-medium px-2 py-1.5 rounded-md bg-primary-foreground/10 relative group text-sm`}
            aria-current={isActive ? "page" : undefined}
        >
            {children}
            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-foreground transform ${isActive ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 ease-in-out`}></span>
        </Link>
    )
}

function MobileNav({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
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
                <nav className="flex flex-col space-y-4 mt-8">
                    <NavLink href="/main">Main</NavLink>
                    <NavLink href="/main/profile">Profile</NavLink>
                    <NavLink href="/explore">Explore</NavLink>
                </nav>
            </div>
        </div>
    )
}

function Header() {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState<string>('Yükleniyor...')

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

    return (
        <header className="bg-primary text-primary-foreground py-2 px-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <h1 className="text-xl font-bold">Raf.</h1>
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex space-x-3">
                        <NavLink href="/main">Main</NavLink>
                        <NavLink href="/main/profile">Profile</NavLink>
                        <NavLink href="/explore">Explore</NavLink>
                    </nav>
                </div>

                <div className="flex items-center space-x-3">
                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden text-primary-foreground h-8 w-8"
                        onClick={() => setIsOpen(true)}
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
                            <DropdownMenuItem>
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
            <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>
    )
}

function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-600 py-4 text-center text-sm">
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
