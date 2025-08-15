"use client"

import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { mockMessages } from "@/data/chat"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { ChatHeader } from "./chat-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface ChatWindowProps {
  roomId: string
}

export function ChatWindow({ roomId }: ChatWindowProps) {
  const { activeRooms, typingUsers } = useSelector((state: RootState) => state.chat)
  const [messages, setMessages] = useState(mockMessages[roomId] || [])
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const room = activeRooms.find((r) => r.id === roomId)
  const typing = typingUsers[roomId] || []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      content,
      senderId: "current-user",
      senderName: "You",
      senderAvatar: "/default-image/comic2.jpg?height=32&width=32",
      timestamp: new Date(),
      type: "text" as const,
    }

    setMessages((prev) => [...prev, newMessage])
  }

  if (!room) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <p>Chat room not found</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <ChatHeader room={room} />
      <Separator />

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              showAvatar={
                index === 0 ||
                messages[index - 1].senderId !== message.senderId ||
                new Date(message.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() > 300000
              }
            />
          ))}

          {/* Typing Indicator */}
          {typing.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
              <span>
                {typing.length === 1
                  ? `${typing[0]} is typing...`
                  : `${typing.slice(0, -1).join(", ")} and ${typing[typing.length - 1]} are typing...`}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className="border-t p-4">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}
