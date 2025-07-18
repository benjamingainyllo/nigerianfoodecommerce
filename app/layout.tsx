import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NaijaFoods - Authentic Nigerian Foods Delivered Worldwide",
  description:
    "Connect with local Nigerian markets and get authentic ingredients delivered to your doorstep, no matter where you are. Track your orders in real-time.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* Quick Access Navigation */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="flex flex-col space-y-2">
            <Link href="/orders">
              <div className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4-4-4m0 0L9 9l-4-4"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
