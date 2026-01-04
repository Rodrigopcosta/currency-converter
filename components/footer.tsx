"use client"

import { DollarSign } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <DollarSign className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold">{t.header.title}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 text-pretty">{t.footer.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">{t.footer.quickLinks}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  {t.footer.home}
                </Link>
              </li>
              <li>
                <Link href="#conversoes" className="hover:text-primary transition-colors">
                  {t.footer.popularConversions}
                </Link>
              </li>
              <li>
                <Link href="#recursos" className="hover:text-primary transition-colors">
                  {t.footer.resources}
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-primary transition-colors">
                  {t.footer.frequentQuestions}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">{t.footer.popularCurrencies}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/?from=BRL&to=USD" className="hover:text-primary transition-colors">
                  {t.footer.realToDollar}
                </Link>
              </li>
              <li>
                <Link href="/?from=USD&to=BRL" className="hover:text-primary transition-colors">
                  {t.footer.dollarToReal}
                </Link>
              </li>
              <li>
                <Link href="/?from=EUR&to=BRL" className="hover:text-primary transition-colors">
                  {t.footer.euroToReal}
                </Link>
              </li>
              <li>
                <Link href="/?from=BRL&to=EUR" className="hover:text-primary transition-colors">
                  {t.footer.realToEuro}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {t.header.title}. {t.footer.copyright}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacidade" className="hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-primary transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
