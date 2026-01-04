"use client"

import { CurrencyConverter } from "@/components/currency-converter"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PopularConversions } from "@/components/popular-conversions"
import { FeaturesSection } from "@/components/features-section"
import { FAQSection } from "@/components/faq-section"
import { ConversionHistory } from "@/components/conversion-history"
import { ExchangeRateChart } from "@/components/exchange-rate-chart"
import { RateAlert } from "@/components/rate-alert"
import { BackToTop } from "@/components/back-to-top"
import { PWAInstaller } from "@/components/pwa-installer"
import { useLanguage } from "@/lib/language-context"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-linear-to-b from-primary/5 to-background py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-balance">{t.hero.title}</h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty">{t.hero.subtitle}</p>
            </div>

            <CurrencyConverter />
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <ConversionHistory />
              <RateAlert />
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ExchangeRateChart fromCurrency="BRL" toCurrency="USD" />
            </div>
          </div>
        </section>

        {/* Popular Conversions */}
        <PopularConversions />

        {/* Features Section */}
        <FeaturesSection />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      <Footer />

      <BackToTop />
      <PWAInstaller />
    </div>
  )
}
