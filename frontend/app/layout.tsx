import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ATLAS — La mode algérienne, en confiance.",
  description:
    "La première plateforme algérienne d'e-commerce textile multi-acteurs avec paiement sécurisé Atlas Escrow.",
  keywords: "mode algérienne, vêtements, kaftan, artisans, boutique en ligne, DZD",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white text-[#1F3A5F] antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontFamily: "var(--font-inter), sans-serif", fontSize: "14px" },
          }}
        />
      </body>
    </html>
  )
}
