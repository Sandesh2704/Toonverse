"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { SidebarProvider } from "@/components/ui/sidebar"
import { WriterSidebar } from "@/components/writer/writer-sidebar"
import { WriterHeader } from "@/components/writer/writer-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { motion } from "framer-motion"

export default function WriterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    // Check if user has writer access
    if (!user || !["writer", "admin", "super_admin"].includes(user.role)) {
      router.push("/auth/become-writer")
    }
  }, [user, router])

  if (!user || !["writer", "admin", "super_admin"].includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Writer Access Required</h1>
          <p className="text-muted-foreground mb-4">You need to be a verified writer to access this area.</p>
          <button
            onClick={() => router.push("/auth/become-writer")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Become a Writer
          </button>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <WriterSidebar />
        <SidebarInset className="flex-1">
          <WriterHeader />
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 p-6"
          >
            {children}
          </motion.main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
