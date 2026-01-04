"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { History, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"

interface ConversionRecord {
  id: string
  from: string
  to: string
  amount: number
  result: number
  rate: number
  timestamp: Date
}

export function ConversionHistory() {
  const { t } = useLanguage()
  const [history, setHistory] = useState<ConversionRecord[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("conversion-history")
    if (saved) {
      const parsed = JSON.parse(saved)
      setHistory(
        parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        })),
      )
    }

    const handleStorageChange = () => {
      const updated = localStorage.getItem("conversion-history")
      if (updated) {
        const parsed = JSON.parse(updated)
        setHistory(
          parsed.map((item: any) => ({
            ...item,
            timestamp: new Date(item.timestamp),
          })),
        )
      }
    }

    window.addEventListener("conversion-added", handleStorageChange)
    return () => window.removeEventListener("conversion-added", handleStorageChange)
  }, [])

  const clearHistory = () => {
    localStorage.removeItem("conversion-history")
    setHistory([])
  }

  if (history.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5" />
            <CardTitle>{t.history.title}</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={clearHistory} aria-label={t.history.clear}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.slice(0, 5).map((record) => (
            <div key={record.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex-1">
                <div className="font-medium">
                  {record.amount.toFixed(2)} {record.from} → {record.result.toFixed(2)} {record.to}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t.converter.exchangeRate}: {record.rate.toFixed(4)} • {record.timestamp.toLocaleDateString("pt-BR")}{" "}
                  às {record.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
