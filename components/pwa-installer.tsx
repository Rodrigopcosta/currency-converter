"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    // O Service Worker deve ser registrado apenas em produção com servidor configurado
    // if ("serviceWorker" in navigator) {
    //   navigator.serviceWorker.register("/sw.js")
    // }

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowInstall(false)
    }
  }

  if (!showInstall) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:w-80 bg-card border rounded-lg shadow-lg p-4 z-50 animate-in slide-in-from-bottom-5">
      <button
        onClick={() => setShowInstall(false)}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
        aria-label="Fechar"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-start gap-3">
        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
          <Download className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Instalar App</h3>
          <p className="text-sm text-muted-foreground mb-3">Instale nosso app para acesso rápido e modo offline</p>
          <Button onClick={handleInstall} size="sm" className="w-full">
            Instalar Agora
          </Button>
        </div>
      </div>
    </div>
  )
}
