"use client"
import type React from "react"
import { Provider } from "react-redux"
import { store } from "@/store"
import { Toaster } from "sonner"
import { AuthProvider } from "@/hooks/useAuth"
import { ThemeProvider } from "@/components/theme-provider"
import { ChatProvider } from "@/components/chat/chat-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <ChatProvider>
            {children}
            <Toaster position="top-right" richColors />
          </ChatProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  )
}
