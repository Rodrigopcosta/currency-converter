"use client"

import { DollarSign } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSelector } from "./language-selector"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const { t } = useLanguage()

  return (
    <header className="border-b sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <DollarSign className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">{t.header.title}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              {t.header.home}
            </Link>
            <Link href="#conversoes" className="text-sm font-medium hover:text-primary transition-colors">
              {t.header.conversions}
            </Link>
            <Link href="#recursos" className="text-sm font-medium hover:text-primary transition-colors">
              {t.header.resources}
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
              {t.header.faq}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
