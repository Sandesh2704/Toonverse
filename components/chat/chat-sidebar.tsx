"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import { setActiveChat, setSearchOpen } from "@/store/chatSlice"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Hash, User, Settings } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function ChatSidebar() {
  const dispatch = useDispatch()
  const { activeRooms, activeChat, onlineUsers } = useSelector((state: RootState) => state.chat)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRooms = activeRooms.filter((room) => room.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const groupChats = filteredRooms.filter((room) => room.type === "group")
  const directMessages = filteredRooms.filter((room) => room.type === "direct")

  const handleGlobalSearch = () => {
    dispatch(setSearchOpen(true))
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 border-b space-y-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleGlobalSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search all messages
        </Button>
      </div>

      {/* Chat Tabs */}
      <Tabs defaultValue="groups" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mx-4 mt-2">
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="direct">Direct</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="flex-1 mt-2">
          <ScrollArea className="h-full">
            <div className="space-y-1 p-2">
              {groupChats.map((room) => (
                <Button
                  key={room.id}
                  variant={activeChat === room.id ? "secondary" : "ghost"}
                  className="w-full justify-start h-auto p-3"
                  onClick={() => dispatch(setActiveChat(room.id))}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={room.avatar || "/default-image/comic2.jpg"} />
                        <AvatarFallback>
                          <Hash className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      {room.participants.some((p) => p.isOnline) && (
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{room.name}</p>
                        {room.unreadCount > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 p-0 text-xs rounded-full">
                            {room.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {room.lastMessage?.content || "No messages yet"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {room.lastActivity && formatDistanceToNow(room.lastActivity, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="direct" className="flex-1 mt-2">
          <ScrollArea className="h-full">
            <div className="space-y-1 p-2">
              {directMessages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No direct messages yet</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    Start a conversation
                  </Button>
                </div>
              ) : (
                directMessages.map((room) => (
                  <Button
                    key={room.id}
                    variant={activeChat === room.id ? "secondary" : "ghost"}
                    className="w-full justify-start h-auto p-3"
                    onClick={() => dispatch(setActiveChat(room.id))}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={room.avatar || "/default-image/comic2.jpg"} />
                          <AvatarFallback>{room.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {room.isOnline && (
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{room.name}</p>
                          {room.unreadCount > 0 && (
                            <Badge variant="destructive" className="h-5 w-5 p-0 text-xs rounded-full">
                              {room.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {room.lastMessage?.content || "No messages yet"}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Settings */}
      <div className="p-4 border-t">
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Settings className="h-4 w-4 mr-2" />
          Chat Settings
        </Button>
      </div>
    </div>
  )
}
