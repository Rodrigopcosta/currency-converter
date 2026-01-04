"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const currencies = [
  { code: "BRL", name: "Real Brasileiro", flag: "🇧🇷" },
  { code: "USD", name: "Dólar Americano", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "Libra Esterlina", flag: "🇬🇧" },
  { code: "JPY", name: "Iene Japonês", flag: "🇯🇵" },
  { code: "CAD", name: "Dólar Canadense", flag: "🇨🇦" },
  { code: "AUD", name: "Dólar Australiano", flag: "🇦🇺" },
  { code: "CHF", name: "Franco Suíço", flag: "🇨🇭" },
  { code: "CNY", name: "Yuan Chinês", flag: "🇨🇳" },
  { code: "ARS", name: "Peso Argentino", flag: "🇦🇷" },
]

interface CurrencySelectProps {
  value: string
  onChange: (value: string) => void
}

export function CurrencySelect({ value, onChange }: CurrencySelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-35">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            <span className="flex items-center gap-2">
              <span>{currency.flag}</span>
              <span>{currency.code}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
