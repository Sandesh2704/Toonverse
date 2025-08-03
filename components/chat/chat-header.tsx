"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import { setSearchOpen } from "@/store/chatSlice"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Hash, User, Search, Phone, Video, MoreVertical } from "lucide-react"
import type { ChatRoom } from "@/types/chat"

interface ChatHeaderProps {
  room: ChatRoom
}

export function ChatHeader({ room }: ChatHeaderProps) {
  const dispatch = useDispatch()
  const { onlineUsers } = useSelector((state: RootState) => state.chat)

  const onlineParticipants = room.participants.filter((p) => p.isOnline)

  const handleSearchInChat = () => {
    dispatch(setSearchOpen(true))
  }

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={room.avatar || "/placeholder.svg"} />
          <AvatarFallback>
            {room.type === "group" ? <Hash className="h-4 w-4" /> : <User className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{room.name}</h3>
          <div className="flex items-center gap-2">
            {room.type === "group" ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {room.participants.length} member{room.participants.length !== 1 ? "s" : ""}
                </span>
                {onlineParticipants.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {onlineParticipants.length} online
                  </Badge>
                )}
              </>
            ) : (
              <div className="flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${room.isOnline ? "bg-green-500" : "bg-gray-400"}`} />
                <span className="text-sm text-muted-foreground">{room.isOnline ? "Online" : "Offline"}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleSearchInChat}>
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
