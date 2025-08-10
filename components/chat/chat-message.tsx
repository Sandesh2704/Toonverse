"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Reply, Smile, Copy, Edit, Trash2 } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import type { Message } from "@/types/chat"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ChatMessageProps {
  message: Message
  showAvatar: boolean
}

export function ChatMessage({ message, showAvatar }: ChatMessageProps) {
  const [showActions, setShowActions] = useState(false)
  const isCurrentUser = message.senderId === "current-user"

  const handleReaction = (emoji: string) => {
    console.log("Add reaction:", emoji, "to message:", message.id)
  }

  const handleReply = () => {
    console.log("Reply to message:", message.id)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
  }

  const handleEdit = () => {
    console.log("Edit message:", message.id)
  }

  const handleDelete = () => {
    console.log("Delete message:", message.id)
  }

  return (
    <div
      className={`group flex gap-3 hover:bg-accent/30 p-2 rounded-lg transition-colors ${
        !showAvatar ? "mt-1" : "mt-4"
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {showAvatar ? (
          <Avatar className="h-8 w-8">
            <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
            <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="w-8 h-8 flex items-center justify-center">
            <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              {format(message.timestamp, "HH:mm")}
            </span>
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        {showAvatar && (
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">{message.senderName}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(message.timestamp, { addSuffix: true })}
            </span>
            {message.edited && (
              <Badge variant="outline" className="text-xs">
                edited
              </Badge>
            )}
          </div>
        )}

        <div className="text-sm leading-relaxed">{message.content}</div>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {message.reactions.map((reaction) => (
              <Button
                key={reaction.emoji}
                variant="outline"
                size="sm"
                className="h-6 px-2 text-xs bg-transparent"
                onClick={() => handleReaction(reaction.emoji)}
              >
                {reaction.emoji} {reaction.count}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Message Actions */}
      {showActions && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleReaction("👍")}>
            <Smile className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleReply}>
            <Reply className="h-3 w-3" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger >
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy message
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleReply}>
                <Reply className="h-4 w-4 mr-2" />
                Reply
              </DropdownMenuItem>
              {isCurrentUser && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit message
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete message
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  )
}
