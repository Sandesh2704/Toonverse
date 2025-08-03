import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import comicsReducer from "./comicsSlice"
import chatReducer from "./chatSlice"
import analyticsReducer from "./analyticsSlice"
import notificationReducer from "./notificationSlice"
import categoriesReducer from "./categoriesSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    comics: comicsReducer,
    chat: chatReducer,
    analytics: analyticsReducer,
    notifications: notificationReducer,
    categories: categoriesReducer, // Add this line
  },
})
