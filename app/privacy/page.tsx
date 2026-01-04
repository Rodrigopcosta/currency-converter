"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export default function PrivacyPage() {
  const { language } = useLanguage()
  const t = translations[language].privacy

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2 tracking-tight">{t.title}</h1>
      <p className="text-muted-foreground mb-8 text-sm">{t.lastUpdated}</p>
      
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 italic">
          {t.intro}
        </p>

        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <section key={num} className="border-b border-slate-100 dark:border-slate-800 pb-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">
              {t[`section${num}Title` as keyof typeof t]}
            </h2>
            <p className="leading-relaxed opacity-90">
              {t[`section${num}Content` as keyof typeof t]}
            </p>
          </section>
        ))}

        <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900 mt-10">
          <h2 className="text-xl font-bold mb-2 text-blue-800 dark:text-blue-300">{t.section10Title}</h2>
          <p className="text-blue-900/80 dark:text-blue-200/80">{t.section10Content}</p>
        </div>
      </div>
    </div>
  )
}