import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { dummyWriters } from "@/data/writers"
import type { Writer } from "@/types/user"

// Async thunks for future API integration
export const fetchWriters = createAsyncThunk(
  "writers/fetchWriters",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 400))
      return dummyWriters
    } catch (error) {
      return rejectWithValue("Failed to fetch writers")
    }
  }
)

export const fetchWriterById = createAsyncThunk(
  "writers/fetchWriterById",
  async (id: string, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      const writer = dummyWriters.find(w => w.id === id)
      if (!writer) {
        throw new Error("Writer not found")
      }
      return writer
    } catch (error) {
      return rejectWithValue("Failed to fetch writer")
    }
  }
)

export const searchWriters = createAsyncThunk(
  "writers/searchWriters",
  async (query: string, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      const searchTerm = query.toLowerCase()
      return dummyWriters.filter(writer => 
        writer.name.toLowerCase().includes(searchTerm) ||
        writer.bio.toLowerCase().includes(searchTerm) ||
        writer.genres.some(genre => genre.toLowerCase().includes(searchTerm))
      )
    } catch (error) {
      return rejectWithValue("Failed to search writers")
    }
  }
)

export const submitWriterApplication = createAsyncThunk(
  "writers/submitApplication",
  async (applicationData: {
    name: string
    email: string
    bio: string
    portfolio: string
    genres: string[]
    experience: string
  }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const newApplication = {
        id: `app-${Date.now()}`,
        ...applicationData,
        status: "pending" as const,
        submittedAt: new Date().toISOString(),
        reviewedAt: null,
        reviewerNotes: null
      }
      return newApplication
    } catch (error) {
      return rejectWithValue("Failed to submit application")
    }
  }
)

export const followWriter = createAsyncThunk(
  "writers/followWriter",
  async (writerId: string, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      return writerId
    } catch (error) {
      return rejectWithValue("Failed to follow writer")
    }
  }
)

export const unfollowWriter = createAsyncThunk(
  "writers/unfollowWriter",
  async (writerId: string, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200))
      return writerId
    } catch (error) {
      return rejectWithValue("Failed to unfollow writer")
    }
  }
)

interface WriterApplication {
  id: string
  name: string
  email: string
  bio: string
  portfolio: string
  genres: string[]
  experience: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  reviewedAt: string | null
  reviewerNotes: string | null
}

interface WritersState {
  // Writers data
  writers: Writer[]
  currentWriter: Writer | null
  featuredWriters: Writer[]
  trendingWriters: Writer[]
  
  // Applications
  applications: WriterApplication[]
  currentApplication: WriterApplication | null
  
  // Search and filters
  searchQuery: string
  searchResults: Writer[]
  selectedGenres: string[]
  
  // UI state
  loading: boolean
  error: string | null
  
  // Form states
  applicationForm: {
    isOpen: boolean
    data: Partial<WriterApplication>
    loading: boolean
  }
  
  // Pagination
  currentPage: number
  itemsPerPage: number
  totalItems: number
  
  // Follow states
  followedWriters: string[]
}

const initialState: WritersState = {
  // Initialize with dummy data
  writers: dummyWriters,
  currentWriter: null,
  featuredWriters: dummyWriters.slice(0, 3),
  trendingWriters: dummyWriters.slice(0, 5),
  
  // Applications
  applications: [],
  currentApplication: null,
  
  // Search and filters
  searchQuery: "",
  searchResults: [],
  selectedGenres: [],
  
  // UI state
  loading: false,
  error: null,
  
  // Form states
  applicationForm: {
    isOpen: false,
    data: {},
    loading: false
  },
  
  // Pagination
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: dummyWriters.length,
  
  // Follow states
  followedWriters: dummyWriters.filter(w => w.isFollowing).map(w => w.id)
}

const writersSlice = createSlice({
  name: "writers",
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
    
    // Search and Filter Actions
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    setSelectedGenres: (state, action: PayloadAction<string[]>) => {
      state.selectedGenres = action.payload
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
    openApplicationForm: (state) => {
      state.applicationForm.isOpen = true
      state.applicationForm.data = {}
    },
    closeApplicationForm: (state) => {
      state.applicationForm.isOpen = false
      state.applicationForm.data = {}
    },
    updateApplicationForm: (state, action: PayloadAction<Partial<WriterApplication>>) => {
      state.applicationForm.data = { ...state.applicationForm.data, ...action.payload }
    },
    
    // Direct State Updates
    addWriterToState: (state, action: PayloadAction<Writer>) => {
      state.writers.unshift(action.payload)
      state.totalItems += 1
    },
    updateWriterInState: (state, action: PayloadAction<{ id: string; updates: Partial<Writer> }>) => {
      const { id, updates } = action.payload
      const index = state.writers.findIndex(writer => writer.id === id)
      if (index !== -1) {
        state.writers[index] = { ...state.writers[index], ...updates }
      }
      if (state.currentWriter?.id === id) {
        state.currentWriter = { ...state.currentWriter, ...updates }
      }
    },
    removeWriterFromState: (state, action: PayloadAction<string>) => {
      state.writers = state.writers.filter(writer => writer.id !== action.payload)
      state.totalItems -= 1
      if (state.currentWriter?.id === action.payload) {
        state.currentWriter = null
      }
    },
    
    // Application Actions
    addApplication: (state, action: PayloadAction<WriterApplication>) => {
      state.applications.unshift(action.payload)
    },
    updateApplication: (state, action: PayloadAction<{ id: string; updates: Partial<WriterApplication> }>) => {
      const { id, updates } = action.payload
      const index = state.applications.findIndex(app => app.id === id)
      if (index !== -1) {
        state.applications[index] = { ...state.applications[index], ...updates }
      }
    },
    setCurrentApplication: (state, action: PayloadAction<WriterApplication | null>) => {
      state.currentApplication = action.payload
    },
    
    // Follow Actions
    addFollowedWriter: (state, action: PayloadAction<string>) => {
      if (!state.followedWriters.includes(action.payload)) {
        state.followedWriters.push(action.payload)
      }
    },
    removeFollowedWriter: (state, action: PayloadAction<string>) => {
      state.followedWriters = state.followedWriters.filter(id => id !== action.payload)
    },
    
    // Featured/Trending Updates
    updateFeaturedWriters: (state, action: PayloadAction<Writer[]>) => {
      state.featuredWriters = action.payload
    },
    updateTrendingWriters: (state, action: PayloadAction<Writer[]>) => {
      state.trendingWriters = action.payload
    }
  },
  extraReducers: (builder) => {
    // Fetch Writers
    builder
      .addCase(fetchWriters.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWriters.fulfilled, (state, action) => {
        state.loading = false
        state.writers = action.payload
        state.totalItems = action.payload.length
      })
      .addCase(fetchWriters.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    
    // Fetch Writer by ID
    builder
      .addCase(fetchWriterById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWriterById.fulfilled, (state, action) => {
        state.loading = false
        state.currentWriter = action.payload
      })
      .addCase(fetchWriterById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    
    // Search Writers
    builder
      .addCase(searchWriters.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchWriters.fulfilled, (state, action) => {
        state.loading = false
        state.searchResults = action.payload
      })
      .addCase(searchWriters.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    
    // Submit Application
    builder
      .addCase(submitWriterApplication.pending, (state) => {
        state.applicationForm.loading = true
        state.error = null
      })
      .addCase(submitWriterApplication.fulfilled, (state, action) => {
        state.applicationForm.loading = false
        state.applicationForm.isOpen = false
        state.applications.unshift(action.payload)
      })
      .addCase(submitWriterApplication.rejected, (state, action) => {
        state.applicationForm.loading = false
        state.error = action.payload as string
      })
    
    // Follow Writer
    builder
      .addCase(followWriter.fulfilled, (state, action) => {
        const writerId = action.payload
        if (!state.followedWriters.includes(writerId)) {
          state.followedWriters.push(writerId)
        }
        // Update writer's isFollowing status
        const writer = state.writers.find(w => w.id === writerId)
        if (writer) {
          writer.isFollowing = true
        }
        if (state.currentWriter?.id === writerId) {
          state.currentWriter.isFollowing = true
        }
      })
      .addCase(followWriter.rejected, (state, action) => {
        state.error = action.payload as string
      })
    
    // Unfollow Writer
    builder
      .addCase(unfollowWriter.fulfilled, (state, action) => {
        const writerId = action.payload
        state.followedWriters = state.followedWriters.filter(id => id !== writerId)
        // Update writer's isFollowing status
        const writer = state.writers.find(w => w.id === writerId)
        if (writer) {
          writer.isFollowing = false
        }
        if (state.currentWriter?.id === writerId) {
          state.currentWriter.isFollowing = false
        }
      })
      .addCase(unfollowWriter.rejected, (state, action) => {
        state.error = action.payload as string
      })
  }
})

export const {
  setLoading,
  setError,
  clearError,
  setSearchQuery,
  setSelectedGenres,
  clearSearch,
  setCurrentPage,
  setItemsPerPage,
  openApplicationForm,
  closeApplicationForm,
  updateApplicationForm,
  addWriterToState,
  updateWriterInState,
  removeWriterFromState,
  addApplication,
  updateApplication,
  setCurrentApplication,
  addFollowedWriter,
  removeFollowedWriter,
  updateFeaturedWriters,
  updateTrendingWriters
} = writersSlice.actions

export default writersSlice.reducer

