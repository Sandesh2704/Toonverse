"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { Toaster } from "sonner"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideLayoutOn = ["/writer", "/community", "/dashboard"]
  const hideLayout = hideLayoutOn.some(path => pathname.startsWith(path))

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
      <Toaster position="top-right" />
    </>
  )
}
