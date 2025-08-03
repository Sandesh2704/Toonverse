"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import { clearSearchHistory } from "@/store/chatSlice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Clock, Search, Trash2, TrendingUp } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { SearchFilters } from "@/types/chat"

interface SearchHistoryProps {
  onSelectSearch: (query: string, filters: SearchFilters) => void
}

export function SearchHistory({ onSelectSearch }: SearchHistoryProps) {
  const dispatch = useDispatch()
  const { search } = useSelector((state: RootState) => state.chat)
  const { history } = search

  const handleClearHistory = () => {
    dispatch(clearSearchHistory())
  }

  const getFilterSummary = (filters: SearchFilters) => {
    const activeFilters = []
    if (filters.roomIds.length > 0) activeFilters.push(`${filters.roomIds.length} rooms`)
    if (filters.senderIds.length > 0) activeFilters.push(`${filters.senderIds.length} senders`)
    if (filters.messageTypes.length < 4) activeFilters.push("message types")
    if (filters.dateRange.from || filters.dateRange.to) activeFilters.push("date range")
    if (filters.hasAttachments) activeFilters.push("attachments")
    if (filters.hasReactions) activeFilters.push("reactions")

    return activeFilters.length > 0 ? activeFilters.join(", ") : "No filters"
  }

  if (history.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Search History</h3>
          <p className="text-muted-foreground">Your search history will appear here as you perform searches.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* History Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Search History
          </h3>
          <Button variant="outline" size="sm" onClick={handleClearHistory}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {history.length} recent search{history.length !== 1 ? "es" : ""}
        </p>
      </div>

      {/* History List */}
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => onSelectSearch(item.query, item.filters)}
            >
              <div className="space-y-3">
                {/* Search Query */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">"{item.query}"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.resultCount} results
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                </div>

                {/* Filters Summary */}
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Filters:</span> {getFilterSummary(item.filters)}
                </div>

                {/* Success Indicator */}
                <div className="flex items-center gap-2">
                  {item.resultCount > 0 ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs">Successful search</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-orange-600">
                      <Search className="h-3 w-3" />
                      <span className="text-xs">No results found</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      {/* Quick Actions */}
      <div className="p-4">
        <h4 className="text-sm font-medium mb-2">Quick Searches</h4>
        <div className="flex flex-wrap gap-2">
          {["art feedback", "collaboration", "technical help", "story ideas", "drawing tips"].map((query) => (
            <Badge
              key={query}
              variant="outline"
              className="cursor-pointer hover:bg-accent"
              onClick={() => onSelectSearch(query, search.filters)}
            >
              {query}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
