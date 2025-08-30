# Redux Toolkit Setup Documentation

This document explains the Redux Toolkit setup for the Toonverse application, including how to use it for data management, forms, and future API integration.

## 🏗️ Architecture Overview

The application now uses **Redux Toolkit** for all data management with the following structure:

```
store/
├── index.ts              # Main store configuration
├── comicsSlice.ts        # Comics, episodes, categories
├── chatSlice.ts          # Chat rooms, messages, search
├── writersSlice.ts       # Writers, applications, follows
├── formsSlice.ts         # Form state management
├── userSlice.ts          # User authentication (existing)
├── analyticsSlice.ts     # Analytics data (existing)
├── notificationSlice.ts  # Notifications (existing)
└── categoriesSlice.ts    # Categories (existing)
```

## 🚀 Key Features

### 1. **Dummy Data Integration**
- All slices are pre-loaded with dummy data from `/data` folder
- Easy to replace with real API calls later
- Immediate UI updates without backend dependency

### 2. **Async Thunks for API Integration**
- `createAsyncThunk` for all async operations
- Simulated API delays with `setTimeout`
- Error handling with `rejectWithValue`
- Loading states automatically managed

### 3. **Form State Management**
- Centralized form state in Redux
- Validation, submission states, and error handling
- Reusable form helpers and hooks

### 4. **Real-time Chat Integration**
- Chat messages stored in Redux
- Immediate UI updates on message send
- Typing indicators and online status

## 📦 Store Configuration

### Main Store (`store/index.ts`)

```typescript
import { configureStore } from "@reduxjs/toolkit"

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
        ignoredActions: ['persist/PERSIST'],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['chat.messages'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

## 🎯 Slices Overview

### Comics Slice (`store/comicsSlice.ts`)

**State Structure:**
```typescript
interface ComicsState {
  comics: Comic[]
  featured: Comic[]
  trending: Comic[]
  latest: Comic[]
  currentComic: Comic | null
  categories: string[]
  selectedCategory: string | null
  searchQuery: string
  searchResults: Comic[]
  loading: boolean
  error: string | null
  createComicForm: {
    isOpen: boolean
    data: Partial<Comic>
    loading: boolean
  }
  currentPage: number
  itemsPerPage: number
  totalItems: number
}
```

**Key Actions:**
- `fetchComics()` - Load all comics
- `fetchComicById(id)` - Load specific comic
- `searchComics(query)` - Search comics
- `createComic(data)` - Create new comic
- `updateComic({id, updates})` - Update comic
- `deleteComic(id)` - Delete comic
- `addEpisode({comicId, episodeData})` - Add episode

### Chat Slice (`store/chatSlice.ts`)

**State Structure:**
```typescript
interface ChatState {
  activeRooms: ChatRoom[]
  directMessages: DirectMessage[]
  activeChat: string | null
  messages: { [roomId: string]: Message[] }
  onlineUsers: string[]
  typingUsers: { [roomId: string]: string[] }
  unreadCounts: { [roomId: string]: number }
  chatSettings: ChatSettings
  search: SearchState
  loading: boolean
  error: string | null
  createRoomForm: {
    isOpen: boolean
    data: Partial<ChatRoom>
    loading: boolean
  }
}
```

**Key Actions:**
- `fetchChatRooms()` - Load chat rooms
- `fetchMessages(roomId)` - Load room messages
- `sendMessage({roomId, messageData})` - Send message
- `createChatRoom(roomData)` - Create new room
- `searchMessages({query, filters})` - Search messages

### Forms Slice (`store/formsSlice.ts`)

**State Structure:**
```typescript
interface FormsState {
  forms: { [formId: string]: FormState }
  submitting: { [formId: string]: boolean }
  valid: { [formId: string]: boolean }
  open: { [formId: string]: boolean }
  errors: { [formId: string]: string | null }
  success: { [formId: string]: boolean }
}
```

**Key Actions:**
- `initializeForm({formId, initialData})` - Initialize form
- `updateField({formId, fieldName, value})` - Update field
- `setFieldError({formId, fieldName, error})` - Set field error
- `setSubmitting({formId, submitting})` - Set submission state
- `resetForm({formId, initialData})` - Reset form

### Writers Slice (`store/writersSlice.ts`)

**State Structure:**
```typescript
interface WritersState {
  writers: Writer[]
  currentWriter: Writer | null
  featuredWriters: Writer[]
  trendingWriters: Writer[]
  applications: WriterApplication[]
  currentApplication: WriterApplication | null
  searchQuery: string
  searchResults: Writer[]
  selectedGenres: string[]
  loading: boolean
  error: string | null
  applicationForm: {
    isOpen: boolean
    data: Partial<WriterApplication>
    loading: boolean
  }
  currentPage: number
  itemsPerPage: number
  totalItems: number
  followedWriters: string[]
}
```

**Key Actions:**
- `fetchWriters()` - Load all writers
- `fetchWriterById(id)` - Load specific writer
- `searchWriters(query)` - Search writers
- `submitWriterApplication(data)` - Submit application
- `followWriter(id)` - Follow writer
- `unfollowWriter(id)` - Unfollow writer

## 🎣 Custom Hooks

### Redux Hooks (`hooks/useRedux.ts`)

**Comics Selectors:**
```typescript
const comics = useComics()
const featuredComics = useFeaturedComics()
const currentComic = useCurrentComic()
const loading = useComicsLoading()
const error = useComicsError()
```

**Chat Selectors:**
```typescript
const chatRooms = useChatRooms()
const activeChat = useActiveChat()
const messages = useChatMessages(roomId)
const onlineUsers = useOnlineUsers()
const typingUsers = useTypingUsers(roomId)
```

**Writers Selectors:**
```typescript
const writers = useWriters()
const currentWriter = useCurrentWriter()
const followedWriters = useFollowedWriters()
const applications = useApplications()
```

**Form Helpers:**
```typescript
const {
  formData,
  submitting,
  error,
  success,
  updateField,
  setSubmitting,
  setFormError,
  resetForm,
  getFormValues,
  isFormValid
} = useFormHelpers("my-form-id")
```

## 📝 Usage Examples

### 1. Creating a Comic

```typescript
import { useAppDispatch } from "@/hooks/useRedux"
import { createComic } from "@/store/comicsSlice"

function CreateComicForm() {
  const dispatch = useAppDispatch()
  
  const handleSubmit = async (formData) => {
    try {
      await dispatch(createComic(formData)).unwrap()
      toast.success("Comic created successfully!")
    } catch (error) {
      toast.error("Failed to create comic")
    }
  }
}
```

### 2. Using Forms with Redux

```typescript
import { useFormHelpers } from "@/hooks/useRedux"

function MyForm() {
  const {
    formData,
    submitting,
    updateField,
    setSubmitting,
    getFormValues,
    isFormValid
  } = useFormHelpers("my-form")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid()) return
    
    setSubmitting(true)
    const values = getFormValues()
    // Submit form data
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.title?.value || ""}
        onChange={(e) => updateField("title", e.target.value)}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  )
}
```

### 3. Sending Chat Messages

```typescript
import { useAppDispatch } from "@/hooks/useRedux"
import { sendMessage } from "@/store/chatSlice"

function ChatInput() {
  const dispatch = useAppDispatch()
  
  const handleSend = async (message) => {
    try {
      await dispatch(sendMessage({
        roomId: "general",
        messageData: {
          content: message,
          senderId: "user-1",
          senderName: "John Doe",
          type: "text"
        }
      })).unwrap()
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }
}
```

### 4. Searching Comics

```typescript
import { useAppDispatch } from "@/hooks/useRedux"
import { searchComics } from "@/store/comicsSlice"
import { useSearchResults } from "@/hooks/useRedux"

function SearchComics() {
  const dispatch = useAppDispatch()
  const searchResults = useSearchResults()
  
  const handleSearch = async (query) => {
    try {
      await dispatch(searchComics(query)).unwrap()
    } catch (error) {
      console.error("Search failed:", error)
    }
  }
}
```

## 🔄 Future API Integration

### Replacing Dummy Data with Real APIs

**Current (Dummy Data):**
```typescript
export const fetchComics = createAsyncThunk(
  "comics/fetchComics",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      return dummyComics // Replace this line
    } catch (error) {
      return rejectWithValue("Failed to fetch comics")
    }
  }
)
```

**Future (Real API):**
```typescript
export const fetchComics = createAsyncThunk(
  "comics/fetchComics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/comics')
      if (!response.ok) throw new Error('Failed to fetch')
      return await response.json()
    } catch (error) {
      return rejectWithValue("Failed to fetch comics")
    }
  }
)
```

### API Integration Checklist

1. **Replace dummy data imports** with API calls
2. **Update error handling** for real API responses
3. **Add authentication headers** where needed
4. **Handle pagination** for large datasets
5. **Add optimistic updates** for better UX
6. **Implement retry logic** for failed requests
7. **Add request caching** to reduce API calls

## 🎨 UI Integration

### Loading States
```typescript
const loading = useComicsLoading()
if (loading) return <Spinner />
```

### Error Handling
```typescript
const error = useComicsError()
if (error) return <ErrorMessage message={error} />
```

### Real-time Updates
```typescript
// Messages update immediately in chat
const messages = useChatMessages(roomId)
// Comics list updates when new comic is created
const comics = useComics()
```

## 🧪 Testing

### Testing Async Thunks
```typescript
import { fetchComics } from "@/store/comicsSlice"

test('fetchComics success', async () => {
  const mockComics = [{ id: '1', title: 'Test Comic' }]
  
  const result = await store.dispatch(fetchComics())
  
  expect(result.payload).toEqual(mockComics)
  expect(store.getState().comics.comics).toEqual(mockComics)
})
```

### Testing Form State
```typescript
import { updateField } from "@/store/formsSlice"

test('updateField updates form state', () => {
  store.dispatch(updateField({ formId: 'test', fieldName: 'title', value: 'New Title' }))
  
  const formData = store.getState().forms.forms.test
  expect(formData.title.value).toBe('New Title')
})
```

## 📚 Best Practices

### 1. **Use Custom Hooks**
Always use the custom hooks from `hooks/useRedux.ts` instead of raw `useSelector` and `useDispatch`.

### 2. **Handle Loading States**
Always check loading states before rendering data:
```typescript
const loading = useComicsLoading()
if (loading) return <LoadingSpinner />
```

### 3. **Error Handling**
Implement proper error handling for all async operations:
```typescript
try {
  await dispatch(someAsyncThunk()).unwrap()
} catch (error) {
  // Handle error appropriately
}
```

### 4. **Form Validation**
Use the form helpers for consistent form handling:
```typescript
const { updateField, isFormValid, getFormValues } = useFormHelpers("form-id")
```

### 5. **Optimistic Updates**
For better UX, update the UI immediately and handle errors gracefully:
```typescript
// Update UI immediately
dispatch(addComicToState(newComic))
// Then sync with server
dispatch(createComic(newComic))
```

## 🚀 Migration Guide

### From Local State to Redux

**Before (Local State):**
```typescript
const [comics, setComics] = useState([])
const [loading, setLoading] = useState(false)

const fetchComics = async () => {
  setLoading(true)
  const data = await api.getComics()
  setComics(data)
  setLoading(false)
}
```

**After (Redux):**
```typescript
const comics = useComics()
const loading = useComicsLoading()
const dispatch = useAppDispatch()

const fetchComics = () => {
  dispatch(fetchComics())
}
```

### From Direct Data Imports to Redux

**Before:**
```typescript
import { dummyComics } from "@/data/comics"

function ComicList() {
  return dummyComics.map(comic => <ComicCard key={comic.id} comic={comic} />)
}
```

**After:**
```typescript
import { useComics } from "@/hooks/useRedux"

function ComicList() {
  const comics = useComics()
  return comics.map(comic => <ComicCard key={comic.id} comic={comic} />)
}
```

## 🎯 Next Steps

1. **Replace all direct data imports** with Redux selectors
2. **Update all forms** to use the forms slice
3. **Implement real-time features** using the chat slice
4. **Add optimistic updates** for better UX
5. **Prepare for API integration** by updating async thunks
6. **Add comprehensive tests** for all slices and thunks

This Redux setup provides a solid foundation for scalable state management and easy API integration in the future!

