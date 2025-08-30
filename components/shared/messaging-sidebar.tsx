"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Users, Maximize2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { mockChatRooms } from "@/data/chat"

interface MessagingSidebarProps {
  isOpen: boolean
  onClose: () => void
  onMaximize: () => void
}

export function MessagingSidebar({ isOpen, onClose, onMaximize }: MessagingSidebarProps) {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.user)
  const [activeTab, setActiveTab] = useState<"recent" | "groups">("recent")

  // Get recent conversations and groups
  const recentConversations = mockChatRooms.slice(0, 5)
  const groupChats = mockChatRooms.filter(room => room.type === "group").slice(0, 3)

  const handleOpenChat = (roomId: string) => {
    router.push(`/community/chat?room=${roomId}`)
    onClose()
  }

  const handleOpenFullPage = () => {
    router.push("/community/chat")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-background border-l shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-purple-500" />
          <h3 className="font-semibold">Messages</h3>
          <Badge variant="destructive" className="ml-2">
            1
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMaximize}
            className="h-8 w-8"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("recent")}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "recent"
              ? "border-b-2 border-purple-500 text-purple-600"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Recent
        </button>
        <button
          onClick={() => setActiveTab("groups")}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "groups"
              ? "border-b-2 border-purple-500 text-purple-600"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Groups
        </button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {activeTab === "recent" ? (
            <>
              {recentConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleOpenChat(conversation.id)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.avatar || "/default-image/comic2.jpg"} />
                      <AvatarFallback>
                        {conversation.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.participants.some(p => p.isOnline) && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{conversation.name}</p>
                      {conversation.unreadCount > 0 && (
                        <Badge variant="destructive" className="h-5 w-5 p-0 text-xs rounded-full">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {conversation.lastMessage?.content || "No messages yet"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {conversation.lastActivity && formatDistanceToNow(conversation.lastActivity, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {groupChats.map((group) => (
                <div
                  key={group.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleOpenChat(group.id)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={group.avatar || "/default-image/comic2.jpg"} />
                      <AvatarFallback>
                        <Users className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    {group.participants.some(p => p.isOnline) && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{group.name}</p>
                      {group.unreadCount > 0 && (
                        <Badge variant="destructive" className="h-5 w-5 p-0 text-xs rounded-full">
                          {group.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {group.participants.filter(p => p.isOnline).length} online
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button
          onClick={handleOpenFullPage}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Open Full Messages
        </Button>
      </div>
    </div>
  )
}

