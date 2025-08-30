"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, MessageSquare, Users, Calendar, Palette, Trophy, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from "@/components/chat/chat-provider"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { formatDistanceToNow } from "date-fns"

export function EnhancedNotifications() {
  const { state, markNotificationRead } = useChat()
  const { user } = useSelector((state: RootState) => state.user)
  const [isOpen, setIsOpen] = useState(false)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "mention":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      case "reply":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "event":
        return <Calendar className="h-4 w-4 text-orange-500" />
      case "badge":
        return <Trophy className="h-4 w-4 text-yellow-500" />
      case "level_up":
        return <Star className="h-4 w-4 text-purple-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "message":
        return "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20"
      case "mention":
        return "border-l-purple-500 bg-purple-50 dark:bg-purple-950/20"
      case "reply":
        return "border-l-green-500 bg-green-50 dark:bg-green-950/20"
      case "event":
        return "border-l-orange-500 bg-orange-50 dark:bg-orange-950/20"
      case "badge":
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
      case "level_up":
        return "border-l-purple-500 bg-purple-50 dark:bg-purple-950/20"
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-950/20"
    }
  }

  if (!user) return null

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {state.unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1"
          >
            <Badge
              variant="destructive"
              className="h-5 w-5 p-0 text-xs flex items-center justify-center rounded-full animate-pulse"
            >
              {state.unreadCount > 9 ? "9+" : state.unreadCount}
            </Badge>
          </motion.div>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-80 bg-background border rounded-lg shadow-lg z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b">
              <h3 className="font-semibold text-sm">Notifications</h3>
              <div className="flex items-center gap-2">
                {state.unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {state.unreadCount} new
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <ScrollArea className="max-h-96">
              {state.notifications.length === 0 ? (
                <div className="p-6 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No notifications yet</p>
                </div>
              ) : (
                <div className="p-2 space-y-1">
                  {state.notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all duration-200 hover:bg-muted/50 ${
                        getNotificationColor(notification.type)
                      } ${!notification.read ? "bg-muted/30" : ""}`}
                      onClick={() => {
                        markNotificationRead(notification.id)
                        setIsOpen(false)
                      }}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Footer */}
            {state.notifications.length > 0 && (
              <div className="p-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => {
                    // Mark all as read
                    state.notifications.forEach(n => markNotificationRead(n.id))
                    setIsOpen(false)
                  }}
                >
                  Mark all as read
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

