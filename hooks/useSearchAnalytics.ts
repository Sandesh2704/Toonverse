"use client"

import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store"
import { trackSearch, updateSearchMetrics } from "@/store/analyticsSlice"
import type { SearchAnalytics, SearchFilters } from "@/types/analytics"

export function useSearchAnalytics() {
  const dispatch = useDispatch()
  const { searchAnalytics, metrics, dashboardData, currentSession } = useSelector((state: RootState) => state.analytics)
  const { user } = useSelector((state: RootState) => state.user)

  const trackSearchEvent = useCallback(
    (
      query: string,
      filters: SearchFilters,
      resultCount: number,
      searchDuration: number,
      source: "manual" | "suggestion" | "history" = "manual",
    ) => {
      if (!user?.id) return

      const searchEvent: Omit<SearchAnalytics, "id" | "timestamp" | "sessionId"> = {
        userId: user.id,
        query,
        filters,
        resultCount,
        clickedResults: 0,
        searchDuration,
        source,
      }

      dispatch(trackSearch(searchEvent))
    },
    [dispatch, user?.id],
  )

  const trackResultClick = useCallback((searchId: string) => {
    // In a real app, this would update the specific search record
    console.log("Result clicked for search:", searchId)
  }, [])

  const generateMetrics = useCallback(() => {
    if (searchAnalytics.length === 0) return

    const totalSearches = searchAnalytics.length
    const uniqueUsers = new Set(searchAnalytics.map((s) => s.userId)).size
    const avgResultsPerSearch = searchAnalytics.reduce((acc, s) => acc + s.resultCount, 0) / totalSearches
    const avgClickRate = searchAnalytics.reduce((acc, s) => acc + s.clickedResults, 0) / totalSearches

    // Calculate popular queries
    const queryMap = new Map<string, { count: number; results: number[]; users: Set<string> }>()

    searchAnalytics.forEach((search) => {
      const existing = queryMap.get(search.query) || { count: 0, results: [], users: new Set() }
      existing.count += 1
      existing.results.push(search.resultCount)
      existing.users.add(search.userId)
      queryMap.set(search.query, existing)
    })

    const popularQueries = Array.from(queryMap.entries())
      .map(([query, data]) => ({
        query,
        count: data.count,
        avgResultCount: data.results.reduce((a, b) => a + b, 0) / data.results.length,
        avgClickRate: 0, // Would be calculated from actual click data
        lastUsed: new Date(),
        users: Array.from(data.users),
        categories: [], // Would be derived from query analysis
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Calculate search trends (last 7 days)
    const now = new Date()
    const searchTrends = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]

      const daySearches = searchAnalytics.filter((s) => s.timestamp.toISOString().split("T")[0] === dateStr)

      return {
        date: dateStr,
        searches: daySearches.length,
        users: new Set(daySearches.map((s) => s.userId)).size,
      }
    }).reverse()

    // Calculate filter usage
    const filterUsage: { [key: string]: { count: number; percentage: number } } = {}
    const totalFilters = searchAnalytics.length

    searchAnalytics.forEach((search) => {
      if (search.filters.roomIds.length > 0) {
        filterUsage.roomFilter = filterUsage.roomFilter || { count: 0, percentage: 0 }
        filterUsage.roomFilter.count += 1
      }
      if (search.filters.senderIds.length > 0) {
        filterUsage.senderFilter = filterUsage.senderFilter || { count: 0, percentage: 0 }
        filterUsage.senderFilter.count += 1
      }
      if (search.filters.dateRange.from || search.filters.dateRange.to) {
        filterUsage.dateFilter = filterUsage.dateFilter || { count: 0, percentage: 0 }
        filterUsage.dateFilter.count += 1
      }
    })

    Object.keys(filterUsage).forEach((key) => {
      filterUsage[key].percentage = (filterUsage[key].count / totalFilters) * 100
    })

    const newMetrics = {
      totalSearches,
      uniqueUsers,
      avgSearchesPerUser: totalSearches / uniqueUsers,
      avgResultsPerSearch,
      avgClickRate,
      popularQueries,
      searchTrends,
      filterUsage,
      performanceMetrics: {
        avgSearchTime: searchAnalytics.reduce((acc, s) => acc + s.searchDuration, 0) / totalSearches,
        slowSearches: searchAnalytics.filter((s) => s.searchDuration > 1000).length,
        failedSearches: searchAnalytics.filter((s) => s.resultCount === 0).length,
      },
    }

    dispatch(updateSearchMetrics(newMetrics))
  }, [searchAnalytics, dispatch])

  return {
    trackSearchEvent,
    trackResultClick,
    generateMetrics,
    metrics,
    dashboardData,
    searchAnalytics,
    currentSession,
  }
}
