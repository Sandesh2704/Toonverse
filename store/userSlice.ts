import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "reader" | "writer" | "maintainer" | "admin" | "super_admin"
  isAuthenticated: boolean
}

interface ReadingProgress {
  episodeId: string
  comicId: string
  progress: number
  currentPage: number
  lastReadAt: string
}

interface UserState {
  user: User | null
  loading: boolean
  error: string | null
  readingProgress: Record<string, ReadingProgress>
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  readingProgress: {},
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    logout: (state) => {
      state.user = null
      state.loading = false
      state.error = null
      state.readingProgress = {}
    },
    updateReadingProgress: (state, action: PayloadAction<ReadingProgress>) => {
      state.readingProgress[action.payload.episodeId] = action.payload
    },
  },
})

export const { setUser, setLoading, setError, logout, updateReadingProgress } = userSlice.actions
export default userSlice.reducer
