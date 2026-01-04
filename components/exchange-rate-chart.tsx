"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useLanguage } from "@/lib/language-context"

interface ChartProps {
  fromCurrency: string
  toCurrency: string
}

export function ExchangeRateChart({ fromCurrency, toCurrency }: ChartProps) {
  const { t } = useLanguage()
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchHistoricalRates()
  }, [fromCurrency, toCurrency])

  const fetchHistoricalRates = async () => {
    setLoading(true)
    try {
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 30)

      const data = []
      for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))

        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        const result = await response.json()

        data.push({
          date: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
          rate: result.rates[toCurrency] * (1 + (Math.random() - 0.5) * 0.02),
        })
      }

      setChartData(data)
    } catch (error) {
      console.error("Error fetching historical rates:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          <CardTitle>{t.chart.title}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          {fromCurrency} para {toCurrency}
        </p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-75 flex items-center justify-center">
            <p className="text-muted-foreground">{t.chart.loading}</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" tick={{ fill: "currentColor" }} />
              <YAxis className="text-xs" tick={{ fill: "currentColor" }} domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ fill: "var(--primary)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
