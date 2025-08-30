import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch } from "@/store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Comics selectors
export const useComics = () => useAppSelector((state) => state.comics.comics)
export const useFeaturedComics = () => useAppSelector((state) => state.comics.featured)
export const useTrendingComics = () => useAppSelector((state) => state.comics.trending)
export const useLatestComics = () => useAppSelector((state) => state.comics.latest)
export const useCurrentComic = () => useAppSelector((state) => state.comics.currentComic)
export const useComicsLoading = () => useAppSelector((state) => state.comics.loading)
export const useComicsError = () => useAppSelector((state) => state.comics.error)
export const useComicsCategories = () => useAppSelector((state) => state.comics.categories)
export const useSelectedCategory = () => useAppSelector((state) => state.comics.selectedCategory)
export const useSearchQuery = () => useAppSelector((state) => state.comics.searchQuery)
export const useSearchResults = () => useAppSelector((state) => state.comics.searchResults)
export const useCreateComicForm = () => useAppSelector((state) => state.comics.createComicForm)

// Chat selectors
export const useChatRooms = () => useAppSelector((state) => state.chat.activeRooms)
export const useActiveChat = () => useAppSelector((state) => state.chat.activeChat)
export const useChatMessages = (roomId: string) => useAppSelector((state) => state.chat.messages[roomId] || [])
export const useChatLoading = () => useAppSelector((state) => state.chat.loading)
export const useChatError = () => useAppSelector((state) => state.chat.error)
export const useOnlineUsers = () => useAppSelector((state) => state.chat.onlineUsers)
export const useTypingUsers = (roomId: string) => useAppSelector((state) => state.chat.typingUsers[roomId] || [])
export const useUnreadCounts = () => useAppSelector((state) => state.chat.unreadCounts)
export const useChatSettings = () => useAppSelector((state) => state.chat.chatSettings)
export const useChatSearch = () => useAppSelector((state) => state.chat.search)
export const useCreateRoomForm = () => useAppSelector((state) => state.chat.createRoomForm)

// Writers selectors
export const useWriters = () => useAppSelector((state) => state.writers.writers)
export const useCurrentWriter = () => useAppSelector((state) => state.writers.currentWriter)
export const useFeaturedWriters = () => useAppSelector((state) => state.writers.featuredWriters)
export const useTrendingWriters = () => useAppSelector((state) => state.writers.trendingWriters)
export const useWritersLoading = () => useAppSelector((state) => state.writers.loading)
export const useWritersError = () => useAppSelector((state) => state.writers.error)
export const useWritersSearchQuery = () => useAppSelector((state) => state.writers.searchQuery)
export const useWritersSearchResults = () => useAppSelector((state) => state.writers.searchResults)
export const useSelectedGenres = () => useAppSelector((state) => state.writers.selectedGenres)
export const useFollowedWriters = () => useAppSelector((state) => state.writers.followedWriters)
export const useApplications = () => useAppSelector((state) => state.writers.applications)
export const useCurrentApplication = () => useAppSelector((state) => state.writers.currentApplication)
export const useApplicationForm = () => useAppSelector((state) => state.writers.applicationForm)

// Forms selectors
export const useFormData = (formId: string) => useAppSelector((state) => state.forms.forms[formId] || {})
export const useFormField = (formId: string, fieldName: string) => 
  useAppSelector((state) => state.forms.forms[formId]?.[fieldName])
export const useFormSubmitting = (formId: string) => useAppSelector((state) => state.forms.submitting[formId] || false)
export const useFormValid = (formId: string) => useAppSelector((state) => state.forms.valid[formId] || true)
export const useFormOpen = (formId: string) => useAppSelector((state) => state.forms.open[formId] || false)
export const useFormError = (formId: string) => useAppSelector((state) => state.forms.errors[formId])
export const useFormSuccess = (formId: string) => useAppSelector((state) => state.forms.success[formId] || false)

// User selectors
export const useUser = () => useAppSelector((state) => state.user.user)
export const useIsAuthenticated = () => useAppSelector((state) => !!state.user.user)
export const useUserRole = () => useAppSelector((state) => state.user.user?.role)

// Utility selectors
export const useIsLoading = () => {
  const comicsLoading = useComicsLoading()
  const chatLoading = useChatLoading()
  const writersLoading = useWritersLoading()
  return comicsLoading || chatLoading || writersLoading
}

export const useHasError = () => {
  const comicsError = useComicsError()
  const chatError = useChatError()
  const writersError = useWritersError()
  return !!(comicsError || chatError || writersError)
}

// Form helpers
export const useFormHelpers = (formId: string) => {
  const dispatch = useAppDispatch()
  const formData = useFormData(formId)
  const submitting = useFormSubmitting(formId)
  const valid = useFormValid(formId)
  const open = useFormOpen(formId)
  const error = useFormError(formId)
  const success = useFormSuccess(formId)

  const updateField = (fieldName: string, value: any) => {
    dispatch({ type: 'forms/updateField', payload: { formId, fieldName, value } })
  }

  const setFieldError = (fieldName: string, error: string) => {
    dispatch({ type: 'forms/setFieldError', payload: { formId, fieldName, error } })
  }

  const clearFieldError = (fieldName: string) => {
    dispatch({ type: 'forms/clearFieldError', payload: { formId, fieldName } })
  }

  const touchField = (fieldName: string) => {
    dispatch({ type: 'forms/touchField', payload: { formId, fieldName } })
  }

  const setSubmitting = (submitting: boolean) => {
    dispatch({ type: 'forms/setSubmitting', payload: { formId, submitting } })
  }

  const setFormOpen = (open: boolean) => {
    dispatch({ type: 'forms/setFormOpen', payload: { formId, open } })
  }

  const setFormError = (error: string | null) => {
    dispatch({ type: 'forms/setFormError', payload: { formId, error } })
  }

  const setFormSuccess = (success: boolean) => {
    dispatch({ type: 'forms/setFormSuccess', payload: { formId, success } })
  }

  const resetForm = (initialData?: Record<string, any>) => {
    dispatch({ type: 'forms/resetForm', payload: { formId, initialData } })
  }

  const clearForm = () => {
    dispatch({ type: 'forms/clearForm', payload: formId })
  }

  const getFormValues = () => {
    const values: Record<string, any> = {}
    Object.entries(formData).forEach(([fieldName, field]) => {
      values[fieldName] = field.value
    })
    return values
  }

  const getFormErrors = () => {
    const errors: Record<string, string> = {}
    Object.entries(formData).forEach(([fieldName, field]) => {
      if (field.error) {
        errors[fieldName] = field.error
      }
    })
    return errors
  }

  const hasErrors = () => {
    return Object.values(formData).some(field => field.error)
  }

  const isFormValid = () => {
    return valid && !hasErrors()
  }

  return {
    formData,
    submitting,
    valid,
    open,
    error,
    success,
    updateField,
    setFieldError,
    clearFieldError,
    touchField,
    setSubmitting,
    setFormOpen,
    setFormError,
    setFormSuccess,
    resetForm,
    clearForm,
    getFormValues,
    getFormErrors,
    hasErrors,
    isFormValid
  }
}

