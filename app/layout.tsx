import type React from "react"
import type { Metadata, Viewport } from "next"
import { Cinzel, Cormorant_Garamond, Inter, Noto_Sans_Khmer, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LenisProvider } from "@/components/lenis-provider"
import ClickSpark from "@/components/click-spark"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/components/language-provider"
import { CartProvider } from "@/components/shop/cart-provider"
import { CartDrawer } from "@/components/shop/cart-drawer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
})

const khmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-khmer",
})

export const metadata: Metadata = {
  title: {
    default: "Global Angkor Royal | Prodotti autentici dalla Cambogia al mondo",
    template: "%s | Global Angkor Royal",
  },
  description:
    "Global Angkor Royal MG Co., Ltd. seleziona i migliori prodotti naturali della Cambogia — riso Jasmine, pepe di Kampot, olio di cocco, seta — e li porta sui mercati internazionali.",
  keywords: ["Global Angkor Royal", "riso Jasmine cambogiano", "pepe di Kampot", "olio di cocco", "prodotti cambogiani", "export Cambogia"],
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#0f3b27",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" suppressHydrationWarning className={`${inter.variable} ${cinzel.variable} ${cormorant.variable} ${khmer.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <ClickSpark sparkColor="#c08a2b" sparkSize={12} sparkRadius={20} sparkCount={8} duration={400} easing="ease-out">
          <LenisProvider>
            <LanguageProvider>
              <CartProvider>
                <Navigation />
                <main className="min-h-screen bg-background">{children}</main>
                <Footer />
                <CartDrawer />
              </CartProvider>
            </LanguageProvider>
          </LenisProvider>
        </ClickSpark>
        <Analytics />
      </body>
    </html>
  )
}
