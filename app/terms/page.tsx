"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export default function TermsPage() {
  const { language } = useLanguage()
  const t = translations[language].terms

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2 tracking-tight">{t.title}</h1>
      <p className="text-muted-foreground mb-8 text-sm">{t.lastUpdated}</p>
      
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          {t.intro}
        </p>

        <section className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">{t.section1Title}</h2>
          <p className="leading-relaxed">{t.section1Content}</p>
        </section>

        <section className="p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded-xl">
          <h2 className="text-xl font-bold mb-3 text-amber-800 dark:text-amber-400">
            ⚠️ {t.section3Title}
          </h2>
          <p className="leading-relaxed text-amber-900/90 dark:text-amber-200/90 font-medium">
            {t.section3Content}
          </p>
        </section>

        {[2, 4, 5, 6, 7].map((num) => (
          <section key={num} className="px-6">
            <h2 className="text-xl font-semibold mb-3">
              {t[`section${num}Title` as keyof typeof t]}
            </h2>
            <p className="leading-relaxed opacity-90">
              {t[`section${num}Content` as keyof typeof t]}
            </p>
          </section>
        ))}

        <div className="pt-8 border-t px-6">
          <h2 className="text-lg font-semibold mb-2">{t.section8Title}</h2>
          <p className="text-sm opacity-70">{t.section8Content}</p>
        </div>
      </div>
    </div>
  )
}