"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

const popularConversions = [
  { from: "BRL", to: "USD", fromName: "Real", toName: "Dólar", flag: "🇧🇷→🇺🇸" },
  { from: "USD", to: "BRL", fromName: "Dólar", toName: "Real", flag: "🇺🇸→🇧🇷" },
  { from: "EUR", to: "BRL", fromName: "Euro", toName: "Real", flag: "🇪🇺→🇧🇷" },
  { from: "BRL", to: "EUR", fromName: "Real", toName: "Euro", flag: "🇧🇷→🇪🇺" },
  { from: "GBP", to: "BRL", fromName: "Libra", toName: "Real", flag: "🇬🇧→🇧🇷" },
  { from: "BRL", to: "ARS", fromName: "Real", toName: "Peso", flag: "🇧🇷→🇦🇷" },
]

export function PopularConversions() {
  const { t } = useLanguage()

  return (
    <section id="conversoes" className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.popular.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {popularConversions.map((conversion) => (
            <Link key={`${conversion.from}-${conversion.to}`} href={`/?from=${conversion.from}&to=${conversion.to}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-primary/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{conversion.flag}</span>
                      <div>
                        <p className="font-semibold">
                          {conversion.fromName} → {conversion.toName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {conversion.from}/{conversion.to}
                        </p>
                      </div>
                    </div>
                    <TrendingUp className="h-5 w-5 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
