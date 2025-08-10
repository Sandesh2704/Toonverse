"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Play, Eye, Clock, Search, Grid3X3, List, ChevronDown, Calendar } from "lucide-react"
import type { Episode } from "@/types/comic"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface EpisodeListProps {
  episodes: Episode[]
  comicId: string
}

export function EpisodeList({ episodes, comicId }: EpisodeListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">("newest")

  const filteredEpisodes = episodes
    .filter(
      (episode) =>
        episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.episodeNumber.toString().includes(searchTerm),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "popular":
          return b.views - a.views
        default:
          return 0
      }
    })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Play className="h-5 w-5 text-primary" />
              <span>Episodes ({episodes.length})</span>
            </CardTitle>

            <div className="flex items-center space-x-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search episodes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-48"
                />
              </div>

              {/* Sort */}
              <DropdownMenu>
                <DropdownMenuTrigger >
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Sort
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest First</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("oldest")}>Oldest First</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("popular")}>Most Popular</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Mode */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredEpisodes.length === 0 ? (
            <div className="text-center py-12">
              <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Episodes Found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try adjusting your search terms." : "Episodes will appear here once they're published."}
              </p>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
              {filteredEpisodes.map((episode, index) => (
                <motion.div
                  key={episode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {viewMode === "grid" ? <EpisodeCardGrid episode={episode} /> : <EpisodeCardList episode={episode} />}
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function EpisodeCardGrid({ episode }: { episode: Episode }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <Link href={`/episodes/${episode.id}`}>
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={episode.thumbnail || "/placeholder.svg"}
            alt={episode.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button size="sm" className="bg-white text-black hover:bg-gray-100">
              <Play className="mr-2 h-4 w-4" />
              Read Now
            </Button>
          </div>
          <Badge className="absolute top-2 left-2 bg-primary/90 backdrop-blur-sm">
            Episode {episode.episodeNumber}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">{episode.title}</h3>
          <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{episode.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{new Date(episode.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

function EpisodeCardList({ episode }: { episode: Episode }) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <Link href={`/episodes/${episode.id}`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-shrink-0">
              <Image
                src={episode.thumbnail || "/placeholder.svg"}
                alt={episode.title}
                width={120}
                height={80}
                className="rounded object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded">
                <Play className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Badge variant="outline" className="text-xs">
                  Episode {episode.episodeNumber}
                </Badge>
                {episode.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    New
                  </Badge>
                )}
              </div>

              <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">{episode.title}</h3>

              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{episode.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(episode.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="flex-shrink-0 bg-transparent">
              <Play className="mr-2 h-4 w-4" />
              Read
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
