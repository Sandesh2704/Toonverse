import { configureStore } from "@reduxjs/toolkit"
import comicsReducer from "./comicsSlice"
import userReducer from "./userSlice"
import notificationReducer from "./notificationSlice"
import chatReducer from "./chatSlice"
import analyticsReducer from "./analyticsSlice"
import categoriesReducer from "./categoriesSlice"

export const store = configureStore({
  reducer: {
    comics: comicsReducer,
    user: userReducer,
    notifications: notificationReducer,
    chat: chatReducer,
    analytics: analyticsReducer,
    categories: categoriesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
