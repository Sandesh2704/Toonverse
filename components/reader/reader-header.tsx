"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Menu, Maximize, Minimize, BookOpen, User } from "lucide-react"
import type { Comic, Episode } from "@/types/comic"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ReaderHeaderProps {
  comic: Comic
  episode: Episode
  currentPage: number
  totalPages: number
  onToggleSidebar: () => void
  onToggleFullscreen: () => void
  isFullscreen: boolean
}

export function ReaderHeader({
  comic,
  episode,
  currentPage,
  totalPages,
  onToggleSidebar,
  onToggleFullscreen,
  isFullscreen,
}: ReaderHeaderProps) {
  const router = useRouter()

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-white/10"
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="text-white hover:bg-white/10">
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden md:flex items-center space-x-3">
            <Link
              href={`/comics/${comic.id}`}
              className="flex items-center space-x-2 hover:text-primary transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span className="font-medium text-white">{comic.title}</span>
            </Link>

            <span className="text-white/50">•</span>

            <Badge variant="outline" className="text-white border-white/30">
              Episode {episode.episodeNumber}
            </Badge>

            <span className="text-white/70 text-sm">{episode.title}</span>
          </div>
        </div>

        {/* Center Section - Page Info */}
        <div className="flex items-center space-x-4">
          <div className="text-white text-sm font-medium">
            {currentPage + 1} / {totalPages}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          <Link href={`/writer/${comic.authorId}`}>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <User className="mr-2 h-4 w-4" />
              {comic.author}
            </Button>
          </Link>

          <Button variant="ghost" size="icon" onClick={onToggleFullscreen} className="text-white hover:bg-white/10">
            {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Info Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center justify-between text-sm">
          <Link href={`/comics/${comic.id}`} className="text-white hover:text-primary transition-colors truncate">
            {comic.title}
          </Link>
          <Badge variant="outline" className="text-white border-white/30 ml-2">
            Ep. {episode.episodeNumber}
          </Badge>
        </div>
      </div>
    </motion.header>
  )
}
