import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Category {
  id: string
  name: string
  description: string
  slug: string
  color: string
  icon: string
  isActive: boolean
  comicsCount: number
  createdAt: string
  updatedAt: string
}

interface CategoriesState {
  categories: Category[]
  loading: boolean
  error: string | null
  selectedCategory: Category | null
}

const initialState: CategoriesState = {
  categories: [
    {
      id: "1",
      name: "Fantasy",
      description: "Magical worlds, mythical creatures, and supernatural adventures",
      slug: "fantasy",
      color: "#8B5CF6",
      icon: "Sparkles",
      isActive: true,
      comicsCount: 156,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "2",
      name: "Sci-Fi",
      description: "Futuristic technology, space exploration, and scientific fiction",
      slug: "sci-fi",
      color: "#06B6D4",
      icon: "Rocket",
      isActive: true,
      comicsCount: 89,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "3",
      name: "Romance",
      description: "Love stories, relationships, and emotional journeys",
      slug: "romance",
      color: "#EC4899",
      icon: "Heart",
      isActive: true,
      comicsCount: 234,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "4",
      name: "Action",
      description: "High-energy adventures, battles, and thrilling sequences",
      slug: "action",
      color: "#EF4444",
      icon: "Zap",
      isActive: true,
      comicsCount: 178,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "5",
      name: "Mystery",
      description: "Puzzles, detective stories, and suspenseful narratives",
      slug: "mystery",
      color: "#6366F1",
      icon: "Search",
      isActive: true,
      comicsCount: 67,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "6",
      name: "Horror",
      description: "Scary stories, supernatural terror, and spine-chilling tales",
      slug: "horror",
      color: "#1F2937",
      icon: "Ghost",
      isActive: true,
      comicsCount: 45,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "7",
      name: "Comedy",
      description: "Humorous stories, funny situations, and light-hearted content",
      slug: "comedy",
      color: "#F59E0B",
      icon: "Smile",
      isActive: true,
      comicsCount: 123,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "8",
      name: "Drama",
      description: "Emotional stories, character development, and serious themes",
      slug: "drama",
      color: "#10B981",
      icon: "Theater",
      isActive: true,
      comicsCount: 98,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
  ],
  loading: false,
  error: null,
  selectedCategory: null,
}

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload)
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex((cat) => cat.id === action.payload.id)
      if (index !== -1) {
        state.categories[index] = action.payload
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((cat) => cat.id !== action.payload)
    },
    toggleCategoryStatus: (state, action: PayloadAction<string>) => {
      const category = state.categories.find((cat) => cat.id === action.payload)
      if (category) {
        category.isActive = !category.isActive
        category.updatedAt = new Date().toISOString()
      }
    },
    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
      state.selectedCategory = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
  setSelectedCategory,
  setLoading,
  setError,
} = categoriesSlice.actions

export default categoriesSlice.reducer
