"use client"

import { motion } from "framer-motion"
import { ComicCard } from "@/components/comics/comic-card"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export function LatestSection() {
  const { latest } = useSelector((state: RootState) => state.comics)

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Updates</h2>
              <p className="text-muted-foreground">Recently updated comics with new episodes</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/comics?sort=latest">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latest.map((comic, index) => (
            <motion.div
              key={comic.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ComicCard comic={comic} showUpdateBadge />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
