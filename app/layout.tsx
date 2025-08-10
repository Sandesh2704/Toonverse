import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import LayoutWrapper from "@/components/shared/layout-wrapper"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "InkSaga - Your Ultimate Comic Reading Platform",
  description: "Discover, read, and share amazing comics and manga on InkSaga",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}
