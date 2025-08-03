"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Users, BookOpen, Eye, CheckCircle, Star } from "lucide-react"
import Link from "next/link"

const featuredWriters = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "@sarahchen_art",
    avatar: "/placeholder.svg?height=80&width=80&text=SC",
    bio: "Fantasy comic creator with 5+ years of experience. Love creating magical worlds and strong characters.",
    verified: true,
    followers: 15600,
    comics: 8,
    totalViews: 2450000,
    rating: 4.9,
    genres: ["Fantasy", "Adventure"],
    latestComic: "Dragon's Legacy",
    isFollowing: false,
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    username: "@marcus_comics",
    avatar: "/placeholder.svg?height=80&width=80&text=MR",
    bio: "Sci-fi enthusiast creating stories about the future. Passionate about technology and human connection.",
    verified: true,
    followers: 23400,
    comics: 12,
    totalViews: 3890000,
    rating: 4.8,
    genres: ["Sci-Fi", "Thriller"],
    latestComic: "Neon Horizons",
    isFollowing: true,
  },
  {
    id: "3",
    name: "Emma Thompson",
    username: "@emma_draws",
    avatar: "/placeholder.svg?height=80&width=80&text=ET",
    bio: "Romance and slice-of-life storyteller. Creating heartwarming stories that connect with readers.",
    verified: false,
    followers: 8900,
    comics: 6,
    totalViews: 1230000,
    rating: 4.7,
    genres: ["Romance", "Slice of Life"],
    latestComic: "Coffee Shop Chronicles",
    isFollowing: false,
  },
  {
    id: "4",
    name: "Kenji Nakamura",
    username: "@kenji_manga",
    avatar: "/placeholder.svg?height=80&width=80&text=KN",
    bio: "Traditional manga artist bringing Japanese storytelling to global audiences. Master of action sequences.",
    verified: true,
    followers: 34500,
    comics: 15,
    totalViews: 5670000,
    rating: 4.9,
    genres: ["Action", "Supernatural"],
    latestComic: "Spirit Blade",
    isFollowing: false,
  },
  {
    id: "5",
    name: "Zoe Williams",
    username: "@zoe_creates",
    avatar: "/placeholder.svg?height=80&width=80&text=ZW",
    bio: "Horror and mystery comic creator. Specializing in psychological thrillers and dark narratives.",
    verified: true,
    followers: 19200,
    comics: 9,
    totalViews: 2890000,
    rating: 4.6,
    genres: ["Horror", "Mystery"],
    latestComic: "Midnight Whispers",
    isFollowing: true,
  },
  {
    id: "6",
    name: "Alex Kim",
    username: "@alex_webtoons",
    avatar: "/placeholder.svg?height=80&width=80&text=AK",
    bio: "Comedy and adventure webtoon artist. Creating fun, lighthearted stories for all ages.",
    verified: false,
    followers: 12800,
    comics: 7,
    totalViews: 1890000,
    rating: 4.8,
    genres: ["Comedy", "Adventure"],
    latestComic: "Quest Buddies",
    isFollowing: false,
  },
]

export function WritersSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [followingStates, setFollowingStates] = useState<Record<string, boolean>>(
    featuredWriters.reduce(
      (acc, writer) => ({
        ...acc,
        [writer.id]: writer.isFollowing,
      }),
      {},
    ),
  )
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const itemsPerView = 3
  const maxIndex = Math.max(0, featuredWriters.length - itemsPerView)

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const handleFollow = (writerId: string) => {
    setFollowingStates((prev) => ({
      ...prev,
      [writerId]: !prev[writerId],
    }))
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Featured Writers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover talented creators and their amazing stories. Follow your favorite writers to stay updated with
              their latest work.
            </p>
          </motion.div>
        </div>

        {/* Writers Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Writers Container */}
          <div className="overflow-hidden">
            <motion.div
              ref={scrollContainerRef}
              className="flex gap-6"
              animate={{
                x: `-${currentIndex * (100 / itemsPerView)}%`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: `${(featuredWriters.length / itemsPerView) * 100}%` }}
            >
              {featuredWriters.map((writer, index) => (
                <motion.div
                  key={writer.id}
                  className="flex-shrink-0"
                  style={{ width: `${100 / featuredWriters.length}%` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      {/* Writer Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                            <AvatarImage src={writer.avatar || "/placeholder.svg"} alt={writer.name} />
                            <AvatarFallback className="text-lg font-semibold">
                              {writer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-bold text-lg">{writer.name}</h3>
                              {writer.verified && <CheckCircle className="w-5 h-5 text-blue-600" />}
                            </div>
                            <p className="text-sm text-muted-foreground">{writer.username}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{writer.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={followingStates[writer.id] ? "outline" : "default"}
                          onClick={() => handleFollow(writer.id)}
                          className="shrink-0"
                        >
                          {followingStates[writer.id] ? "Following" : "Follow"}
                        </Button>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{writer.bio}</p>

                      {/* Genres */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {writer.genres.map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Users className="w-4 h-4 text-primary" />
                          </div>
                          <p className="text-sm font-semibold">
                            {writer.followers >= 1000 ? `${(writer.followers / 1000).toFixed(1)}K` : writer.followers}
                          </p>
                          <p className="text-xs text-muted-foreground">Followers</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <BookOpen className="w-4 h-4 text-primary" />
                          </div>
                          <p className="text-sm font-semibold">{writer.comics}</p>
                          <p className="text-xs text-muted-foreground">Comics</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Eye className="w-4 h-4 text-primary" />
                          </div>
                          <p className="text-sm font-semibold">
                            {writer.totalViews >= 1000000
                              ? `${(writer.totalViews / 1000000).toFixed(1)}M`
                              : `${(writer.totalViews / 1000).toFixed(0)}K`}
                          </p>
                          <p className="text-xs text-muted-foreground">Views</p>
                        </div>
                      </div>

                      {/* Latest Comic */}
                      <div className="border-t pt-4">
                        <p className="text-xs text-muted-foreground mb-1">Latest Comic:</p>
                        <p className="font-medium text-sm mb-3">{writer.latestComic}</p>

                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1" asChild>
                            <Link href={`/writer/${writer.id}`}>View Profile</Link>
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                            <Link href={`/writer/${writer.id}/comics`}>View Comics</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Writers Button */}
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/writers">
              <Users className="w-5 h-5 mr-2" />
              View All Writers
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
