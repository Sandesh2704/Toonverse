"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import { ComicReader } from "@/components/reader/comic-reader"
import { ReaderHeader } from "@/components/reader/reader-header"
import { ReaderControls } from "@/components/reader/reader-controls"
import { ReaderSidebar } from "@/components/reader/reader-sidebar"
import { ReadingProgressBar } from "@/components/reader/reading-progress-bar"
import { dummyEpisodes } from "@/data/episodes"
import { dummyComics } from "@/data/comics"
import type { Episode, Comic } from "@/types/comic"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import { updateReadingProgress } from "@/store/userSlice"

export default function EpisodeReaderPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const episodeId = params.episodeId as string

  const [episode, setEpisode] = useState<Episode | null>(null)
  const [comic, setComic] = useState<Comic | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [readingMode, setReadingMode] = useState<"single" | "double" | "scroll">("single")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [loading, setLoading] = useState(true)
  const [autoHideTimer, setAutoHideTimer] = useState<NodeJS.Timeout | null>(null)

  const { user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const fetchEpisodeData = async () => {
      setLoading(true)

      // Find episode by ID
      const foundEpisode = dummyEpisodes.find((e) => e.id === episodeId)
      if (foundEpisode) {
        setEpisode(foundEpisode)

        // Find the comic this episode belongs to
        const foundComic = dummyComics.find((c) => c.id === foundEpisode.comicId)
        if (foundComic) {
          setComic(foundComic)
        }
      }

      setLoading(false)
    }

    fetchEpisodeData()
  }, [episodeId])

  // Auto-hide controls
  useEffect(() => {
    const resetTimer = () => {
      if (autoHideTimer) clearTimeout(autoHideTimer)
      setShowControls(true)

      const timer = setTimeout(() => {
        if (isFullscreen) {
          setShowControls(false)
        }
      }, 3000)

      setAutoHideTimer(timer)
    }

    const handleMouseMove = () => resetTimer()
    const handleKeyPress = () => resetTimer()

    if (isFullscreen) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("keydown", handleKeyPress)
      resetTimer()
    }

    return () => {
      if (autoHideTimer) clearTimeout(autoHideTimer)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [isFullscreen, autoHideTimer])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!episode) return

      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault()
          handlePreviousPage()
          break
        case "ArrowRight":
        case "d":
        case "D":
        case " ":
          e.preventDefault()
          handleNextPage()
          break
        case "f":
        case "F":
          e.preventDefault()
          toggleFullscreen()
          break
        case "Escape":
          if (isFullscreen) {
            setIsFullscreen(false)
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [episode, currentPage, isFullscreen])

  // Update reading progress
  useEffect(() => {
    if (episode && user && currentPage >= 0) {
      const progress = Math.round((currentPage / (episode.content.length - 1)) * 100)
      dispatch(
        updateReadingProgress({
          episodeId: episode.id,
          comicId: episode.comicId,
          progress,
          currentPage,
          lastReadAt: new Date().toISOString(),
        }),
      )
    }
  }, [currentPage, episode, user, dispatch])

  const handleNextPage = () => {
    if (!episode) return

    if (readingMode === "double") {
      setCurrentPage(Math.min(currentPage + 2, episode.content.length - 1))
    } else {
      setCurrentPage(Math.min(currentPage + 1, episode.content.length - 1))
    }
  }

  const handlePreviousPage = () => {
    if (readingMode === "double") {
      setCurrentPage(Math.max(currentPage - 2, 0))
    } else {
      setCurrentPage(Math.max(currentPage - 1, 0))
    }
  }

  const handlePageSelect = (pageIndex: number) => {
    setCurrentPage(pageIndex)
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    setIsFullscreen(!isFullscreen)
  }

  const getNextEpisode = () => {
    if (!episode || !comic) return null
    const allEpisodes = dummyEpisodes.filter((e) => e.comicId === comic.id)
    const currentIndex = allEpisodes.findIndex((e) => e.id === episode.id)
    return currentIndex < allEpisodes.length - 1 ? allEpisodes[currentIndex + 1] : null
  }

  const getPreviousEpisode = () => {
    if (!episode || !comic) return null
    const allEpisodes = dummyEpisodes.filter((e) => e.comicId === comic.id)
    const currentIndex = allEpisodes.findIndex((e) => e.id === episode.id)
    return currentIndex > 0 ? allEpisodes[currentIndex - 1] : null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading episode...</p>
        </div>
      </div>
    )
  }

  if (!episode || !comic) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-2">Episode Not Found</h1>
          <p className="text-gray-400 mb-4">The episode you're looking for doesn't exist.</p>
          <button onClick={() => router.back()} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80">
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const progress = Math.round((currentPage / (episode.content.length - 1)) * 100)

  return (
    <div className={`min-h-screen bg-black text-white ${isFullscreen ? "fixed inset-0 z-50" : ""}`}>
      {/* Reading Progress Bar */}
      <ReadingProgressBar progress={progress} />

      {/* Header */}
      <AnimatePresence>
        {showControls && (
          <ReaderHeader
            comic={comic}
            episode={episode}
            currentPage={currentPage}
            totalPages={episode.content.length}
            onToggleSidebar={() => setShowSidebar(!showSidebar)}
            onToggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
          />
        )}
      </AnimatePresence>

      {/* Main Reader */}
      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <ReaderSidebar
              comic={comic}
              episode={episode}
              currentPage={currentPage}
              onPageSelect={handlePageSelect}
              onClose={() => setShowSidebar(false)}
            />
          )}
        </AnimatePresence>

        {/* Reader Content */}
        <div className="flex-1">
          <ComicReader
            episode={episode}
            currentPage={currentPage}
            readingMode={readingMode}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            onPageClick={() => setShowControls(!showControls)}
          />
        </div>
      </div>

      {/* Bottom Controls */}
      <AnimatePresence>
        {showControls && (
          <ReaderControls
            episode={episode}
            comic={comic}
            currentPage={currentPage}
            totalPages={episode.content.length}
            readingMode={readingMode}
            onReadingModeChange={setReadingMode}
            onPageSelect={handlePageSelect}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            nextEpisode={getNextEpisode()}
            previousEpisode={getPreviousEpisode()}
            progress={progress}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
