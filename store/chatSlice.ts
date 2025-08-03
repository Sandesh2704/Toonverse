import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ChatRoom, Message, DirectMessage, SearchResult, SearchFilters, SearchHistory } from "@/types/chat"

interface ChatState {
  activeRooms: ChatRoom[]
  directMessages: DirectMessage[]
  activeChat: string | null
  onlineUsers: string[]
  typingUsers: { [roomId: string]: string[] }
  unreadCounts: { [roomId: string]: number }
  chatSettings: {
    notifications: boolean
    soundEnabled: boolean
    theme: "light" | "dark" | "auto"
    fontSize: "small" | "medium" | "large"
  }
  search: {
    isSearchOpen: boolean
    query: string
    filters: SearchFilters
    results: SearchResult[]
    isSearching: boolean
    history: SearchHistory[]
    suggestions: string[]
  }
}

const initialState: ChatState = {
  activeRooms: [],
  directMessages: [],
  activeChat: null,
  onlineUsers: [],
  typingUsers: {},
  unreadCounts: {},
  chatSettings: {
    notifications: true,
    soundEnabled: true,
    theme: "auto",
    fontSize: "medium",
  },
  search: {
    isSearchOpen: false,
    query: "",
    filters: {
      query: "",
      roomIds: [],
      senderIds: [],
      messageTypes: ["text", "image", "file", "system"],
      dateRange: {},
      hasAttachments: undefined,
      hasReactions: undefined,
    },
    results: [],
    isSearching: false,
    history: [],
    suggestions: [],
  },
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveRooms: (state, action: PayloadAction<ChatRoom[]>) => {
      state.activeRooms = action.payload
    },
    addMessage: (state, action: PayloadAction<{ roomId: string; message: Message }>) => {
      const { roomId, message } = action.payload
      const room = state.activeRooms.find((r) => r.id === roomId)
      if (room) {
        room.lastMessage = message
        room.lastActivity = message.timestamp
        if (roomId !== state.activeChat) {
          room.unreadCount += 1
        }
      }
    },
    setActiveChat: (state, action: PayloadAction<string | null>) => {
      // Mark previous chat as read
      if (state.activeChat) {
        const room = state.activeRooms.find((r) => r.id === state.activeChat)
        if (room) {
          room.unreadCount = 0
        }
      }
      state.activeChat = action.payload
      // Mark new chat as read
      if (action.payload) {
        const room = state.activeRooms.find((r) => r.id === action.payload)
        if (room) {
          room.unreadCount = 0
        }
      }
    },
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload
    },
    setTypingUsers: (state, action: PayloadAction<{ roomId: string; users: string[] }>) => {
      state.typingUsers[action.payload.roomId] = action.payload.users
    },
    updateChatSettings: (state, action: PayloadAction<Partial<ChatState["chatSettings"]>>) => {
      state.chatSettings = { ...state.chatSettings, ...action.payload }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const room = state.activeRooms.find((r) => r.id === action.payload)
      if (room) {
        room.unreadCount = 0
      }
    },
    // Search actions
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.search.isSearchOpen = action.payload
      if (!action.payload) {
        state.search.query = ""
        state.search.results = []
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.search.query = action.payload
      state.search.filters.query = action.payload
    },
    setSearchFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      state.search.filters = { ...state.search.filters, ...action.payload }
    },
    setSearchResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.search.results = action.payload
      state.search.isSearching = false
    },
    setSearching: (state, action: PayloadAction<boolean>) => {
      state.search.isSearching = action.payload
    },
    addSearchHistory: (state, action: PayloadAction<SearchHistory>) => {
      state.search.history = [action.payload, ...state.search.history.slice(0, 9)] // Keep last 10 searches
    },
    setSearchSuggestions: (state, action: PayloadAction<string[]>) => {
      state.search.suggestions = action.payload
    },
    clearSearchHistory: (state) => {
      state.search.history = []
    },
  },
})

export const {
  setActiveRooms,
  addMessage,
  setActiveChat,
  setOnlineUsers,
  setTypingUsers,
  updateChatSettings,
  markAsRead,
  setSearchOpen,
  setSearchQuery,
  setSearchFilters,
  setSearchResults,
  setSearching,
  addSearchHistory,
  setSearchSuggestions,
  clearSearchHistory,
} = chatSlice.actions

export default chatSlice.reducer
