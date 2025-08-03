export interface LoginCredentials {
  email: string
  password: string
  rememberMe: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export interface BecomeWriterData {
  bio: string
  socialLinks: {
    twitter?: string
    instagram?: string
    youtube?: string
    website?: string
  }
  portfolio: string
  experience: string
  genres: string[]
  motivation: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  token?: string
}

export interface UserFollow {
  id: string
  userId: string
  writerId: string
  writer: Writer
  followedAt: string
}

export interface UserLike {
  id: string
  userId: string
  comicId: string
  comic: Comic
  likedAt: string
}

export interface UserSave {
  id: string
  userId: string
  comicId: string
  comic: Comic
  savedAt: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordReset {
  token: string
  password: string
  confirmPassword: string
}

export interface ProfileUpdateData {
  name: string
  email: string
  bio?: string
  avatar?: string
  socialLinks?: {
    twitter?: string
    instagram?: string
    youtube?: string
    website?: string
  }
}

export interface UserSettings {
  id: string
  userId: string
  notifications: {
    newEpisodes: boolean
    writerUpdates: boolean
    comments: boolean
    system: boolean
    email: boolean
    push: boolean
  }
  privacy: {
    profileVisibility: "public" | "private" | "friends"
    showReadingHistory: boolean
    showLikedComics: boolean
    allowMessages: boolean
  }
  reading: {
    theme: "light" | "dark" | "sepia"
    fontSize: "small" | "medium" | "large"
    autoScroll: boolean
    pageTransition: "slide" | "fade" | "none"
  }
  language: string
  timezone: string
}

// Placeholder types for undeclared variables
type User = {}

type Writer = {}

type Comic = {}
