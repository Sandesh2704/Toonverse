"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ComicHero } from "@/components/comics/comic-hero"
import { ComicInfo } from "@/components/comics/comic-info"
import { EpisodeList } from "@/components/comics/episode-list"
import { CommentSection } from "@/components/comics/comment-section"
import { RelatedComics } from "@/components/comics/related-comics"
import { dummyComics } from "@/data/comics"
import { dummyEpisodes } from "@/data/episodes"
import { dummyComments } from "@/data/comments"
import type { Comic } from "@/types/comic"
import type { Episode, Comment } from "@/types/comic"
import { motion } from "framer-motion"
import Section from "@/components/shared/section"

export default function ComicDetailPage() {
  const params = useParams()
  const comicId = params.comicId as string
  const [comic, setComic] = useState<Comic | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchComicData = async () => {
      setLoading(true)

      // Find comic by ID
      const foundComic = dummyComics.find((c) => c.id === comicId)
      if (foundComic) {
        setComic(foundComic)
        const comicEpisodes = dummyEpisodes.filter((e) => e.comicId === comicId)
        setEpisodes(comicEpisodes)
        const comicComments = dummyComments.filter((c) => c.comicId === comicId)
        setComments(comicComments)
      }
      setLoading(false)
    }

    fetchComicData()
  }, [comicId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">

        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading comic details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!comic) {
    return (
      <div className="min-h-screen bg-background">

        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Comic Not Found</h1>
            <p className="text-muted-foreground">The comic you're looking for doesn't exist.</p>
          </div>
        </div>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">


      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <ComicHero comic={comic} />

        <Section className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <ComicInfo comic={comic} />
              <EpisodeList episodes={episodes} comicId={comicId} />
              <CommentSection comments={comments} comicId={comicId} onCommentsUpdate={setComments} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <RelatedComics currentComicId={comicId} category={comic.category} />
            </div>
          </div>
        </Section>
      </motion.main>


    </div>
  )
}
