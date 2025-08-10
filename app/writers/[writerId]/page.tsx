"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { WriterHero } from "@/components/writer/writer-hero"
import { WriterInfo } from "@/components/writer/writer-info"
import { WriterComics } from "@/components/writer/writer-comics"
import { WriterStats } from "@/components/writer/writer-stats"
import { WriterActivity } from "@/components/writer/writer-activity"
import { dummyComics } from "@/data/comics"
import { dummyWriters } from "@/data/writers"
import type { Writer } from "@/types/user"
import type { Comic } from "@/types/comic"
import Section from "@/components/shared/section"

export default function WriterProfilePage() {
  const params = useParams()
  const writerId = params.writerId as string
  const [writer, setWriter] = useState<Writer | null>(null)
  const [writerComics, setWriterComics] = useState<Comic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWriterData = async () => {
      setLoading(true)

      // Find writer by ID
      const foundWriter = dummyWriters.find((w) => w.id === writerId)
      if (foundWriter) {
        setWriter(foundWriter)

        // Get comics by this writer
        const comics = dummyComics.filter((c) => c.authorId === writerId)
        setWriterComics(comics)
      }

      setLoading(false)
    }

    fetchWriterData()
  }, [writerId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
      
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading writer profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!writer) {
    return (
      <div className="min-h-screen bg-background">
     
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Writer Not Found</h1>
            <p className="text-muted-foreground">The writer you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Section className="py-16">
    

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <WriterHero writer={writer} />

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <WriterComics comics={writerComics} writerId={writerId} />
              <WriterActivity writer={writer} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <WriterInfo writer={writer} />
              <WriterStats writer={writer} comics={writerComics} />
            </div>
          </div>
        </div>
      </motion.main>

    </Section>
  )
}
