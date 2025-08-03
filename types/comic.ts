export interface Comic {
  id: string
  title: string
  description: string
  thumbnail: string
  banner?: string
  author: string
  authorId: string
  category: string
  status: "ongoing" | "completed" | "hiatus"
  rating: number
  views: number
  episodes: Episode[]
  tags: string[]
  createdAt: string
  updatedAt: string
  isApproved: boolean
}

export interface Episode {
  id: string
  comicId: string
  title: string
  episodeNumber: number
  content: string[]
  thumbnail: string
  views: number
  createdAt: string
  updatedAt: string
  isApproved: boolean
}

export interface Comment {
  id: string
  comicId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  rating?: number
  likes: number
  replies: Reply[]
  createdAt: string
  updatedAt: string
}

export interface Reply {
  id: string
  commentId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  likes: number
  createdAt: string
}
