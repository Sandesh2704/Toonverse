"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import { setSearchOpen } from "@/store/chatSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Search, Users, Hash, Zap } from "lucide-react"

export function ChatWelcome() {
  const dispatch = useDispatch()
  const { activeRooms } = useSelector((state: RootState) => state.chat)

  const handleOpenSearch = () => {
    dispatch(setSearchOpen(true))
  }

  const totalMessages = activeRooms.reduce((acc, room) => acc + (room.lastMessage ? 1 : 0), 0)
  const totalParticipants = activeRooms.reduce((acc, room) => acc + room.participants.length, 0)

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Welcome to InkSaga Chat</h1>
            <p className="text-muted-foreground text-lg mt-2">
              Connect with fellow creators, share ideas, and collaborate in real-time
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Hash className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{activeRooms.filter((r) => r.type === "group").length}</div>
              <div className="text-sm text-muted-foreground">Group Chats</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{totalParticipants}</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{totalMessages}</div>
              <div className="text-sm text-muted-foreground">Active Chats</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Join a Group Chat
                </CardTitle>
                <CardDescription>Connect with creators in topic-based channels</CardDescription>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={handleOpenSearch}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Messages
                </CardTitle>
                <CardDescription>Find conversations and content across all chats</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Chat Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Real-time messaging</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>File and image sharing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Message reactions</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span>Advanced search</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span>Thread replies</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span>Typing indicators</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" onClick={handleOpenSearch}>
            <Search className="h-4 w-4 mr-2" />
            Start Searching Messages
          </Button>
        </div>
      </div>
    </div>
  )
}
