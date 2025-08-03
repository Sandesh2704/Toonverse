"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store"
import { updateReadingProgress } from "@/store/userSlice"

interface UseReadingProgressProps {
  episodeId: string
  comicId: string
  currentPage: number
  totalPages: number
}

export function useReadingProgress({ episodeId, comicId, currentPage, totalPages }: UseReadingProgressProps) {
  const dispatch = useDispatch()
  const { user, readingProgress } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (!user || currentPage < 0) return

    const progress = Math.round((currentPage / (totalPages - 1)) * 100)

    // Debounce progress updates
    const timer = setTimeout(() => {
      dispatch(
        updateReadingProgress({
          episodeId,
          comicId,
          progress,
          currentPage,
          lastReadAt: new Date().toISOString(),
        }),
      )
    }, 1000)

    return () => clearTimeout(timer)
  }, [currentPage, totalPages, episodeId, comicId, user, dispatch])

  return readingProgress[episodeId]
}
