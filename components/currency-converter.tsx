"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeftRight } from "lucide-react"
import { CurrencySelect } from "./currency-select"

interface ExchangeRates {
  [key: string]: number
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("100")
  const [fromCurrency, setFromCurrency] = useState("BRL")
  const [toCurrency, setToCurrency] = useState("USD")
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    fetchExchangeRate()
  }, [fromCurrency, toCurrency])

  useEffect(() => {
    if (exchangeRate && amount) {
      const numAmount = Number.parseFloat(amount)
      if (!isNaN(numAmount)) {
        setConvertedAmount(numAmount * exchangeRate)
      }
    }
  }, [amount, exchangeRate])

  const fetchExchangeRate = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      const data = await response.json()
      setExchangeRate(data.rates[toCurrency])
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Error fetching exchange rate:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveToHistory = () => {
    if (exchangeRate && amount && convertedAmount) {
      const history = JSON.parse(localStorage.getItem("conversion-history") || "[]")
      const newRecord = {
        id: Date.now().toString(),
        from: fromCurrency,
        to: toCurrency,
        amount: Number.parseFloat(amount),
        result: convertedAmount,
        rate: exchangeRate,
        timestamp: new Date().toISOString(),
      }
      history.unshift(newRecord)
      if (history.length > 10) history.pop()
      localStorage.setItem("conversion-history", JSON.stringify(history))
      window.dispatchEvent(new Event("conversion-added"))
    }
  }

  useEffect(() => {
    if (convertedAmount) {
      saveToHistory()
    }
  }, [convertedAmount])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="space-y-6">
          {/* From Currency */}
          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <div className="flex gap-3">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="text-lg"
              />
              <CurrencySelect value={fromCurrency} onChange={setFromCurrency} />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={swapCurrencies}
              className="rounded-full bg-transparent"
              aria-label="Trocar moedas"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          {/* To Currency */}
          <div className="space-y-2">
            <Label htmlFor="converted">Convertido</Label>
            <div className="flex gap-3">
              <Input
                id="converted"
                type="text"
                value={convertedAmount ? formatCurrency(convertedAmount, toCurrency) : ""}
                readOnly
                className="text-lg font-semibold bg-muted"
              />
              <CurrencySelect value={toCurrency} onChange={setToCurrency} />
            </div>
          </div>

          {/* Exchange Rate Info */}
          {exchangeRate && (
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Taxa de câmbio</span>
                <span className="font-semibold">
                  1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Última atualização: {lastUpdate.toLocaleTimeString("pt-BR")}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={fetchExchangeRate}
                  disabled={loading}
                  className="h-auto py-1 px-2"
                >
                  {loading ? "Atualizando..." : "Atualizar"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
