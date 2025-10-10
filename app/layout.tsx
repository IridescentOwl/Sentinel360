import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Sentinel 360 - Subscription Sharing for Thapar Students",
  description:
    "Share subscriptions and save money with trusted Thapar University students. Secure, simple, and smart subscription management.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      </head>
      <body className="font-sans bg-[#0D0F1E] text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}