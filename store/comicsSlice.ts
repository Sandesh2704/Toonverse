import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { dummyComics, categories } from "@/data/comics"
import { demoComics } from "@/data/demoComics"
import type { Comic, Episode, Comment } from "@/types/comic"

// Async thunks for future API integration
export const fetchComics = createAsyncThunk(
  "comics/fetchComics",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 500))
      return dummyComics
    } catch (error) {
      return rejectWithValue("Failed to fetch comics")
    }
  }
)

export const fetchComicById = createAsyncThunk(
  "comics/fetchComicById",
  async (id: string, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      const comic = dummyComics.find(c => c.id === id)
      if (!comic) {
        throw new Error("Comic not found")
      }
      return comic
    } catch (error) {
      return rejectWithValue("Failed to fetch comic")
    }
  }
)

export const fetchComicsByCategory = createAsyncThunk(
  "comics/fetchComicsByCategory",
  async (category: string, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 400))
      return dummyComics.filter(comic => comic.category === category)
    } catch (error) {
      return rejectWithValue("Failed to fetch comics by category")
    }
  }
)

export const searchComics = createAsyncThunk(
  "comics/searchComics",
  async (query: string, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      const searchTerm = query.toLowerCase()
      return dummyComics.filter(comic => 
        comic.title.toLowerCase().includes(searchTerm) ||
        comic.description.toLowerCase().includes(searchTerm) ||
        comic.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    } catch (error) {
      return rejectWithValue("Failed to search comics")
    }
  }
)

export const createComic = createAsyncThunk(
  "comics/createComic",
  async (comicData: Omit<Comic, "id" | "createdAt" | "updatedAt" | "isApproved">, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      const newComic: Comic = {
        ...comicData,
        id: `comic-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isApproved: false,
        episodes: []
      }
      return newComic
    } catch (error) {
      return rejectWithValue("Failed to create comic")
    }
  }
)

export const updateComic = createAsyncThunk(
  "comics/updateComic",
  async ({ id, updates }: { id: string; updates: Partial<Comic> }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      return { id, updates: { ...updates, updatedAt: new Date().toISOString() } }
    } catch (error) {
      return rejectWithValue("Failed to update comic")
    }
  }
)

export const deleteComic = createAsyncThunk(
  "comics/deleteComic",
  async (id: string, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      return id
    } catch (error) {
      return rejectWithValue("Failed to delete comic")
    }
  }
)

export const addEpisode = createAsyncThunk(
  "comics/addEpisode",
  async ({ comicId, episodeData }: { comicId: string; episodeData: Omit<Episode, "id" | "createdAt" | "updatedAt" | "isApproved"> }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 700))
      const newEpisode: Episode = {
        ...episodeData,
        id: `episode-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isApproved: false
      }
      return { comicId, episode: newEpisode }
    } catch (error) {
      return rejectWithValue("Failed to add episode")
    }
  }
)

export const addComment = createAsyncThunk(
  "comics/addComment",
  async ({ comicId, commentData }: { comicId: string; commentData: Omit<Comment, "id" | "createdAt" | "updatedAt" | "replies"> }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 400))
      const newComment: Comment = {
        ...commentData,
        id: `comment-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        replies: []
      }
      return { comicId, comment: newComment }
    } catch (error) {
      return rejectWithValue("Failed to add comment")
    }
  }
)

interface ComicsState {
  // Comics data
  comics: Comic[]
  featured: Comic[]
  trending: Comic[]
  latest: Comic[]
  currentComic: Comic | null
  
  // Categories and filters
  categories: string[]
  selectedCategory: string | null
  searchQuery: string
  searchResults: Comic[]
  
  // UI state
  loading: boolean
  error: string | null
  
  // Form states
  createComicForm: {
    isOpen: boolean
    data: Partial<Comic>
    loading: boolean
  }
  
  // Pagination
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

const initialState: ComicsState = {
  // Initialize with dummy data
  comics: dummyComics,
  featured: dummyComics.slice(0, 3),
  trending: dummyComics.slice(0, 5),
  latest: dummyComics.slice(0, 6),
  currentComic: null,
  
  // Categories from dummy data
  categories: categories,
  selectedCategory: null,
  searchQuery: "",
  searchResults: [],
  
  // UI state
  loading: false,
  error: null,
  
  // Form states
  createComicForm: {
    isOpen: false,
    data: {},
    loading: false
  },
  
  // Pagination
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: dummyComics.length
}

const comicsSlice = createSlice({
  name: "comics",
  initialState,
  reducers: {
    // UI Actions
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    
    // Filter Actions
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload
      state.currentPage = 1
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    clearSearch: (state) => {
      state.searchQuery = ""
      state.searchResults = []
    },
    
    // Pagination Actions
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
      state.currentPage = 1
    },
    
    // Form Actions
    openCreateComicForm: (state) => {
      state.createComicForm.isOpen = true
      state.createComicForm.data = {}
    },
    closeCreateComicForm: (state) => {
      state.createComicForm.isOpen = false
      state.createComicForm.data = {}
    },
    updateCreateComicForm: (state, action: PayloadAction<Partial<Comic>>) => {
      state.createComicForm.data = { ...state.createComicForm.data, ...action.payload }
    },
    
    // Direct State Updates (for immediate UI updates)
    addComicToState: (state, action: PayloadAction<Comic>) => {
      state.comics.unshift(action.payload)
      state.totalItems += 1
    },
    updateComicInState: (state, action: PayloadAction<{ id: string; updates: Partial<Comic> }>) => {
      const { id, updates } = action.payload
      const index = state.comics.findIndex(comic => comic.id === id)
      if (index !== -1) {
        state.comics[index] = { ...state.comics[index], ...updates }
      }
      if (state.currentComic?.id === id) {
        state.currentComic = { ...state.currentComic, ...updates }
      }
    },
    removeComicFromState: (state, action: PayloadAction<string>) => {
      state.comics = state.comics.filter(comic => comic.id !== action.payload)
      state.totalItems -= 1
      if (state.currentComic?.id === action.payload) {
        state.currentComic = null
      }
    },
    addEpisodeToComic: (state, action: PayloadAction<{ comicId: string; episode: Episode }>) => {
      const { comicId, episode } = action.payload
      const comic = state.comics.find(c => c.id === comicId)
      if (comic) {
        comic.episodes.push(episode)
      }
      if (state.currentComic?.id === comicId) {
        state.currentComic.episodes.push(episode)
      }
    },
    addCommentToComic: (state, action: PayloadAction<{ comicId: string; comment: Comment }>) => {
      const { comicId, comment } = action.payload
      // This would typically be handled by a separate comments slice
      // For now, we'll just update the UI state
    },
    
    // Featured/Trending/Latest Updates
    updateFeatured: (state, action: PayloadAction<Comic[]>) => {
      state.featured = action.payload
    },
    updateTrending: (state, action: PayloadAction<Comic[]>) => {
      state.trending = action.payload
    },
    updateLatest: (state, action: PayloadAction<Comic[]>) => {
      state.latest = action.payload
    }
  },
  extraReducers: (builder) => {
    // Fetch Comics
    builder
      .addCase(fetchComics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchComics.fulfilled, (state, action) => {
        state.loading = false
        state.comics = action.payload
        state.totalItems = action.payload.length
      })
      .addCase(fetchComics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    
    // Fetch Comic by ID
    builder
      .addCase(fetchComicById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchComicById.fulfilled, (state, action) => {
        state.loading = false
        state.currentComic = action.payload
      })
      .addCase(fetchComicById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    
    // Search Comics
    builder
      .addCase(searchComics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchComics.fulfilled, (state, action) => {
        state.loading = false
        state.searchResults = action.payload
      })
      .addCase(searchComics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    
    // Create Comic
    builder
      .addCase(createComic.pending, (state) => {
        state.createComicForm.loading = true
        state.error = null
      })
      .addCase(createComic.fulfilled, (state, action) => {
        state.createComicForm.loading = false
        state.createComicForm.isOpen = false
        state.comics.unshift(action.payload)
        state.totalItems += 1
      })
      .addCase(createComic.rejected, (state, action) => {
        state.createComicForm.loading = false
        state.error = action.payload as string
      })
    
    // Update Comic
    builder
      .addCase(updateComic.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateComic.fulfilled, (state, action) => {
        state.loading = false
        const { id, updates } = action.payload
        const index = state.comics.findIndex(comic => comic.id === id)
        if (index !== -1) {
          state.comics[index] = { ...state.comics[index], ...updates }
        }
        if (state.currentComic?.id === id) {
          state.currentComic = { ...state.currentComic, ...updates }
        }
      })
      .addCase(updateComic.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    
    // Delete Comic
    builder
      .addCase(deleteComic.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteComic.fulfilled, (state, action) => {
        state.loading = false
        state.comics = state.comics.filter(comic => comic.id !== action.payload)
        state.totalItems -= 1
        if (state.currentComic?.id === action.payload) {
          state.currentComic = null
        }
      })
      .addCase(deleteComic.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    
    // Add Episode
    builder
      .addCase(addEpisode.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addEpisode.fulfilled, (state, action) => {
        state.loading = false
        const { comicId, episode } = action.payload
        const comic = state.comics.find(c => c.id === comicId)
        if (comic) {
          comic.episodes.push(episode)
        }
        if (state.currentComic?.id === comicId) {
          state.currentComic.episodes.push(episode)
        }
      })
      .addCase(addEpisode.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const {
  setLoading,
  setError,
  clearError,
  setSelectedCategory,
  setSearchQuery,
  clearSearch,
  setCurrentPage,
  setItemsPerPage,
  openCreateComicForm,
  closeCreateComicForm,
  updateCreateComicForm,
  addComicToState,
  updateComicInState,
  removeComicFromState,
  addEpisodeToComic,
  addCommentToComic,
  updateFeatured,
  updateTrending,
  updateLatest
} = comicsSlice.actions

export default comicsSlice.reducer
