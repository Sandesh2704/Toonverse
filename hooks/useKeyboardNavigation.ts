"use client"

import { useEffect } from "react"

interface UseKeyboardNavigationProps {
  onNextPage: () => void
  onPreviousPage: () => void
  onToggleFullscreen: () => void
  onToggleControls: () => void
  enabled?: boolean
}

export function useKeyboardNavigation({
  onNextPage,
  onPreviousPage,
  onToggleFullscreen,
  onToggleControls,
  enabled = true,
}: UseKeyboardNavigationProps) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for navigation keys
      if (["ArrowLeft", "ArrowRight", "Space", "f", "F", "Escape"].includes(e.key)) {
        e.preventDefault()
      }

      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          onPreviousPage()
          break
        case "ArrowRight":
        case "d":
        case "D":
        case " ": // Space bar
          onNextPage()
          break
        case "f":
        case "F":
          onToggleFullscreen()
          break
        case "h":
        case "H":
          onToggleControls()
          break
        case "Escape":
          // Handle escape key if needed
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [enabled, onNextPage, onPreviousPage, onToggleFullscreen, onToggleControls])
}
