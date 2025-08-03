export interface DemoComic {
  id: string
  title: string
  author: string
  authorId: string
  description: string
  thumbnail: string
  category: string
  status: "ongoing" | "completed" | "hiatus"
  rating: number
  views: number
  likes: number
  episodeCount: number
  createdAt: string
  updatedAt: string
  tags: string[]
  episodes: DemoEpisode[]
}

export interface DemoEpisode {
  id: string
  comicId: string
  title: string
  episodeNumber: number
  thumbnail: string
  pages: DemoPage[]
  views: number
  likes: number
  publishedAt: string
  isPublished: boolean
}

export interface DemoPage {
  id: string
  episodeId: string
  pageNumber: number
  imageUrl: string
  altText?: string
}

export const demoComics: DemoComic[] = [
  {
    id: "1",
    title: "Dragon's Legacy",
    author: "Sarah Chen",
    authorId: "author-1",
    description: "A young warrior discovers their connection to ancient dragons in a world where magic is forbidden.",
    thumbnail: "/placeholder.svg?height=300&width=200&text=Dragon's+Legacy",
    category: "Fantasy",
    status: "ongoing",
    rating: 4.8,
    views: 125000,
    likes: 8500,
    episodeCount: 24,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-03-01T15:30:00Z",
    tags: ["dragons", "magic", "adventure", "medieval"],
    episodes: [
      {
        id: "ep-1-1",
        comicId: "1",
        title: "The Awakening",
        episodeNumber: 1,
        thumbnail: "/placeholder.svg?height=200&width=300&text=Episode+1",
        views: 15000,
        likes: 1200,
        publishedAt: "2024-01-15T10:00:00Z",
        isPublished: true,
        pages: [
          {
            id: "page-1-1-1",
            episodeId: "ep-1-1",
            pageNumber: 1,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+1",
          },
          {
            id: "page-1-1-2",
            episodeId: "ep-1-1",
            pageNumber: 2,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+2",
          },
          {
            id: "page-1-1-3",
            episodeId: "ep-1-1",
            pageNumber: 3,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+3",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Neon Dreams",
    author: "Alex Rodriguez",
    authorId: "author-2",
    description: "In a cyberpunk future, a hacker uncovers a conspiracy that threatens the digital world.",
    thumbnail: "/placeholder.svg?height=300&width=200&text=Neon+Dreams",
    category: "Sci-Fi",
    status: "ongoing",
    rating: 4.6,
    views: 98000,
    likes: 7200,
    episodeCount: 18,
    createdAt: "2024-01-20T14:00:00Z",
    updatedAt: "2024-02-28T12:15:00Z",
    tags: ["cyberpunk", "hacking", "future", "technology"],
    episodes: [
      {
        id: "ep-2-1",
        comicId: "2",
        title: "Digital Shadows",
        episodeNumber: 1,
        thumbnail: "/placeholder.svg?height=200&width=300&text=Episode+1",
        views: 12000,
        likes: 950,
        publishedAt: "2024-01-20T14:00:00Z",
        isPublished: true,
        pages: [
          {
            id: "page-2-1-1",
            episodeId: "ep-2-1",
            pageNumber: 1,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+1",
          },
          {
            id: "page-2-1-2",
            episodeId: "ep-2-1",
            pageNumber: 2,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+2",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Hearts Entwined",
    author: "Emma Thompson",
    authorId: "author-3",
    description: "A heartwarming romance between two college students from different worlds.",
    thumbnail: "/placeholder.svg?height=300&width=200&text=Hearts+Entwined",
    category: "Romance",
    status: "completed",
    rating: 4.9,
    views: 156000,
    likes: 12000,
    episodeCount: 32,
    createdAt: "2023-12-01T09:00:00Z",
    updatedAt: "2024-02-14T18:00:00Z",
    tags: ["college", "romance", "slice-of-life", "drama"],
    episodes: [
      {
        id: "ep-3-1",
        comicId: "3",
        title: "First Meeting",
        episodeNumber: 1,
        thumbnail: "/placeholder.svg?height=200&width=300&text=Episode+1",
        views: 18000,
        likes: 1500,
        publishedAt: "2023-12-01T09:00:00Z",
        isPublished: true,
        pages: [
          {
            id: "page-3-1-1",
            episodeId: "ep-3-1",
            pageNumber: 1,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+1",
          },
          {
            id: "page-3-1-2",
            episodeId: "ep-3-1",
            pageNumber: 2,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+2",
          },
          {
            id: "page-3-1-3",
            episodeId: "ep-3-1",
            pageNumber: 3,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+3",
          },
          {
            id: "page-3-1-4",
            episodeId: "ep-3-1",
            pageNumber: 4,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+4",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Shadow Warrior",
    author: "Kenji Nakamura",
    authorId: "author-4",
    description: "An elite ninja seeks revenge against those who destroyed his clan.",
    thumbnail: "/placeholder.svg?height=300&width=200&text=Shadow+Warrior",
    category: "Action",
    status: "ongoing",
    rating: 4.7,
    views: 203000,
    likes: 15000,
    episodeCount: 45,
    createdAt: "2023-11-15T16:00:00Z",
    updatedAt: "2024-03-05T20:30:00Z",
    tags: ["ninja", "revenge", "martial-arts", "historical"],
    episodes: [
      {
        id: "ep-4-1",
        comicId: "4",
        title: "The Last Survivor",
        episodeNumber: 1,
        thumbnail: "/placeholder.svg?height=200&width=300&text=Episode+1",
        views: 25000,
        likes: 2100,
        publishedAt: "2023-11-15T16:00:00Z",
        isPublished: true,
        pages: [
          {
            id: "page-4-1-1",
            episodeId: "ep-4-1",
            pageNumber: 1,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+1",
          },
          {
            id: "page-4-1-2",
            episodeId: "ep-4-1",
            pageNumber: 2,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+2",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    title: "The Missing Heir",
    author: "Detective Morgan",
    authorId: "author-5",
    description: "A detective investigates the disappearance of a wealthy family's heir.",
    thumbnail: "/placeholder.svg?height=300&width=200&text=The+Missing+Heir",
    category: "Mystery",
    status: "ongoing",
    rating: 4.5,
    views: 87000,
    likes: 6300,
    episodeCount: 16,
    createdAt: "2024-02-01T11:00:00Z",
    updatedAt: "2024-02-25T14:45:00Z",
    tags: ["detective", "investigation", "crime", "thriller"],
    episodes: [
      {
        id: "ep-5-1",
        comicId: "5",
        title: "The Case Begins",
        episodeNumber: 1,
        thumbnail: "/placeholder.svg?height=200&width=300&text=Episode+1",
        views: 8500,
        likes: 650,
        publishedAt: "2024-02-01T11:00:00Z",
        isPublished: true,
        pages: [
          {
            id: "page-5-1-1",
            episodeId: "ep-5-1",
            pageNumber: 1,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+1",
          },
          {
            id: "page-5-1-2",
            episodeId: "ep-5-1",
            pageNumber: 2,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+2",
          },
          {
            id: "page-5-1-3",
            episodeId: "ep-5-1",
            pageNumber: 3,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+3",
          },
        ],
      },
    ],
  },
  {
    id: "6",
    title: "Midnight Terrors",
    author: "R.L. Blackwood",
    authorId: "author-6",
    description: "Supernatural horror stories that will keep you awake at night.",
    thumbnail: "/placeholder.svg?height=300&width=200&text=Midnight+Terrors",
    category: "Horror",
    status: "hiatus",
    rating: 4.3,
    views: 45000,
    likes: 3200,
    episodeCount: 8,
    createdAt: "2024-01-10T22:00:00Z",
    updatedAt: "2024-01-30T19:15:00Z",
    tags: ["supernatural", "horror", "ghosts", "paranormal"],
    episodes: [
      {
        id: "ep-6-1",
        comicId: "6",
        title: "The Haunted House",
        episodeNumber: 1,
        thumbnail: "/placeholder.svg?height=200&width=300&text=Episode+1",
        views: 6500,
        likes: 420,
        publishedAt: "2024-01-10T22:00:00Z",
        isPublished: true,
        pages: [
          {
            id: "page-6-1-1",
            episodeId: "ep-6-1",
            pageNumber: 1,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+1",
          },
        ],
      },
    ],
  },
  {
    id: "7",
    title: "Laugh Out Loud",
    author: "Comedy Central",
    authorId: "author-7",
    description: "Hilarious daily adventures of a group of friends.",
    thumbnail: "/placeholder.svg?height=300&width=200&text=Laugh+Out+Loud",
    category: "Comedy",
    status: "ongoing",
    rating: 4.4,
    views: 112000,
    likes: 8900,
    episodeCount: 28,
    createdAt: "2023-12-15T13:00:00Z",
    updatedAt: "2024-02-20T16:20:00Z",
    tags: ["friendship", "humor", "daily-life", "comedy"],
    episodes: [
      {
        id: "ep-7-1",
        comicId: "7",
        title: "The Prank War Begins",
        episodeNumber: 1,
        thumbnail: "/placeholder.svg?height=200&width=300&text=Episode+1",
        views: 11000,
        likes: 890,
        publishedAt: "2023-12-15T13:00:00Z",
        isPublished: true,
        pages: [
          {
            id: "page-7-1-1",
            episodeId: "ep-7-1",
            pageNumber: 1,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+1",
          },
          {
            id: "page-7-1-2",
            episodeId: "ep-7-1",
            pageNumber: 2,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+2",
          },
        ],
      },
    ],
  },
  {
    id: "8",
    title: "Coffee Shop Chronicles",
    author: "Daily Life Writer",
    authorId: "author-8",
    description: "Heartwarming stories from a small neighborhood coffee shop.",
    thumbnail: "/placeholder.svg?height=300&width=200&text=Coffee+Shop+Chronicles",
    category: "Slice of Life",
    status: "ongoing",
    rating: 4.6,
    views: 78000,
    likes: 5800,
    episodeCount: 21,
    createdAt: "2024-01-05T08:00:00Z",
    updatedAt: "2024-02-18T10:30:00Z",
    tags: ["coffee", "neighborhood", "heartwarming", "community"],
    episodes: [
      {
        id: "ep-8-1",
        comicId: "8",
        title: "Opening Day",
        episodeNumber: 1,
        thumbnail: "/placeholder.svg?height=200&width=300&text=Episode+1",
        views: 9200,
        likes: 720,
        publishedAt: "2024-01-05T08:00:00Z",
        isPublished: true,
        pages: [
          {
            id: "page-8-1-1",
            episodeId: "ep-8-1",
            pageNumber: 1,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+1",
          },
          {
            id: "page-8-1-2",
            episodeId: "ep-8-1",
            pageNumber: 2,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+2",
          },
          {
            id: "page-8-1-3",
            episodeId: "ep-8-1",
            pageNumber: 3,
            imageUrl: "/placeholder.svg?height=800&width=600&text=Page+3",
          },
        ],
      },
    ],
  },
]
