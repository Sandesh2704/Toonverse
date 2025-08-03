"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Heart, Bookmark, Share2, Star, Eye, Clock, Users, BookOpen } from "lucide-react"
import type { Comic } from "@/types/comic"
import { toast } from "sonner"
import Link from "next/link"

interface ComicHeroProps {
  comic: Comic
}

export function ComicHero({ comic }: ComicHeroProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast.success(isLiked ? "Removed from liked" : "Added to liked")
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast.success(isBookmarked ? "Removed from wishlist" : "Added to wishlist")
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    toast.success(isFollowing ? "Unfollowed author" : "Following author")
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard!")
  }

  return (
    <section className="relative min-h-[60vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={comic.banner || comic.thumbnail} alt={comic.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
          {/* Comic Cover */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <Image
                src={comic.thumbnail || "/placeholder.svg"}
                alt={comic.title}
                width={300}
                height={400}
                className="rounded-lg shadow-2xl"
              />
              <Badge
                className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm"
                variant={comic.status === "completed" ? "default" : "secondary"}
              >
                {comic.status}
              </Badge>
            </div>
          </motion.div>

          {/* Comic Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 text-white space-y-6"
          >
            {/* Category */}
            <Badge variant="outline" className="text-white border-white/50 bg-white/10 backdrop-blur-sm">
              {comic.category}
            </Badge>

            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">{comic.title}</h1>

            {/* Author */}
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 border-2 border-white/20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{comic.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Link
                  href={`/writer/${comic.authorId}`}
                  className="text-lg font-semibold hover:text-primary transition-colors"
                >
                  {comic.author}
                </Link>
                <p className="text-white/70 text-sm">Creator</p>
              </div>
              <Button
                variant={isFollowing ? "secondary" : "outline"}
                size="sm"
                onClick={handleFollow}
                className={isFollowing ? "" : "text-white border-white/50 hover:bg-white hover:text-black"}
              >
                <Users className="mr-2 h-4 w-4" />
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 text-white/90">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg">{comic.rating}</span>
                <span className="text-white/70">(1,234 reviews)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>{comic.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>{comic.episodes.length || Math.floor(Math.random() * 50) + 1} episodes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Updated {new Date(comic.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-white/90 max-w-2xl leading-relaxed">{comic.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {comic.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-white border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href={`/episodes/ep${comic.id}-1`}>
                  <Play className="mr-2 h-5 w-5" />
                  Start Reading
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleLike}
                className={`text-white border-white/50 hover:bg-white hover:text-black ${
                  isLiked ? "bg-red-500 border-red-500 hover:bg-red-600" : ""
                }`}
              >
                <Heart className={`mr-2 h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Liked" : "Like"}
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleBookmark}
                className={`text-white border-white/50 hover:bg-white hover:text-black ${
                  isBookmarked ? "bg-blue-500 border-blue-500 hover:bg-blue-600" : ""
                }`}
              >
                <Bookmark className={`mr-2 h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
                {isBookmarked ? "Saved" : "Save"}
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleShare}
                className="text-white border-white/50 hover:bg-white hover:text-black bg-transparent"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
