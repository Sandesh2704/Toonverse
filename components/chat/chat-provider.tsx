"use client"

import type React from "react"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setActiveRooms, setOnlineUsers } from "@/store/chatSlice"
import { mockChatRooms } from "@/data/chat"

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()

  useEffect(() => {
    // Initialize chat data
    dispatch(setActiveRooms(mockChatRooms))
    dispatch(setOnlineUsers(["1", "2", "4", "5"]))

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update online users randomly
      const onlineUsers = ["1", "2", "4", "5"].filter(() => Math.random() > 0.3)
      dispatch(setOnlineUsers(onlineUsers))
    }, 30000)

    return () => clearInterval(interval)
  }, [dispatch])

  return <>{children}</>
}
