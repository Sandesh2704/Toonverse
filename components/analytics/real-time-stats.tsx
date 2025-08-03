"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, Search, Users, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function RealTimeStats() {
  const { realTimeStats, searchAnalytics } = useSelector((state: RootState) => state.analytics)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const recentSearches = searchAnalytics
    .slice(-20)
    .reverse()
    .map((search) => ({
      ...search,
      timeAgo: formatDistanceToNow(search.timestamp, { addSuffix: true }),
    }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Live Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Live Activity
          </CardTitle>
          <CardDescription>Real-time search activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Active Searches</span>
              <Badge variant="secondary">{realTimeStats.activeSearches}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Online Users</span>
              <Badge variant="secondary">{realTimeStats.topUsers.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Last Update</span>
              <span className="text-xs text-muted-foreground">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Queries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Recent Queries
          </CardTitle>
          <CardDescription>Latest search queries</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-2">
              {realTimeStats.recentQueries.map((query, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm font-medium truncate">{query}</span>
                  <Badge variant="outline" className="text-xs">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Active Users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Active Users
          </CardTitle>
          <CardDescription>Users currently searching</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-2">
              {realTimeStats.topUsers.map((userId, index) => (
                <div key={userId} className="flex items-center justify-between p-2 rounded border">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm">User {userId.slice(-4)}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Recent Search Activity */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Search Activity
          </CardTitle>
          <CardDescription>Latest search events with details</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {recentSearches.map((search) => (
                <div key={search.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">"{search.query}"</span>
                      <Badge variant="outline" className="text-xs">
                        {search.source}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>User: {search.userId.slice(-4)}</span>
                      <span>{search.resultCount} results</span>
                      <span>{search.searchDuration}ms</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">{search.timeAgo}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
