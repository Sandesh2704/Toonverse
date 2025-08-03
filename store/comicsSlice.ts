import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Comic {
  id: string
  title: string
  description: string
  thumbnail: string
  banner?: string
  author: string
  category: string
  status: "ongoing" | "completed" | "hiatus"
  rating: number
  views: number
  episodes: number
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface ComicsState {
  comics: Comic[]
  featured: Comic[]
  trending: Comic[]
  latest: Comic[]
  loading: boolean
  error: string | null
}

const initialState: ComicsState = {
  comics: [],
  featured: [],
  trending: [],
  latest: [],
  loading: false,
  error: null,
}

const comicsSlice = createSlice({
  name: "comics",
  initialState,
  reducers: {
    setComics: (state, action: PayloadAction<Comic[]>) => {
      state.comics = action.payload
    },
    setFeatured: (state, action: PayloadAction<Comic[]>) => {
      state.featured = action.payload
    },
    setTrending: (state, action: PayloadAction<Comic[]>) => {
      state.trending = action.payload
    },
    setLatest: (state, action: PayloadAction<Comic[]>) => {
      state.latest = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export const { setComics, setFeatured, setTrending, setLatest, setLoading, setError } = comicsSlice.actions
export default comicsSlice.reducer
