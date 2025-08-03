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
    <div className="flex h-full">
      {/* Chat Sidebar */}
      <div className="w-80 border-r bg-background">
        <ChatSidebar />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">{activeChat ? <ChatWindow roomId={activeChat} /> : <ChatWelcome />}</div>

      {/* Search Modal */}
      <ChatSearch />
    </div>
  )
}
