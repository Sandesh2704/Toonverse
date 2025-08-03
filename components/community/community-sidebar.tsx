"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Home, MessageSquare, Users, Calendar, Handshake, Settings, Hash, User } from "lucide-react"

const navigationItems = [
  {
    title: "Overview",
    href: "/community",
    icon: Home,
  },
  {
    title: "Chat",
    href: "/community/chat",
    icon: MessageSquare,
    badge: "chat",
  },
  {
    title: "Forums",
    href: "/community/forums",
    icon: MessageSquare,
  },
  {
    title: "Groups",
    href: "/community/groups",
    icon: Users,
  },
  {
    title: "Events",
    href: "/community/events",
    icon: Calendar,
  },
  {
    title: "Collaborations",
    href: "/community/collaborations",
    icon: Handshake,
  },
]

export function CommunitySidebar() {
  const pathname = usePathname()
  const { activeRooms } = useSelector((state: RootState) => state.chat)

  const totalUnreadMessages = activeRooms.reduce((acc, room) => acc + room.unreadCount, 0)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6">
        <h2 className="text-lg font-semibold">Community</h2>
        <p className="text-sm text-muted-foreground">Connect with fellow creators</p>
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-4">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            const showBadge = item.badge === "chat" && totalUnreadMessages > 0

            return (
              <Button
                key={item.href}
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                  {showBadge && (
                    <Badge variant="destructive" className="ml-auto h-5 w-5 p-0 text-xs rounded-full">
                      {totalUnreadMessages}
                    </Badge>
                  )}
                </Link>
              </Button>
            )
          })}
        </div>

        <Separator className="my-4" />

        {/* Quick Chat Access */}
        <div className="space-y-2 py-4">
          <h3 className="px-3 text-sm font-medium text-muted-foreground">Quick Chat</h3>
          {activeRooms.slice(0, 3).map((room) => (
            <Button key={room.id} variant="ghost" size="sm" className="w-full justify-start h-auto p-2" asChild>
              <Link href="/community/chat">
                <div className="flex items-center gap-2 w-full">
                  {room.type === "group" ? (
                    <Hash className="h-3 w-3 text-muted-foreground" />
                  ) : (
                    <User className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span className="text-xs truncate flex-1">{room.name}</span>
                  {room.unreadCount > 0 && (
                    <Badge variant="destructive" className="h-4 w-4 p-0 text-xs rounded-full">
                      {room.unreadCount}
                    </Badge>
                  )}
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Community Settings
        </Button>
      </div>
    </div>
  )
}
