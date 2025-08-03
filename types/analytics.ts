export interface SearchAnalytics {
  id: string
  userId: string
  query: string
  filters: SearchFilters
  resultCount: number
  clickedResults: number
  searchDuration: number
  timestamp: Date
  sessionId: string
  source: "manual" | "suggestion" | "history"
}

export interface SearchPattern {
  query: string
  count: number
  avgResultCount: number
  avgClickRate: number
  lastUsed: Date
  users: string[]
  categories: string[]
}

export interface SearchMetrics {
  totalSearches: number
  uniqueUsers: number
  avgSearchesPerUser: number
  avgResultsPerSearch: number
  avgClickRate: number
  popularQueries: SearchPattern[]
  searchTrends: {
    date: string
    searches: number
    users: number
  }[]
  filterUsage: {
    [filterType: string]: {
      count: number
      percentage: number
    }
  }
  performanceMetrics: {
    avgSearchTime: number
    slowSearches: number
    failedSearches: number
  }
}

export interface UserSearchBehavior {
  userId: string
  totalSearches: number
  uniqueQueries: number
  avgSessionLength: number
  favoriteFilters: string[]
  searchFrequency: "low" | "medium" | "high"
  preferredSearchTime: string[]
  topQueries: string[]
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

export interface AnalyticsDashboardData {
  overview: {
    totalSearches: number
    totalUsers: number
    avgSearchTime: number
    successRate: number
  }
  trends: {
    daily: { date: string; searches: number; users: number }[]
    weekly: { week: string; searches: number; users: number }[]
    monthly: { month: string; searches: number; users: number }[]
  }
  popularQueries: {
    query: string
    count: number
    trend: "up" | "down" | "stable"
    change: number
  }[]
  userBehavior: {
    searchFrequency: { range: string; users: number }[]
    sessionDuration: { range: string; sessions: number }[]
    deviceTypes: { type: string; percentage: number }[]
  }
  filterAnalytics: {
    mostUsedFilters: { filter: string; usage: number }[]
    filterCombinations: { combination: string[]; count: number }[]
  }
}
