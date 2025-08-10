"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronLeft, ChevronRight, SkipBack, SkipForward, BookOpen, Grid3X3, Scroll } from "lucide-react"
import type { Comic, Episode } from "@/types/comic"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ReaderControlsProps {
  episode: Episode
  comic: Comic
  currentPage: number
  totalPages: number
  readingMode: "single" | "double" | "scroll"
  onReadingModeChange: (mode: "single" | "double" | "scroll") => void
  onPageSelect: (page: number) => void
  onNextPage: () => void
  onPreviousPage: () => void
  nextEpisode: Episode | null
  previousEpisode: Episode | null
  progress: number
}

export function ReaderControls({
  episode,
  comic,
  currentPage,
  totalPages,
  readingMode,
  onReadingModeChange,
  onPageSelect,
  onNextPage,
  onPreviousPage,
  nextEpisode,
  previousEpisode,
  progress,
}: ReaderControlsProps) {
  const router = useRouter()

  const handleSliderChange = (value: number[]) => {
    onPageSelect(value[0])
  }

  const getReadingModeIcon = (mode: string) => {
    switch (mode) {
      case "single":
        return <BookOpen className="h-4 w-4" />
      case "double":
        return <Grid3X3 className="h-4 w-4" />
      case "scroll":
        return <Scroll className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getReadingModeLabel = (mode: string) => {
    switch (mode) {
      case "single":
        return "Single Page"
      case "double":
        return "Double Page"
      case "scroll":
        return "Scroll View"
      default:
        return "Single Page"
    }
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-t border-white/10"
    >
      <div className="px-4 py-4">
        {/* Progress Slider */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2 text-sm text-white/70">
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
            <span>{progress}% Complete</span>
          </div>
          <Slider
            value={[currentPage]}
            onValueChange={handleSliderChange}
            max={totalPages - 1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-between">
          {/* Left Controls - Episode Navigation */}
          <div className="flex items-center space-x-2">
            {previousEpisode ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/episodes/${previousEpisode.id}`)}
                className="text-white hover:bg-white/10"
              >
                <SkipBack className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Prev Episode</span>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" disabled className="text-white/50">
                <SkipBack className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Prev Episode</span>
              </Button>
            )}
          </div>

          {/* Center Controls - Page Navigation */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onPreviousPage}
              disabled={currentPage === 0}
              className="text-white hover:bg-white/10 disabled:text-white/30"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-white border-white/30 px-3 py-1">
                {currentPage + 1} / {totalPages}
              </Badge>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onNextPage}
              disabled={currentPage >= totalPages - 1}
              className="text-white hover:bg-white/10 disabled:text-white/30"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Right Controls - Settings and Next Episode */}
          <div className="flex items-center space-x-2">
            {/* Reading Mode Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger >
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  {getReadingModeIcon(readingMode)}
                  <span className="hidden sm:inline ml-2">{getReadingModeLabel(readingMode)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/90 border-white/20">
                <DropdownMenuItem
                  onClick={() => onReadingModeChange("single")}
                  className="text-white hover:bg-white/10"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Single Page
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onReadingModeChange("double")}
                  className="text-white hover:bg-white/10"
                >
                  <Grid3X3 className="mr-2 h-4 w-4" />
                  Double Page
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onReadingModeChange("scroll")}
                  className="text-white hover:bg-white/10"
                >
                  <Scroll className="mr-2 h-4 w-4" />
                  Scroll View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {nextEpisode ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/episodes/${nextEpisode.id}`)}
                className="text-white hover:bg-white/10"
              >
                <span className="hidden sm:inline">Next Episode</span>
                <SkipForward className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button variant="ghost" size="sm" disabled className="text-white/50">
                <span className="hidden sm:inline">Next Episode</span>
                <SkipForward className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Episode Info Bar */}
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Link href={`/comics/${comic.id}`} className="text-white hover:text-primary transition-colors">
                {comic.title}
              </Link>
              <span className="text-white/50">•</span>
              <span className="text-white/70">
                Episode {episode.episodeNumber}: {episode.title}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-white/70">
              <span>{episode.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
