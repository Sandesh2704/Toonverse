import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { SearchAnalytics, SearchMetrics, UserSearchBehavior, AnalyticsDashboardData } from "@/types/analytics"

interface AnalyticsState {
  searchAnalytics: SearchAnalytics[]
  metrics: SearchMetrics | null
  userBehavior: UserSearchBehavior[]
  dashboardData: AnalyticsDashboardData | null
  isLoading: boolean
  currentSession: string
  realTimeStats: {
    activeSearches: number
    recentQueries: string[]
    topUsers: string[]
  }
}

const initialState: AnalyticsState = {
  searchAnalytics: [],
  metrics: null,
  userBehavior: [],
  dashboardData: null,
  isLoading: false,
  currentSession: `session-${Date.now()}`,
  realTimeStats: {
    activeSearches: 0,
    recentQueries: [],
    topUsers: [],
  },
}

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    trackSearch: (state, action: PayloadAction<Omit<SearchAnalytics, "id" | "timestamp" | "sessionId">>) => {
      const searchEvent: SearchAnalytics = {
        ...action.payload,
        id: `search-${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        sessionId: state.currentSession,
      }

      state.searchAnalytics.push(searchEvent)

      // Update real-time stats
      state.realTimeStats.activeSearches += 1
      state.realTimeStats.recentQueries = [action.payload.query, ...state.realTimeStats.recentQueries.slice(0, 9)]

      if (!state.realTimeStats.topUsers.includes(action.payload.userId)) {
        state.realTimeStats.topUsers = [action.payload.userId, ...state.realTimeStats.topUsers.slice(0, 4)]
      }
    },

    updateSearchMetrics: (state, action: PayloadAction<SearchMetrics>) => {
      state.metrics = action.payload
    },

    updateUserBehavior: (state, action: PayloadAction<UserSearchBehavior[]>) => {
      state.userBehavior = action.payload
    },

    updateDashboardData: (state, action: PayloadAction<AnalyticsDashboardData>) => {
      state.dashboardData = action.payload
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },

    startNewSession: (state) => {
      state.currentSession = `session-${Date.now()}`
    },

    updateRealTimeStats: (state, action: PayloadAction<Partial<AnalyticsState["realTimeStats"]>>) => {
      state.realTimeStats = { ...state.realTimeStats, ...action.payload }
    },

    clearAnalytics: (state) => {
      state.searchAnalytics = []
      state.metrics = null
      state.userBehavior = []
      state.dashboardData = null
      state.realTimeStats = {
        activeSearches: 0,
        recentQueries: [],
        topUsers: [],
      }
    },
  },
})

export const {
  trackSearch,
  updateSearchMetrics,
  updateUserBehavior,
  updateDashboardData,
  setLoading,
  startNewSession,
  updateRealTimeStats,
  clearAnalytics,
} = analyticsSlice.actions

export default analyticsSlice.reducer
