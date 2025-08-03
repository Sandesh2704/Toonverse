"use client"

import { useState, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import {
  setSearchOpen,
  setSearchQuery,
  setSearchFilters,
  setSearchResults,
  setSearching,
  addSearchHistory,
  setSearchSuggestions,
} from "@/store/chatSlice"
import { useSearchAnalytics } from "@/hooks/useSearchAnalytics"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SearchFilters } from "./search-filters"
import { SearchResults } from "./search-results"
import { SearchHistory } from "./search-history"
import { Search, X, Filter, Clock } from "lucide-react"
import { mockMessages } from "@/data/chat"
import type { SearchResult, SearchFilters as SearchFiltersType } from "@/types/chat"

export function ChatSearch() {
  const dispatch = useDispatch()
  const { search, activeRooms } = useSelector((state: RootState) => state.chat)
  const { trackSearchEvent } = useSearchAnalytics()
  const [showFilters, setShowFilters] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [searchStartTime, setSearchStartTime] = useState<number>(0)

  // Debounced search
  const performSearch = useCallback(
    (query: string, filters: SearchFiltersType) => {
      if (!query.trim()) {
        dispatch(setSearchResults([]))
        return
      }

      const startTime = Date.now()
      setSearchStartTime(startTime)
      dispatch(setSearching(true))

      // Simulate search delay
      setTimeout(() => {
        const results: SearchResult[] = []
        const searchTerm = query.toLowerCase()

        // Search through all messages
        Object.entries(mockMessages).forEach(([roomId, messages]) => {
          const room = activeRooms.find((r) => r.id === roomId)
          if (!room) return

          // Apply room filter
          if (filters.roomIds.length > 0 && !filters.roomIds.includes(roomId)) return

          messages.forEach((message, index) => {
            // Apply message type filter
            if (!filters.messageTypes.includes(message.type)) return

            // Apply sender filter
            if (filters.senderIds.length > 0 && !filters.senderIds.includes(message.senderId)) return

            // Apply date range filter
            if (filters.dateRange.from && message.timestamp < filters.dateRange.from) return
            if (filters.dateRange.to && message.timestamp > filters.dateRange.to) return

            // Check content match
            const contentMatch = message.content.toLowerCase().includes(searchTerm)
            const senderMatch = message.senderName.toLowerCase().includes(searchTerm)

            if (contentMatch || senderMatch) {
              // Get context messages
              const contextBefore = messages.slice(Math.max(0, index - 2), index)
              const contextAfter = messages.slice(index + 1, Math.min(messages.length, index + 3))

              // Create highlights
              const highlights: string[] = []
              if (contentMatch) {
                const regex = new RegExp(`(${searchTerm})`, "gi")
                const highlighted = message.content.replace(regex, "<mark>$1</mark>")
                highlights.push(highlighted)
              }

              results.push({
                id: `${roomId}-${message.id}`,
                message,
                roomId,
                roomName: room.name,
                roomType: room.type,
                matchType: contentMatch && senderMatch ? "both" : contentMatch ? "content" : "sender",
                highlights,
                context: {
                  before: contextBefore,
                  after: contextAfter,
                },
              })
            }
          })
        })

        // Sort by relevance and date
        results.sort((a, b) => {
          // Prioritize exact matches
          if (a.matchType === "both" && b.matchType !== "both") return -1
          if (b.matchType === "both" && a.matchType !== "both") return 1

          // Then by date (newest first)
          return b.message.timestamp.getTime() - a.message.timestamp.getTime()
        })

        const searchDuration = Date.now() - startTime
        dispatch(setSearchResults(results))

        // Track search analytics
        trackSearchEvent(query, filters, results.length, searchDuration, "manual")

        // Add to search history
        if (results.length > 0) {
          dispatch(
            addSearchHistory({
              id: `search-${Date.now()}`,
              query,
              filters,
              timestamp: new Date(),
              resultCount: results.length,
            }),
          )
        }
      }, 300)
    },
    [dispatch, activeRooms, trackSearchEvent],
  )

  // Auto-search when query or filters change
  useEffect(() => {
    if (search.query) {
      performSearch(search.query, search.filters)
    }
  }, [search.query, search.filters, performSearch])

  // Generate search suggestions
  useEffect(() => {
    if (search.query.length > 0) {
      const suggestions = [
        "drawing technique",
        "character development",
        "story feedback",
        "collaboration",
        "art tips",
        "writing advice",
      ].filter((suggestion) => suggestion.toLowerCase().includes(search.query.toLowerCase()))

      dispatch(setSearchSuggestions(suggestions))
    } else {
      dispatch(setSearchSuggestions([]))
    }
  }, [search.query, dispatch])

  const handleClose = () => {
    dispatch(setSearchOpen(false))
    setShowFilters(false)
    setShowHistory(false)
  }

  const handleQueryChange = (value: string) => {
    dispatch(setSearchQuery(value))
    setShowHistory(value.length === 0)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleQueryChange(suggestion)
    // Track suggestion usage
    trackSearchEvent(suggestion, search.filters, 0, 0, "suggestion")
  }

  const appliedFiltersCount = [
    search.filters.roomIds.length > 0,
    search.filters.senderIds.length > 0,
    search.filters.messageTypes.length < 4,
    search.filters.dateRange.from || search.filters.dateRange.to,
    search.filters.hasAttachments !== undefined,
    search.filters.hasReactions !== undefined,
  ].filter(Boolean).length

  return (
    <Dialog open={search.isSearchOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Messages
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Search Input */}
          <div className="p-6 pt-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages, users, or content..."
                  value={search.query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  className="pl-10 pr-10"
                  autoFocus
                />
                {search.query && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => handleQueryChange("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>

              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="relative"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {appliedFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs rounded-full">
                    {appliedFiltersCount}
                  </Badge>
                )}
              </Button>

              <Button
                variant={showHistory ? "default" : "outline"}
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
              >
                <Clock className="h-4 w-4 mr-2" />
                History
              </Button>
            </div>

            {/* Search Suggestions */}
            {search.suggestions.length > 0 && search.query && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Suggestions:</span>
                {search.suggestions.map((suggestion) => (
                  <Badge
                    key={suggestion}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Content Area */}
          <div className="flex-1 flex min-h-0">
            {/* Filters Sidebar */}
            {showFilters && (
              <>
                <div className="w-80 border-r">
                  <SearchFilters />
                </div>
                <Separator orientation="vertical" />
              </>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
              {showHistory ? (
                <SearchHistory
                  onSelectSearch={(query, filters) => {
                    dispatch(setSearchQuery(query))
                    dispatch(setSearchFilters(filters))
                    setShowHistory(false)
                    // Track history usage
                    trackSearchEvent(query, filters, 0, 0, "history")
                  }}
                />
              ) : (
                <SearchResults />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
