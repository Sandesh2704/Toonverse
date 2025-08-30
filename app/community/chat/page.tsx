"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import { setActiveRooms } from "@/store/chatSlice"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatWindow } from "@/components/chat/chat-window"
import { ChatWelcome } from "@/components/chat/chat-welcome"
import { ChatSearch } from "@/components/chat/search/chat-search"
import { mockChatRooms } from "@/data/chat"

export default function ChatPage() {
  const dispatch = useDispatch()
  const { activeChat, activeRooms } = useSelector((state: RootState) => state.chat)

  useEffect(() => {
    // Initialize chat rooms
    dispatch(setActiveRooms(mockChatRooms))
  }, [dispatch])

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Messages & Community</h1>
        <p className="text-muted-foreground mt-2">
          Connect with fellow creators and join the conversation
        </p>
      </div>
      
      {/* Chat Interface */}
      <div className="flex h-[calc(100vh-12rem)] border rounded-lg overflow-hidden bg-background">
        {/* Chat Sidebar */}
        <div className="w-80 border-r bg-background">
          <ChatSidebar />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">{activeChat ? <ChatWindow roomId={activeChat} /> : <ChatWelcome />}</div>
      </div>

      {/* Search Modal */}
      <ChatSearch />
    </div>
  )
}
