"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { useSearchAnalytics } from "@/hooks/useSearchAnalytics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Search, Users, TrendingUp, Clock, BarChart3, Download, RefreshCw } from "lucide-react"
import { SearchTrendsChart } from "./search-trends-chart"
import { PopularQueriesChart } from "./popular-queries-chart"
import { FilterUsageChart } from "./filter-usage-chart"
import { RealTimeStats } from "./real-time-stats"

export function SearchAnalyticsDashboard() {
  const { metrics, generateMetrics, searchAnalytics } = useSearchAnalytics()
  const { realTimeStats } = useSelector((state: RootState) => state.analytics)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    generateMetrics()
  }, [generateMetrics])

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    generateMetrics()
    setRefreshing(false)
  }

  const exportData = () => {
    const data = {
      metrics,
      searchAnalytics: searchAnalytics.slice(-100), // Last 100 searches
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `search-analytics-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Search Analytics</h1>
          <p className="text-muted-foreground">Track search patterns and user behavior across the platform</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Searches</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalSearches.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{realTimeStats.activeSearches} this session</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.uniqueUsers}</div>
            <p className="text-xs text-muted-foreground">{metrics.avgSearchesPerUser.toFixed(1)} searches per user</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Results</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgResultsPerSearch.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              {((1 - metrics.performanceMetrics.failedSearches / metrics.totalSearches) * 100).toFixed(1)}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Search Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.performanceMetrics.avgSearchTime.toFixed(0)}ms</div>
            <p className="text-xs text-muted-foreground">{metrics.performanceMetrics.slowSearches} slow searches</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="queries">Popular Queries</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="filters">Filters</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Search Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Search Trends (7 Days)</CardTitle>
                <CardDescription>Daily search volume and user activity</CardDescription>
              </CardHeader>
              <CardContent>
                <SearchTrendsChart data={metrics.searchTrends} />
              </CardContent>
            </Card>

            {/* Top Queries */}
            <Card>
              <CardHeader>
                <CardTitle>Top Search Queries</CardTitle>
                <CardDescription>Most popular search terms</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {metrics.popularQueries.slice(0, 10).map((query, index) => (
                      <div key={query.query} className="flex items-center justify-between p-2 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{index + 1}</Badge>
                          <span className="font-medium">{query.query}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{query.count} searches</div>
                          <div className="text-xs text-muted-foreground">
                            {query.avgResultCount.toFixed(1)} avg results
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="queries" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Query Performance</CardTitle>
                  <CardDescription>Search queries ranked by usage and effectiveness</CardDescription>
                </CardHeader>
                <CardContent>
                  <PopularQueriesChart data={metrics.popularQueries} />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Query Categories</CardTitle>
                <CardDescription>Common search patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Technical Help", count: 45, percentage: 35 },
                    { category: "Art Feedback", count: 32, percentage: 25 },
                    { category: "Collaboration", count: 28, percentage: 22 },
                    { category: "General Chat", count: 23, percentage: 18 },
                  ].map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.category}</span>
                        <span>{item.count} queries</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search Activity Trends</CardTitle>
              <CardDescription>Detailed view of search patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <SearchTrendsChart data={metrics.searchTrends} detailed />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Peak Search Hours</CardTitle>
                <CardDescription>When users search most actively</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { hour: "14:00-15:00", searches: 156, percentage: 85 },
                    { hour: "10:00-11:00", searches: 142, percentage: 78 },
                    { hour: "16:00-17:00", searches: 134, percentage: 73 },
                    { hour: "20:00-21:00", searches: 128, percentage: 70 },
                    { hour: "09:00-10:00", searches: 98, percentage: 54 },
                  ].map((item) => (
                    <div key={item.hour} className="flex items-center justify-between">
                      <span className="text-sm">{item.hour}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={item.percentage} className="w-20 h-2" />
                        <span className="text-sm font-medium w-12">{item.searches}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Search Success Rate</CardTitle>
                <CardDescription>Percentage of searches returning results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {((1 - metrics.performanceMetrics.failedSearches / metrics.totalSearches) * 100).toFixed(1)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Overall success rate</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Successful searches</span>
                      <span>{metrics.totalSearches - metrics.performanceMetrics.failedSearches}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Failed searches</span>
                      <span>{metrics.performanceMetrics.failedSearches}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Slow searches (&gt;1s)</span>
                      <span>{metrics.performanceMetrics.slowSearches}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="filters" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Filter Usage</CardTitle>
                <CardDescription>How often different filters are used</CardDescription>
              </CardHeader>
              <CardContent>
                <FilterUsageChart data={metrics.filterUsage} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Filter Combinations</CardTitle>
                <CardDescription>Most common filter combinations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { filters: ["Room Filter", "Date Range"], count: 45 },
                    { filters: ["Sender Filter"], count: 38 },
                    { filters: ["Message Type", "Room Filter"], count: 32 },
                    { filters: ["Date Range"], count: 28 },
                    { filters: ["Room Filter"], count: 24 },
                  ].map((combo, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded border">
                      <div className="flex flex-wrap gap-1">
                        {combo.filters.map((filter) => (
                          <Badge key={filter} variant="outline" className="text-xs">
                            {filter}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-sm font-medium">{combo.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-4">
          <RealTimeStats />
        </TabsContent>
      </Tabs>
    </div>
  )
}
