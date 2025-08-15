"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import { setActiveChat, setSearchOpen } from "@/store/chatSlice"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Hash, User, MessageSquare, Search, Loader2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function SearchResults() {
  const dispatch = useDispatch()
  const { search } = useSelector((state: RootState) => state.chat)
  const { results, isSearching, query } = search

  const handleResultClick = (roomId: string, messageId: string) => {
    dispatch(setActiveChat(roomId))
    dispatch(setSearchOpen(false))
    // In a real app, you would scroll to the specific message
    console.log("Navigate to message:", messageId, "in room:", roomId)
  }

  const highlightText = (text: string, highlights: string[]) => {
    if (highlights.length === 0) return text

    return highlights[0] || text
  }

  if (isSearching) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Searching messages...</p>
        </div>
      </div>
    )
  }

  if (!query) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Search Messages</h3>
          <p className="text-muted-foreground mb-4">
            Find messages across all your chats. Search by content, sender, or use filters to narrow down results.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Search for specific words or phrases</p>
            <p>• Filter by chat rooms or message types</p>
            <p>• Use date ranges to find older messages</p>
            <p>• Search by sender name</p>
          </div>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No messages found</h3>
          <p className="text-muted-foreground">
            No messages match your search criteria. Try adjusting your search terms or filters.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Results Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
          </h3>
          <Badge variant="secondary">{results.length}</Badge>
        </div>
      </div>

      {/* Results List */}
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {results.map((result) => (
            <div
              key={result.id}
              className="p-4 hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => handleResultClick(result.roomId, result.message.id)}
            >
              <div className="space-y-3">
                {/* Result Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={result.message.senderAvatar || "/default-image/comic2.jpg"} />
                      <AvatarFallback>
                        {result.roomType === "group" ? <Hash className="h-3 w-3" /> : <User className="h-3 w-3" />}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{result.roomName}</span>
                    <Badge variant="outline" size="sm">
                      {result.roomType}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(result.message.timestamp, { addSuffix: true })}
                  </span>
                </div>

                {/* Message Content */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={result.message.senderAvatar || "/default-image/comic2.jpg"} />
                      <AvatarFallback>{result.message.senderName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{result.message.senderName}</span>
                    <Badge variant="secondary" size="sm">
                      {result.matchType}
                    </Badge>
                  </div>

                  <div className="pl-7">
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(result.message.content, result.highlights),
                      }}
                    />
                  </div>
                </div>

                {/* Context Messages */}
                {(result.context.before.length > 0 || result.context.after.length > 0) && (
                  <div className="pl-7 space-y-1">
                    <Separator className="my-2" />
                    <p className="text-xs text-muted-foreground mb-2">Context:</p>

                    {/* Before messages */}
                    {result.context.before.map((msg) => (
                      <div key={msg.id} className="text-xs text-muted-foreground opacity-70">
                        <span className="font-medium">{msg.senderName}:</span> {msg.content}
                      </div>
                    ))}

                    {/* Current message (highlighted) */}
                    <div className="text-xs bg-accent/30 p-2 rounded">
                      <span className="font-medium">{result.message.senderName}:</span>{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightText(result.message.content, result.highlights),
                        }}
                      />
                    </div>

                    {/* After messages */}
                    {result.context.after.map((msg) => (
                      <div key={msg.id} className="text-xs text-muted-foreground opacity-70">
                        <span className="font-medium">{msg.senderName}:</span> {msg.content}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
