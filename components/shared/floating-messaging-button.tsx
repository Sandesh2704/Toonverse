"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useChat } from "@/components/chat/chat-provider"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"

export function FloatingMessagingButton() {
  const { state, openChat } = useChat()
  const { user } = useSelector((state: RootState) => state.user)
  const [isVisible, setIsVisible] = useState(false)

  // Show button after a delay and only for logged-in users
  useEffect(() => {
    if (!user) return
    
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [user])

  if (!user || !isVisible) return null

  return (
    <AnimatePresence>
      {!state.isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={openChat}
            size="lg"
            className="relative h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-200 group"
          >
            <MessageSquare className="h-6 w-6 text-white" />
            
            {/* Notification badge */}
            {state.unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2"
              >
                <Badge 
                  variant="destructive" 
                  className="h-6 w-6 p-0 text-xs flex items-center justify-center rounded-full animate-pulse"
                >
                  {state.unreadCount > 9 ? "9+" : state.unreadCount}
                </Badge>
              </motion.div>
            )}

            {/* Pulse animation */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </Button>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 bg-background border rounded-lg px-3 py-2 text-sm shadow-lg whitespace-nowrap"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-purple-500" />
              <span>Messages</span>
              {state.unreadCount > 0 && (
                <Badge variant="destructive" className="h-4 w-4 p-0 text-xs">
                  {state.unreadCount}
                </Badge>
              )}
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-background border-r border-t transform rotate-45" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

