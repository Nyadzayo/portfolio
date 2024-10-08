import React from 'react'
import Link from 'next/link';
import ThemeToggle from '@/components/ui/theme-toggle'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/75 py-6 backdrop-blur-sm">
    <nav className="container flex max-w-3xl items-center justify-between">
        <div>
            <Link href='/' className="font-sans text-2xl font-bold">
            KN
            </Link>
        </div>
        <ul className="flex  items-center gap-6 text-sm font-light text-muted-foreground sm">
            <li className="transition-colors hover:text-foreground">
                <Link href='/posts'>
                    Posts
                </Link>
            </li>
            <li className="transition-colors hover:text-foreground">
                <Link href='/projects'>
                    Projects
                </Link>
            </li>
            <li className="transition-colors hover:text-foreground">
                <Link href='/project-request'>
                    Request A Project
                </Link>
            </li>
            <li className="transition-colors hover:text-foreground">
                <Link href='/contact'>
                    Contact
                </Link>
            </li>

        </ul>
        <div>
            <ThemeToggle/>
        </div>
    </nav>

   </header>
  )
}
