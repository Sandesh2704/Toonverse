"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { Toaster } from "sonner"
import { FloatingMessagingButton } from "@/components/shared/floating-messaging-button"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideLayoutOn = ["/writer", "/dashboard"]
  const hideLayout = hideLayoutOn.some(path => pathname.startsWith(path))

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
      <FloatingMessagingButton />
      <Toaster position="top-right" />
    </>
  )
}
