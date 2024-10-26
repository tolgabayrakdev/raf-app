"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut, Settings, User } from "lucide-react"
import { usePathname } from "next/navigation"



function NavLink({ href, children: children }: { href: string, children: React.ReactNode }) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={`text-primary-foreground hover:text-primary-foreground/80 font-medium px-3 py-2 rounded-md bg-primary-foreground/10 relative group`}
            aria-current={isActive ? "page" : undefined}
        >
            {children}
            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-foreground transform ${isActive ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 ease-in-out`}></span>
        </Link>
    )
}


function Header({ email }: { email: string }) {    
    return (
        <header className="bg-primary text-primary-foreground p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <h1 className="text-2xl font-bold">Logo</h1>
                    <nav className="space-x-4">
                        <NavLink href="/main">Main</NavLink>
                        <NavLink href="/main/profile">Profile</NavLink>
                        <NavLink href="/explore">Explore</NavLink>
                    </nav>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="flex items-center space-x-2">
                            <span className="text-sm">{email}</span>
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
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Çıkış Yap</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
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
        <div className="flex flex-col min-h-screen">
            <Header email={"tolgabayrak@raf.com"} />
            <main className="flex-grow container mx-auto py-8">
                {children}
            </main>
            <Footer />
        </div>
    )
}