"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Zap, Shield, Clock, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Zap,
      title: t.features.instant.title,
      description: t.features.instant.description,
    },
    {
      icon: Shield,
      title: t.features.reliable.title,
      description: t.features.reliable.description,
    },
    {
      icon: Clock,
      title: t.features.available.title,
      description: t.features.available.description,
    },
    {
      icon: Globe,
      title: t.features.currencies.title,
      description: t.features.currencies.description,
    },
  ]

  return (
    <section id="recursos" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.features.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t.features.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="text-center">
                <CardContent className="pt-6 pb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
