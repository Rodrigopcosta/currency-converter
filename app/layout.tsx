import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"
import { Toaster } from "@/components/ui/"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Conversor de Moedas Online | Real, Dólar e Euro em Tempo Real",
  description:
    "Conversor de moedas com taxas de câmbio atualizadas em tempo real. Converta Real, Dólar, Euro e as principais moedas mundiais de forma rápida, gratuita e precisa.",
  keywords: [
    "conversor de moedas",
    "real para dólar",
    "dólar para real",
    "câmbio online",
    "taxa de câmbio",
    "cotação moedas",
    "conversor financeiro"
  ],
  authors: [{ name: "Rodrigo Pereira" }],
  creator: "Rodrigo Pereira",
  publisher: "Conversor de Moedas",
  applicationName: "Conversor de Moedas",
  metadataBase: new URL("https://seusite.com"),
  alternates: {
    canonical: "/"
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Conversor de Moedas Online",
    description:
      "Converta moedas com taxas atualizadas em tempo real. Ferramenta financeira moderna e confiável.",
    url: "https://seusite.com",
    siteName: "Conversor de Moedas",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Conversor de Moedas"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Conversor de Moedas Online",
    description: "Taxas de câmbio atualizadas em tempo real",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true
  },
  category: "finance",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Conversor de Moedas"
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ]
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.className} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
