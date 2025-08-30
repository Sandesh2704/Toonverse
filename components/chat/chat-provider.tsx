"use client"

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import { useAppDispatch } from "@/hooks/useRedux"
import { 
  sendMessage, 
  addMessage, 
  setActiveChat, 
  addTypingUser, 
  removeTypingUser,
  markAsRead 
} from "@/store/chatSlice"
import { useRouter } from "next/navigation"

// Enhanced types for gamification and notifications
interface UserStats {
  xp: number
  level: number
  badges: Badge[]
  rank: string
  messagesSent: number
  reactionsGiven: number
  eventsParticipated: number
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: Date
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface Notification {
  id: string
  type: "message" | "mention" | "reply" | "event" | "badge" | "level_up"
  title: string
  message: string
  timestamp: Date
  read: boolean
  data?: any
}

interface ChatState {
  isOpen: boolean
  isMaximized: boolean
  activeTab: "general" | "groups" | "direct" | "events" | "fan-art"
  activeRoom: string | null
  notifications: Notification[]
  userStats: UserStats
  unreadCount: number
  typingUsers: { [roomId: string]: string[] }
}

type ChatAction =
  | { type: "OPEN_CHAT" }
  | { type: "CLOSE_CHAT" }
  | { type: "TOGGLE_MAXIMIZE" }
  | { type: "SET_ACTIVE_TAB"; payload: ChatState["activeTab"] }
  | { type: "SET_ACTIVE_ROOM"; payload: string }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "UPDATE_USER_STATS"; payload: Partial<UserStats> }
  | { type: "SET_TYPING_USERS"; payload: { roomId: string; users: string[] } }
  | { type: "INCREMENT_UNREAD" }
  | { type: "RESET_UNREAD" }

const initialState: ChatState = {
  isOpen: false, // Fixed: Chat should be closed by default
  isMaximized: false,
  activeTab: "general",
  activeRoom: null,
  notifications: [],
  userStats: {
    xp: 1250,
    level: 8,
    badges: [
      {
        id: "first-message",
        name: "First Message",
        description: "Sent your first message",
        icon: "💬",
        unlockedAt: new Date("2024-01-01"),
        rarity: "common"
      },
      {
        id: "helpful-member",
        name: "Helpful Member",
        description: "Received 10 helpful reactions",
        icon: "👍",
        unlockedAt: new Date("2024-01-15"),
        rarity: "rare"
      }
    ],
    rank: "Active Member",
    messagesSent: 47,
    reactionsGiven: 23,
    eventsParticipated: 3
  },
  unreadCount: 3,
  typingUsers: {}
}

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "OPEN_CHAT":
      return { ...state, isOpen: true }
    case "CLOSE_CHAT":
      return { ...state, isOpen: false, isMaximized: false }
    case "TOGGLE_MAXIMIZE":
      return { ...state, isMaximized: !state.isMaximized }
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload }
    case "SET_ACTIVE_ROOM":
      return { ...state, activeRoom: action.payload }
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications].slice(0, 50),
        unreadCount: state.unreadCount + 1
      }
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
      }
    case "UPDATE_USER_STATS":
      return {
        ...state,
        userStats: { ...state.userStats, ...action.payload }
      }
    case "SET_TYPING_USERS":
      return {
        ...state,
        typingUsers: {
          ...state.typingUsers,
          [action.payload.roomId]: action.payload.users
        }
      }
    case "INCREMENT_UNREAD":
      return { ...state, unreadCount: state.unreadCount + 1 }
    case "RESET_UNREAD":
      return { ...state, unreadCount: 0 }
    default:
      return state
  }
}

interface ChatContextType {
  state: ChatState
  dispatch: React.Dispatch<ChatAction>
  openChat: () => void
  closeChat: () => void
  toggleMaximize: () => void
  navigateToFullChat: () => void
  setActiveTab: (tab: ChatState["activeTab"]) => void
  setActiveRoom: (roomId: string) => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
  markNotificationRead: (id: string) => void
  updateUserStats: (stats: Partial<UserStats>) => void
  addXP: (amount: number) => void
  sendChatMessage: (roomId: string, messageData: any) => Promise<any>
  handleTyping: (roomId: string, userId: string, isTyping: boolean) => void
  markChatAsRead: (roomId: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)
  const { user } = useSelector((state: RootState) => state.user)
  const reduxDispatch = useAppDispatch()
  const router = useRouter()

  const openChat = () => {
    dispatch({ type: "OPEN_CHAT" })
  }
  
  const closeChat = () => {
    dispatch({ type: "CLOSE_CHAT" })
  }
  
  const toggleMaximize = () => dispatch({ type: "TOGGLE_MAXIMIZE" })
  
  const navigateToFullChat = () => {
    router.push("/community/chat")
    closeChat() // Close the floating chat
  }

  const setActiveTab = (tab: ChatState["activeTab"]) => dispatch({ type: "SET_ACTIVE_TAB", payload: tab })
  const setActiveRoom = (roomId: string) => {
    dispatch({ type: "SET_ACTIVE_ROOM", payload: roomId })
    reduxDispatch(setActiveChat(roomId))
  }
  
  const addNotification = (notification: Omit<Notification, "id" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    }
    dispatch({ type: "ADD_NOTIFICATION", payload: newNotification })
  }

  const markNotificationRead = (id: string) => {
    dispatch({ type: "MARK_NOTIFICATION_READ", payload: id })
  }

  const updateUserStats = (stats: Partial<UserStats>) => {
    dispatch({ type: "UPDATE_USER_STATS", payload: stats })
  }

  const addXP = (amount: number) => {
    const newXP = state.userStats.xp + amount
    const newLevel = Math.floor(newXP / 100) + 1
    
    updateUserStats({ xp: newXP, level: newLevel })
    
    if (newLevel > state.userStats.level) {
      addNotification({
        type: "level_up",
        title: "Level Up! 🎉",
        message: `Congratulations! You've reached level ${newLevel}`,
        read: false
      })
    }
  }

  // Redux integration for chat functionality
  const sendChatMessage = async (roomId: string, messageData: any) => {
    try {
      const result = await reduxDispatch(sendMessage({ roomId, messageData })).unwrap()
      addXP(5) // Add XP for sending message
      return result
    } catch (error) {
      console.error('Failed to send message:', error)
      throw error
    }
  }

  const handleTyping = (roomId: string, userId: string, isTyping: boolean) => {
    if (isTyping) {
      reduxDispatch(addTypingUser({ roomId, userId }))
    } else {
      reduxDispatch(removeTypingUser({ roomId, userId }))
    }
  }

  const markChatAsRead = (roomId: string) => {
    reduxDispatch(markAsRead(roomId))
  }

  // Simulate real-time notifications
  useEffect(() => {
    if (!user) return

    const interval = setInterval(() => {
      // Simulate random notifications
      const random = Math.random()
      if (random < 0.1) { // 10% chance every 30 seconds
        const notifications = [
          {
            type: "message" as const,
            title: "New Message",
            message: "Someone mentioned you in General Discussion"
          },
          {
            type: "event" as const,
            title: "Event Reminder",
            message: "Fan Art Contest starts in 1 hour!"
          },
          {
            type: "badge" as const,
            title: "New Badge Unlocked! 🏆",
            message: "You've earned the 'Community Helper' badge"
          }
        ]
        
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]
        addNotification({
          ...randomNotification,
          read: false
        })
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [user, addNotification])

  const value: ChatContextType = {
    state,
    dispatch,
    openChat,
    closeChat,
    toggleMaximize,
    navigateToFullChat,
    setActiveTab,
    setActiveRoom,
    addNotification,
    markNotificationRead,
    updateUserStats,
    addXP,
    sendChatMessage,
    handleTyping,
    markChatAsRead
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
