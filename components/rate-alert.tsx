"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bell, Plus, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"

interface Alert {
  id: string
  from: string
  to: string
  targetRate: number
  currentRate?: number
}

export function RateAlert() {
  const { t } = useLanguage()
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [showForm, setShowForm] = useState(false)
  const [newAlert, setNewAlert] = useState({
    from: "BRL",
    to: "USD",
    targetRate: "",
  })

  useEffect(() => {
    const saved = localStorage.getItem("rate-alerts")
    if (saved) {
      setAlerts(JSON.parse(saved))
    }
  }, [])

  const addAlert = () => {
    if (newAlert.targetRate) {
      const alert: Alert = {
        id: Date.now().toString(),
        from: newAlert.from,
        to: newAlert.to,
        targetRate: Number.parseFloat(newAlert.targetRate),
      }
      const updated = [...alerts, alert]
      setAlerts(updated)
      localStorage.setItem("rate-alerts", JSON.stringify(updated))
      setNewAlert({ from: "BRL", to: "USD", targetRate: "" })
      setShowForm(false)
    }
  }

  const removeAlert = (id: string) => {
    const updated = alerts.filter((a) => a.id !== id)
    setAlerts(updated)
    localStorage.setItem("rate-alerts", JSON.stringify(updated))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>{t.alert.title}</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-1" />
            {t.alert.addAlert}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && (
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>{t.alert.from}</Label>
                <Input
                  value={newAlert.from}
                  onChange={(e) => setNewAlert({ ...newAlert, from: e.target.value.toUpperCase() })}
                  placeholder="BRL"
                  maxLength={3}
                />
              </div>
              <div>
                <Label>{t.alert.to}</Label>
                <Input
                  value={newAlert.to}
                  onChange={(e) => setNewAlert({ ...newAlert, to: e.target.value.toUpperCase() })}
                  placeholder="USD"
                  maxLength={3}
                />
              </div>
            </div>
            <div>
              <Label>{t.alert.targetRate}</Label>
              <Input
                type="number"
                step="0.0001"
                value={newAlert.targetRate}
                onChange={(e) => setNewAlert({ ...newAlert, targetRate: e.target.value })}
                placeholder="0.0000"
              />
            </div>
            <Button onClick={addAlert} className="w-full">
              {t.alert.addAlert}
            </Button>
          </div>
        )}

        <div className="space-y-2">
          {alerts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">{t.alert.noAlerts}</p>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">
                    {alert.from} → {alert.to}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t.alert.targetRate}: {alert.targetRate.toFixed(4)}
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeAlert(alert.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
