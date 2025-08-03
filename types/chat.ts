export interface Message {
  id: string
  content: string
  senderId: string
  senderName: string
  senderAvatar?: string
  timestamp: Date
  type: "text" | "image" | "file" | "system"
  edited?: boolean
  editedAt?: Date
  replyTo?: string
  reactions?: MessageReaction[]
}

export interface MessageReaction {
  emoji: string
  users: string[]
  count: number
}

export interface ChatRoom {
  id: string
  name: string
  type: "group" | "direct"
  description?: string
  avatar?: string
  participants: ChatParticipant[]
  lastMessage?: Message
  lastActivity: Date
  unreadCount: number
  isOnline?: boolean
  settings: ChatSettings
}

export interface ChatParticipant {
  userId: string
  name: string
  avatar?: string
  role: "admin" | "moderator" | "member"
  joinedAt: Date
  lastSeen: Date
  isOnline: boolean
}

export interface ChatSettings {
  notifications: boolean
  soundEnabled: boolean
  theme: "light" | "dark" | "auto"
  fontSize: "small" | "medium" | "large"
}

export interface DirectMessage {
  id: string
  participants: [string, string]
  messages: Message[]
  lastActivity: Date
  unreadCount: { [userId: string]: number }
}

export interface SearchResult {
  id: string
  message: Message
  roomId: string
  roomName: string
  roomType: "group" | "direct"
  matchType: "content" | "sender" | "both"
  highlights: string[]
  context: {
    before: Message[]
    after: Message[]
  }
}

export interface SearchFilters {
  query: string
  roomIds: string[]
  senderIds: string[]
  messageTypes: ("text" | "image" | "file" | "system")[]
  dateRange: {
    from?: Date
    to?: Date
  }
  hasAttachments?: boolean
  hasReactions?: boolean
}

export interface SearchHistory {
  id: string
  query: string
  filters: SearchFilters
  timestamp: Date
  resultCount: number
}
