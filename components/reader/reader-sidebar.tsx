"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { X, Eye, Calendar } from "lucide-react"
import type { Comic, Episode } from "@/types/comic"
import { dummyEpisodes } from "@/data/episodes"
import Image from "next/image"
import Link from "next/link"

interface ReaderSidebarProps {
  comic: Comic
  episode: Episode
  currentPage: number
  onPageSelect: (page: number) => void
  onClose: () => void
}

export function ReaderSidebar({ comic, episode, currentPage, onPageSelect, onClose }: ReaderSidebarProps) {
  const allEpisodes = dummyEpisodes.filter((e) => e.comicId === comic.id)

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 bottom-0 w-80 bg-black/95 backdrop-blur-sm border-r border-white/10 z-50"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-white font-semibold">Reader Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Comic Info */}
            <div className="space-y-3">
              <h3 className="text-white font-medium">Current Comic</h3>
              <Link
                href={`/comics/${comic.id}`}
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Image
                  src={comic.thumbnail || "/placeholder.svg"}
                  alt={comic.title}
                  width={48}
                  height={64}
                  className="rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{comic.title}</p>
                  <p className="text-white/70 text-sm">by {comic.author}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs text-white border-white/30">
                      {comic.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs text-white border-white/30">
                      {comic.status}
                    </Badge>
                  </div>
                </div>
              </Link>
            </div>

            {/* Current Episode Pages */}
            <div className="space-y-3">
              <h3 className="text-white font-medium">Pages</h3>
              <div className="grid grid-cols-3 gap-2">
                {episode.content.map((page, index) => (
                  <button
                    key={index}
                    onClick={() => onPageSelect(index)}
                    className={`relative aspect-[3/4] rounded overflow-hidden border-2 transition-colors ${
                      index === currentPage ? "border-primary" : "border-white/20 hover:border-white/40"
                    }`}
                  >
                    <Image src={page || "/placeholder.svg"} alt={`Page ${index + 1}`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">{index + 1}</span>
                    </div>
                    {index === currentPage && <div className="absolute inset-0 bg-primary/20" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Episode List */}
            <div className="space-y-3">
              <h3 className="text-white font-medium">All Episodes</h3>
              <div className="space-y-2">
                {allEpisodes.map((ep) => (
                  <Link
                    key={ep.id}
                    href={`/episodes/${ep.id}`}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      ep.id === episode.id ? "bg-primary/20 border border-primary/30" : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <Image
                      src={ep.thumbnail || "/placeholder.svg"}
                      alt={ep.title}
                      width={40}
                      height={60}
                      className="rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs text-white border-white/30">
                          Ep. {ep.episodeNumber}
                        </Badge>
                        {ep.id === episode.id && <Badge className="text-xs bg-primary">Current</Badge>}
                      </div>
                      <p className="text-white text-sm font-medium truncate">{ep.title}</p>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-white/70">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{ep.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(ep.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  )
}
