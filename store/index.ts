import { configureStore } from "@reduxjs/toolkit"
import comicsReducer from "./comicsSlice"
import userReducer from "./userSlice"
import notificationReducer from "./notificationSlice"
import chatReducer from "./chatSlice"
import analyticsReducer from "./analyticsSlice"

export const store = configureStore({
  reducer: {
    comics: comicsReducer,
    user: userReducer,
    notifications: notificationReducer,
    chat: chatReducer,
    analytics: analyticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "chat/addMessage",
          "chat/setSearchResults",
          "analytics/trackSearch",
          "analytics/updateDashboardData",
        ],
        ignoredPaths: [
          "chat.search.results",
          "chat.activeRooms",
          "analytics.searchAnalytics",
          "analytics.dashboardData",
        ],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
