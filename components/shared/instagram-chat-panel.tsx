"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageSquare, 
  X, 
  Maximize2, 
  Minimize2, 
  Users, 
  User, 
  Calendar, 
  Palette, 
  Search,
  Send,
  MoreHorizontal,
  Smile,
  Paperclip,
  Mic,
  Crown,
  Star,
  Zap,
  Trophy,
  Target,
  Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from "@/components/chat/chat-provider"
import { useAppDispatch, useChatRooms, useChatMessages, useActiveChat } from "@/hooks/useRedux"
import { setActiveChat, sendMessage } from "@/store/chatSlice"
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@/hooks/useAuth"

export function InstagramChatPanel() {
  const { state, closeChat, toggleMaximize, navigateToFullChat, setActiveTab, setActiveRoom, addXP, sendChatMessage } = useChat()
  const { user } = useAuth() // Fixed: Use useAuth instead of Redux
  const dispatch = useAppDispatch()
  
  // Redux state
  const chatRooms = useChatRooms()
  const activeChat = useActiveChat()
  const activeRoomMessages = useChatMessages(activeChat || "")
  
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeChat])

  const handleSendMessage = async () => {
    if (!message.trim() || !activeChat) return
    
    try {
      await sendChatMessage(activeChat, {
        content: message.trim(),
        senderId: user?.id || "user-1",
        senderName: user?.name || "Anonymous",
        senderAvatar: user?.avatar,
        type: "text"
      })
      setMessage("")
      setIsTyping(false)
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getActiveRoomData = () => {
    if (!activeChat) return null
    return chatRooms.find(room => room.id === activeChat)
  }

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "general": return <MessageSquare className="h-4 w-4" />
      case "groups": return <Users className="h-4 w-4" />
      case "direct": return <User className="h-4 w-4" />
      case "events": return <Calendar className="h-4 w-4" />
      case "fan-art": return <Palette className="h-4 w-4" />
      default: return <MessageSquare className="h-4 w-4" />
    }
  }

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case "general": return "General"
      case "groups": return "Groups"
      case "direct": return "Direct"
      case "events": return "Events"
      case "fan-art": return "Fan Art"
      default: return "General"
    }
  }

  if (!state.isOpen || !user) return null

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
        onClick={closeChat}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed z-[9999] bg-background border border-border/50 shadow-2xl rounded-2xl overflow-hidden"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          position: "fixed",
          zIndex: 9999,
          bottom: "1.5rem",
          right: "1.5rem",
          width: "min(24rem, calc(100vw - 3rem))",
          height: "min(600px, calc(100vh - 6rem))",
          maxWidth: "calc(100vw - 3rem)",
          maxHeight: "calc(100vh - 6rem)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-500 ring-2 ring-white dark:ring-gray-800 shadow-lg">
                  <AvatarImage src={user.avatar || "/default-image/comic2.jpg"} />
                  <AvatarFallback>
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full shadow-sm" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Messages</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Level {state.userStats.level}</span>
                  <span>•</span>
                  <span>{state.userStats.rank}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {state.unreadCount > 0 && (
                <Badge variant="destructive" className="h-5 w-5 p-0 text-xs animate-pulse shadow-sm">
                  {state.unreadCount}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={navigateToFullChat}
                className="h-8 w-8 hover:bg-muted/50 transition-colors rounded-full"
                title="Open in full page"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeChat}
                className="h-8 w-8 hover:bg-muted/50 transition-colors rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b bg-muted/30 overflow-x-auto">
            {(["general", "groups", "direct", "events", "fan-art"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-3 py-2 text-xs font-medium transition-all duration-200 ${
                  state.activeTab === tab
                    ? "bg-background text-purple-600 border-b-2 border-purple-500 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  {getTabIcon(tab)}
                  <span className="hidden sm:inline">{getTabLabel(tab)}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-1/3 border-r bg-muted/20 hidden lg:block">
              <div className="p-3 border-b bg-background/50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-9 h-8 text-xs bg-background/80 border-muted/50 focus:border-purple-500"
                  />
                </div>
              </div>
              
              <ScrollArea className="h-full">
                <div className="p-2 space-y-1">
                  {chatRooms
                    .filter(room => {
                      if (state.activeTab === "general") return room.id === "general"
                      if (state.activeTab === "groups") return room.type === "group" && room.id !== "general"
                      if (state.activeTab === "direct") return room.type === "direct"
                      return true
                    })
                    .map((room) => (
                      <div
                        key={room.id}
                        onClick={() => {
                          setActiveRoom(room.id)
                          dispatch(setActiveChat(room.id))
                        }}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          activeChat === room.id
                            ? "bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 shadow-sm"
                            : "hover:bg-muted/50 hover:shadow-sm"
                        }`}
                      >
                        <div className="relative">
                          <Avatar className="h-8 w-8 ring-1 ring-muted/50">
                            <AvatarImage src={room.avatar} />
                            <AvatarFallback className="bg-muted/50">
                              {room.type === "group" ? (
                                <Users className="h-4 w-4" />
                              ) : (
                                room.name.charAt(0)
                              )}
                            </AvatarFallback>
                          </Avatar>
                          {room.participants.some(p => p.isOnline) && (
                            <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 bg-green-500 border border-background rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium truncate">{room.name}</p>
                            {room.unreadCount > 0 && (
                              <Badge variant="destructive" className="h-4 w-4 p-0 text-xs rounded-full animate-pulse">
                                {room.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {room.lastMessage?.content || "No messages yet"}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col w-full">
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="flex items-center justify-between p-3 border-b bg-background/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 ring-1 ring-muted/50">
                        <AvatarImage src={getActiveRoomData()?.avatar} />
                        <AvatarFallback className="bg-muted/50">
                          {getActiveRoomData()?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-sm">{getActiveRoomData()?.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {getActiveRoomData()?.participants.filter(p => p.isOnline).length} online
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted/50">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-3 bg-muted/10">
                    <div className="space-y-3">
                      {activeRoomMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex gap-3 ${
                            msg.senderId === user.id ? "flex-row-reverse" : ""
                          }`}
                        >
                          <Avatar className="h-8 w-8 ring-1 ring-muted/50">
                            <AvatarImage src={msg.senderAvatar} />
                            <AvatarFallback className="bg-muted/50">
                              {msg.senderName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`max-w-[70%] ${msg.senderId === user.id ? "text-right" : ""}`}>
                            <div className={`inline-block p-3 rounded-2xl shadow-sm ${
                              msg.senderId === user.id
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                : "bg-background border border-muted/50"
                            }`}>
                              <p className="text-sm">{msg.content}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Input Area */}
                  <div className="p-3 border-t bg-background/50">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted/50">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          ref={inputRef}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          onFocus={() => setIsTyping(true)}
                          onBlur={() => setIsTyping(false)}
                          placeholder="Type a message..."
                          className="pr-20 border-muted/50 focus:border-purple-500"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted/50">
                            <Smile className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted/50">
                            <Mic className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        size="icon"
                        className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-md"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                /* Welcome Screen */
                <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/10 dark:to-pink-950/10">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <MessageSquare className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Welcome to Messages</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Select a conversation to start chatting
                      </p>
                    </div>
                    
                    {/* User Stats */}
                    <div className="bg-background/80 border border-muted/50 rounded-lg p-4 space-y-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Level {state.userStats.level}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{state.userStats.xp} XP</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(state.userStats.xp % 100) / 100 * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          <span>{state.userStats.badges.length} badges</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          <span>{state.userStats.messagesSent} messages</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }
