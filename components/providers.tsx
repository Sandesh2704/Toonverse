"use client"
import type React from "react"
import { Provider } from "react-redux"
import { store } from "@/store"
import { Toaster } from "sonner"
import { AuthProvider } from "@/hooks/useAuth"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </Provider>
  )
}
