export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  isAuthenticated: boolean
  createdAt: string
  updatedAt: string
}

export type UserRole = "reader" | "writer" | "maintainer" | "admin" | "super_admin"

export interface Writer extends User {
  bio: string,
  username: string,
  rating: number,
  isFollowing: boolean,
  isVerified: boolean,
  genres: string[]
  latestComic?: string
  stats?: {
    monthlyViews: number,
    weeklyFollowers: number,
    engagementRate: number,
  } ,
  achievements?: string[]
  socialLinks: {
    twitter?: string
    instagram?: string
    youtube?: string
    website?: string,
    patreon?: string,
     artstation?: string,
      webtoon?:string,
      tapas?: string,
      pixiv?: string,
      other?: string,
       gumroad?:string
  }
  followers: number
  totalComics: number
  totalViews: number,
  languages?: string[]
  country?: string
  joinDate?: string
}

export interface ReadingHistory {
  id: string
  userId: string
  comicId: string
  episodeId: string
  progress: number
  lastReadAt: string
}

export interface UserPreferences {
  id: string
  userId: string
  categories: string[]
  notifications: {
    newEpisodes: boolean
    writerUpdates: boolean
    comments: boolean
    system: boolean
  }
  readingMode: "light" | "dark" | "sepia"
}
