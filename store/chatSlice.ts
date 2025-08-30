import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { mockChatRooms, mockMessages, mockParticipants } from "@/data/chat"
import type { ChatRoom, Message, DirectMessage, SearchResult, SearchFilters, SearchHistory } from "@/types/chat"

// Async thunks for future API integration
export const fetchChatRooms = createAsyncThunk(
  "chat/fetchChatRooms",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      return mockChatRooms
    } catch (error) {
      return rejectWithValue("Failed to fetch chat rooms")
    }
  }
)

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (roomId: string, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      return { roomId, messages: mockMessages[roomId] || [] }
    } catch (error) {
      return rejectWithValue("Failed to fetch messages")
    }
  }
)

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ roomId, messageData }: { roomId: string; messageData: Omit<Message, "id" | "timestamp"> }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 100))
      const newMessage: Message = {
        ...messageData,
        id: `msg-${Date.now()}`,
        timestamp: new Date()
      }
      return { roomId, message: newMessage }
    } catch (error) {
      return rejectWithValue("Failed to send message")
    }
  }
)

export const createChatRoom = createAsyncThunk(
  "chat/createChatRoom",
  async (roomData: Omit<ChatRoom, "id" | "lastActivity" | "unreadCount" | "settings">, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const newRoom: ChatRoom = {
        ...roomData,
        id: `room-${Date.now()}`,
        lastActivity: new Date(),
        unreadCount: 0,
        settings: {
          notifications: true,
          soundEnabled: true,
          theme: "auto",
          fontSize: "medium",
        }
      }
      return newRoom
    } catch (error) {
      return rejectWithValue("Failed to create chat room")
    }
  }
)

export const searchMessages = createAsyncThunk(
  "chat/searchMessages",
  async ({ query, filters }: { query: string; filters?: Partial<SearchFilters> }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 400))
      const searchTerm = query.toLowerCase()
      const results: SearchResult[] = []
      
      // Search through all messages
      Object.entries(mockMessages).forEach(([roomId, messages]) => {
        const room = mockChatRooms.find(r => r.id === roomId)
        if (!room) return
        
        messages.forEach(message => {
          if (message.content.toLowerCase().includes(searchTerm) ||
              message.senderName.toLowerCase().includes(searchTerm)) {
            results.push({
              id: `search-${Date.now()}-${Math.random()}`,
              message,
              roomId,
              roomName: room.name,
              roomType: room.type,
              matchType: message.content.toLowerCase().includes(searchTerm) ? "content" : "sender",
              highlights: [searchTerm],
              context: {
                before: [],
                after: []
              }
            })
          }
        })
      })
      
      return results
    } catch (error) {
      return rejectWithValue("Failed to search messages")
    }
  }
)

interface ChatState {
  // Chat rooms and messages
  activeRooms: ChatRoom[]
  directMessages: DirectMessage[]
  activeChat: string | null
  messages: { [roomId: string]: Message[] }
  
  // User states
  onlineUsers: string[]
  typingUsers: { [roomId: string]: string[] }
  unreadCounts: { [roomId: string]: number }
  
  // Chat settings
  chatSettings: {
    notifications: boolean
    soundEnabled: boolean
    theme: "light" | "dark" | "auto"
    fontSize: "small" | "medium" | "large"
  }
  
  // Search functionality
  search: {
    isSearchOpen: boolean
    query: string
    filters: SearchFilters
    results: SearchResult[]
    isSearching: boolean
    history: SearchHistory[]
    suggestions: string[]
  }
  
  // UI state
  loading: boolean
  error: string | null
  
  // Form states
  createRoomForm: {
    isOpen: boolean
    data: Partial<ChatRoom>
    loading: boolean
  }
}

const initialState: ChatState = {
  // Initialize with dummy data
  activeRooms: mockChatRooms,
  directMessages: [],
  activeChat: null,
  messages: mockMessages,
  
  // User states
  onlineUsers: mockParticipants.filter(p => p.isOnline).map(p => p.userId),
  typingUsers: {},
  unreadCounts: mockChatRooms.reduce((acc, room) => {
    acc[room.id] = room.unreadCount
    return acc
  }, {} as { [roomId: string]: number }),
  
  // Chat settings
  chatSettings: {
    notifications: true,
    soundEnabled: true,
    theme: "auto",
    fontSize: "medium",
  },
  
  // Search functionality
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
  
  // UI state
  loading: false,
  error: null,
  
  // Form states
  createRoomForm: {
    isOpen: false,
    data: {},
    loading: false
  }
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // Chat Room Actions
    setActiveRooms: (state, action: PayloadAction<ChatRoom[]>) => {
      state.activeRooms = action.payload
    },
    setActiveChat: (state, action: PayloadAction<string | null>) => {
      // Mark previous chat as read
      if (state.activeChat) {
        const room = state.activeRooms.find((r) => r.id === state.activeChat)
        if (room) {
          room.unreadCount = 0
          state.unreadCounts[room.id] = 0
        }
      }
      state.activeChat = action.payload
      // Mark new chat as read
      if (action.payload) {
        const room = state.activeRooms.find((r) => r.id === action.payload)
        if (room) {
          room.unreadCount = 0
          state.unreadCounts[room.id] = 0
        }
      }
    },
    addChatRoom: (state, action: PayloadAction<ChatRoom>) => {
      state.activeRooms.unshift(action.payload)
    },
    updateChatRoom: (state, action: PayloadAction<{ id: string; updates: Partial<ChatRoom> }>) => {
      const { id, updates } = action.payload
      const index = state.activeRooms.findIndex(room => room.id === id)
      if (index !== -1) {
        state.activeRooms[index] = { ...state.activeRooms[index], ...updates }
      }
    },
    removeChatRoom: (state, action: PayloadAction<string>) => {
      state.activeRooms = state.activeRooms.filter(room => room.id !== action.payload)
      delete state.messages[action.payload]
      delete state.unreadCounts[action.payload]
      if (state.activeChat === action.payload) {
        state.activeChat = null
      }
    },
    
    // Message Actions
    addMessage: (state, action: PayloadAction<{ roomId: string; message: Message }>) => {
      const { roomId, message } = action.payload
      
      // Add message to messages array
      if (!state.messages[roomId]) {
        state.messages[roomId] = []
      }
      state.messages[roomId].push(message)
      
      // Update room's last message and activity
      const room = state.activeRooms.find((r) => r.id === roomId)
      if (room) {
        room.lastMessage = message
        room.lastActivity = message.timestamp
        if (roomId !== state.activeChat) {
          room.unreadCount += 1
          state.unreadCounts[roomId] = (state.unreadCounts[roomId] || 0) + 1
        }
      }
    },
    updateMessage: (state, action: PayloadAction<{ roomId: string; messageId: string; updates: Partial<Message> }>) => {
      const { roomId, messageId, updates } = action.payload
      const messages = state.messages[roomId]
      if (messages) {
        const index = messages.findIndex(msg => msg.id === messageId)
        if (index !== -1) {
          messages[index] = { ...messages[index], ...updates }
        }
      }
    },
    deleteMessage: (state, action: PayloadAction<{ roomId: string; messageId: string }>) => {
      const { roomId, messageId } = action.payload
      const messages = state.messages[roomId]
      if (messages) {
        state.messages[roomId] = messages.filter(msg => msg.id !== messageId)
      }
    },
    
    // User State Actions
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload
    },
    setTypingUsers: (state, action: PayloadAction<{ roomId: string; users: string[] }>) => {
      state.typingUsers[action.payload.roomId] = action.payload.users
    },
    addTypingUser: (state, action: PayloadAction<{ roomId: string; userId: string }>) => {
      const { roomId, userId } = action.payload
      if (!state.typingUsers[roomId]) {
        state.typingUsers[roomId] = []
      }
      if (!state.typingUsers[roomId].includes(userId)) {
        state.typingUsers[roomId].push(userId)
      }
    },
    removeTypingUser: (state, action: PayloadAction<{ roomId: string; userId: string }>) => {
      const { roomId, userId } = action.payload
      if (state.typingUsers[roomId]) {
        state.typingUsers[roomId] = state.typingUsers[roomId].filter(id => id !== userId)
      }
    },
    
    // Chat Settings Actions
    updateChatSettings: (state, action: PayloadAction<Partial<ChatState["chatSettings"]>>) => {
      state.chatSettings = { ...state.chatSettings, ...action.payload }
    },
    
    // Read/Unread Actions
    markAsRead: (state, action: PayloadAction<string>) => {
      const room = state.activeRooms.find((r) => r.id === action.payload)
      if (room) {
        room.unreadCount = 0
        state.unreadCounts[action.payload] = 0
      }
    },
    markAsUnread: (state, action: PayloadAction<string>) => {
      const room = state.activeRooms.find((r) => r.id === action.payload)
      if (room) {
        room.unreadCount += 1
        state.unreadCounts[action.payload] = (state.unreadCounts[action.payload] || 0) + 1
      }
    },
    
    // Search Actions
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
    
    // Form Actions
    openCreateRoomForm: (state) => {
      state.createRoomForm.isOpen = true
      state.createRoomForm.data = {}
    },
    closeCreateRoomForm: (state) => {
      state.createRoomForm.isOpen = false
      state.createRoomForm.data = {}
    },
    updateCreateRoomForm: (state, action: PayloadAction<Partial<ChatRoom>>) => {
      state.createRoomForm.data = { ...state.createRoomForm.data, ...action.payload }
    },
    
    // UI Actions
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    // Fetch Chat Rooms
    builder
      .addCase(fetchChatRooms.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchChatRooms.fulfilled, (state, action) => {
        state.loading = false
        state.activeRooms = action.payload
      })
      .addCase(fetchChatRooms.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    
    // Fetch Messages
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false
        const { roomId, messages } = action.payload
        state.messages[roomId] = messages
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    
    // Send Message
    builder
      .addCase(sendMessage.pending, (state) => {
        // Don't set loading for send message to avoid UI blocking
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { roomId, message } = action.payload
        
        // Add message to messages array
        if (!state.messages[roomId]) {
          state.messages[roomId] = []
        }
        state.messages[roomId].push(message)
        
        // Update room's last message and activity
        const room = state.activeRooms.find((r) => r.id === roomId)
        if (room) {
          room.lastMessage = message
          room.lastActivity = message.timestamp
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload as string
      })
    
    // Create Chat Room
    builder
      .addCase(createChatRoom.pending, (state) => {
        state.createRoomForm.loading = true
        state.error = null
      })
      .addCase(createChatRoom.fulfilled, (state, action) => {
        state.createRoomForm.loading = false
        state.createRoomForm.isOpen = false
        state.activeRooms.unshift(action.payload)
      })
      .addCase(createChatRoom.rejected, (state, action) => {
        state.createRoomForm.loading = false
        state.error = action.payload as string
      })
    
    // Search Messages
    builder
      .addCase(searchMessages.pending, (state) => {
        state.search.isSearching = true
        state.error = null
      })
      .addCase(searchMessages.fulfilled, (state, action) => {
        state.search.isSearching = false
        state.search.results = action.payload
      })
      .addCase(searchMessages.rejected, (state, action) => {
        state.search.isSearching = false
        state.error = action.payload as string
      })
  }
})

export const {
  setActiveRooms,
  setActiveChat,
  addChatRoom,
  updateChatRoom,
  removeChatRoom,
  addMessage,
  updateMessage,
  deleteMessage,
  setOnlineUsers,
  setTypingUsers,
  addTypingUser,
  removeTypingUser,
  updateChatSettings,
  markAsRead,
  markAsUnread,
  setSearchOpen,
  setSearchQuery,
  setSearchFilters,
  setSearchResults,
  setSearching,
  addSearchHistory,
  setSearchSuggestions,
  clearSearchHistory,
  openCreateRoomForm,
  closeCreateRoomForm,
  updateCreateRoomForm,
  setLoading,
  setError,
  clearError
} = chatSlice.actions

export default chatSlice.reducer
