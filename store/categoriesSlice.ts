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
}

const demoCategories: Category[] = [
  {
    id: "1",
    name: "Fantasy",
    description: "Magical worlds and mythical creatures",
    slug: "fantasy",
    color: "purple",
    icon: "Sparkles",
    isActive: true,
    comicsCount: 15,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Sci-Fi",
    description: "Futuristic technology and space adventures",
    slug: "sci-fi",
    color: "blue",
    icon: "Rocket",
    isActive: true,
    comicsCount: 12,
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "3",
    name: "Romance",
    description: "Love stories and relationships",
    slug: "romance",
    color: "pink",
    icon: "Heart",
    isActive: true,
    comicsCount: 8,
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z",
  },
  {
    id: "4",
    name: "Action",
    description: "High-energy adventures and battles",
    slug: "action",
    color: "red",
    icon: "Zap",
    isActive: true,
    comicsCount: 20,
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
  },
  {
    id: "5",
    name: "Mystery",
    description: "Puzzles, secrets, and detective stories",
    slug: "mystery",
    color: "gray",
    icon: "Search",
    isActive: true,
    comicsCount: 6,
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-19T10:00:00Z",
  },
  {
    id: "6",
    name: "Horror",
    description: "Scary and supernatural stories",
    slug: "horror",
    color: "black",
    icon: "Ghost",
    isActive: false,
    comicsCount: 4,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "7",
    name: "Comedy",
    description: "Funny and lighthearted stories",
    slug: "comedy",
    color: "yellow",
    icon: "Smile",
    isActive: true,
    comicsCount: 10,
    createdAt: "2024-01-21T10:00:00Z",
    updatedAt: "2024-01-21T10:00:00Z",
  },
  {
    id: "8",
    name: "Slice of Life",
    description: "Everyday life and realistic stories",
    slug: "slice-of-life",
    color: "green",
    icon: "Coffee",
    isActive: true,
    comicsCount: 7,
    createdAt: "2024-01-22T10:00:00Z",
    updatedAt: "2024-01-22T10:00:00Z",
  },
]

const initialState: CategoriesState = {
  categories: demoCategories,
  loading: false,
  error: null,
}

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    addCategory: (state, action: PayloadAction<Omit<Category, "id" | "createdAt" | "updatedAt">>) => {
      const newCategory: Category = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      state.categories.push(newCategory)
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex((cat) => cat.id === action.payload.id)
      if (index !== -1) {
        state.categories[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        }
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
  },
})

export const { setLoading, setError, addCategory, updateCategory, deleteCategory, toggleCategoryStatus } =
  categoriesSlice.actions

export default categoriesSlice.reducer
