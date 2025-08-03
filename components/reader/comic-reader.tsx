"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Episode } from "@/types/comic"

interface ComicReaderProps {
  episode: Episode
  currentPage: number
  readingMode: "single" | "double" | "scroll"
  onNextPage: () => void
  onPreviousPage: () => void
  onPageClick: () => void
}

export function ComicReader({
  episode,
  currentPage,
  readingMode,
  onNextPage,
  onPreviousPage,
  onPageClick,
}: ComicReaderProps) {
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showZoomControls, setShowZoomControls] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Reset zoom and position when page changes
  useEffect(() => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [currentPage])

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      setZoom((prev) => Math.max(0.5, Math.min(3, prev + delta)))
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleImageClick = (e: React.MouseEvent) => {
    if (zoom > 1) return // Don't navigate when zoomed

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const centerX = rect.width / 2

    if (clickX < centerX) {
      onPreviousPage()
    } else {
      onNextPage()
    }
  }

  const zoomIn = () => setZoom((prev) => Math.min(3, prev + 0.2))
  const zoomOut = () => setZoom((prev) => Math.max(0.5, prev - 0.2))
  const resetZoom = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  if (readingMode === "scroll") {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="space-y-2">
          {episode.content.map((page, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative w-full"
            >
              <Image
                src={page || "/placeholder.svg"}
                alt={`Page ${index + 1}`}
                width={800}
                height={1200}
                className="w-full h-auto rounded-lg shadow-lg"
                priority={index < 3}
              />
              <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">{index + 1}</div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  const getCurrentPages = () => {
    if (readingMode === "double") {
      return [
        episode.content[currentPage],
        currentPage + 1 < episode.content.length ? episode.content[currentPage + 1] : null,
      ]
    }
    return [episode.content[currentPage]]
  }

  const pages = getCurrentPages()

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "pointer" }}
      onMouseEnter={() => setShowZoomControls(true)}
      onMouseLeave={() => setShowZoomControls(false)}
    >
      {/* Navigation Arrows */}
      <AnimatePresence>
        {zoom <= 1 && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onPreviousPage}
                disabled={currentPage === 0}
                className="h-12 w-12 bg-black/50 hover:bg-black/70 text-white border border-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onNextPage}
                disabled={currentPage >= episode.content.length - 1}
                className="h-12 w-12 bg-black/50 hover:bg-black/70 text-white border border-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Zoom Controls */}
      <AnimatePresence>
        {showZoomControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 right-4 z-10 flex space-x-2"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={zoomOut}
              disabled={zoom <= 0.5}
              className="h-10 w-10 bg-black/50 hover:bg-black/70 text-white border border-white/20"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetZoom}
              className="h-10 w-10 bg-black/50 hover:bg-black/70 text-white border border-white/20"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={zoomIn}
              disabled={zoom >= 3}
              className="h-10 w-10 bg-black/50 hover:bg-black/70 text-white border border-white/20"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <div
        ref={imageRef}
        className="flex items-center justify-center space-x-4"
        style={{
          transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
          transition: isDragging ? "none" : "transform 0.2s ease-out",
        }}
      >
        <AnimatePresence mode="wait">
          {pages.map(
            (page, index) =>
              page && (
                <motion.div
                  key={`${currentPage}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                  onClick={zoom <= 1 ? handleImageClick : undefined}
                >
                  <Image
                    src={page || "/placeholder.svg"}
                    alt={`Page ${currentPage + index + 1}`}
                    width={600}
                    height={900}
                    className="max-h-[90vh] w-auto rounded-lg shadow-2xl"
                    priority
                    draggable={false}
                  />

                  {/* Page Number */}
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentPage + index + 1} / {episode.content.length}
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>

      {/* Click Areas for Navigation (when not zoomed) */}
      {zoom <= 1 && (
        <>
          <div className="absolute left-0 top-0 w-1/3 h-full z-5 cursor-pointer" onClick={onPreviousPage} />
          <div className="absolute right-0 top-0 w-1/3 h-full z-5 cursor-pointer" onClick={onNextPage} />
          <div className="absolute left-1/3 top-0 w-1/3 h-full z-5 cursor-pointer" onClick={onPageClick} />
        </>
      )}

      {/* Zoom Level Indicator */}
      {zoom !== 1 && (
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {Math.round(zoom * 100)}%
        </div>
      )}
    </div>
  )
}
