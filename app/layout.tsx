import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Music Player for Reddit",
  description: "A free and open-source streaming music web player using data from Reddit",
  keywords: ["music", "reddit", "streaming", "player", "youtube", "soundcloud"],
  authors: [{ name: "v0", url: "https://v0.app" }],
  openGraph: {
    title: "Music Player for Reddit",
    description: "Stream music from Reddit communities",
    type: "website",
    url: "https://reddit.musicplayer.io",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1a1a1a" />
      </head>
      <body className={`${geist.className} antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
