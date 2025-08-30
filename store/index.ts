import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import comicsReducer from "./comicsSlice"
import chatReducer from "./chatSlice"
import writersReducer from "./writersSlice"
import formsReducer from "./formsSlice"
import analyticsReducer from "./analyticsSlice"
import notificationReducer from "./notificationSlice"
import categoriesReducer from "./categoriesSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    comics: comicsReducer,
    chat: chatReducer,
    writers: writersReducer,
    forms: formsReducer,
    analytics: analyticsReducer,
    notifications: notificationReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['chat.messages'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
