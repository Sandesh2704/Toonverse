"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Eye, Heart, BookOpen, Clock, TrendingUp, Bookmark, Play } from "lucide-react"
import type { Comic } from "@/types/comic"
import { toast } from "sonner"

interface ComicCardProps {
  comic: Comic
  featured?: boolean
  showRank?: number
  showUpdateBadge?: boolean
  compact?: boolean
}

export function ComicCard({
  comic,
  featured = false,
  showRank,
  showUpdateBadge = false,
  compact = false,
}: ComicCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLiked(!isLiked)
    toast.success(isLiked ? "Removed from liked" : "Added to liked")
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsBookmarked(!isBookmarked)
    toast.success(isBookmarked ? "Removed from wishlist" : "Added to wishlist")
  }

  if (compact) {
    return (
      <Card className="comic-card group overflow-hidden">
        <Link href={`/comics/${comic.id}`}>
          <div className="flex space-x-3 p-3">
            <div className="relative flex-shrink-0">
              <Image
                src={comic.thumbnail || "/placeholder.svg"}
                alt={comic.title}
                width={60}
                height={80}
                className="rounded object-cover"
              />
              {showRank && (
                <Badge className="absolute -top-2 -left-2 h-6 w-6 rounded-full p-0 text-xs">{showRank}</Badge>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                {comic.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{comic.description}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{comic.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{comic.views > 1000 ? `${Math.floor(comic.views / 1000)}k` : comic.views}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {comic.status}
                </Badge>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    )
  }

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="comic-card group overflow-hidden h-full">
        <div className="relative">
          <Link href={`/comics/${comic.id}`}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={comic.thumbnail || "/placeholder.svg"}
                alt={comic.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                  <Play className="mr-2 h-4 w-4" />
                  Read Now
                </Button>
              </div>

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col space-y-1">
                {featured && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">Featured</Badge>
                )}
                {showUpdateBadge && (
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    <Clock className="mr-1 h-3 w-3" />
                    Updated
                  </Badge>
                )}
                {showRank && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                    <TrendingUp className="mr-1 h-3 w-3" />#{showRank}
                  </Badge>
                )}
              </div>

              {/* Action buttons */}
              <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button size="icon" variant="secondary" className="h-8 w-8" onClick={handleLike}>
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8" onClick={handleBookmark}>
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-blue-500 text-blue-500" : ""}`} />
                </Button>
              </div>

              {/* Status badge */}
              <div className="absolute bottom-2 left-2">
                <Badge variant={comic.status === "completed" ? "default" : "secondary"}>{comic.status}</Badge>
              </div>
            </div>
          </Link>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Title and Author */}
            <div>
              <Link href={`/comics/${comic.id}`}>
                <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">{comic.title}</h3>
              </Link>
              <Link href={`/writer/${comic.authorId}`}>
                <p className="text-sm text-muted-foreground hover:text-primary transition-colors">by {comic.author}</p>
              </Link>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">{comic.description}</p>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{comic.rating}</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span>{comic.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{comic.episodes.length || Math.floor(Math.random() * 50) + 1}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {comic.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {comic.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{comic.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
