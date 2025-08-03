"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ComicCard } from "@/components/comics/comic-card"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import { dummyComics } from "@/data/comics"
import Link from "next/link"

interface RelatedComicsProps {
  currentComicId: string
  category: string
}

export function RelatedComics({ currentComicId, category }: RelatedComicsProps) {
  const relatedComics = dummyComics
    .filter((comic) => comic.id !== currentComicId && comic.category === category)
    .slice(0, 3)

  const recommendedComics = dummyComics
    .filter((comic) => comic.id !== currentComicId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Related Comics */}
      {relatedComics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">More in {category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {relatedComics.map((comic) => (
                <ComicCard key={comic.id} comic={comic} compact />
              ))}
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href={`/comics/categories/${category.toLowerCase()}`}>
                  View All {category} Comics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Recommended Comics */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>Recommended for You</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendedComics.map((comic) => (
              <ComicCard key={comic.id} comic={comic} compact />
            ))}
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/comics">
                Discover More Comics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Platform Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">1,234</p>
                <p className="text-xs text-muted-foreground">Total Comics</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">45K</p>
                <p className="text-xs text-muted-foreground">Active Readers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">892</p>
                <p className="text-xs text-muted-foreground">Writers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">23K</p>
                <p className="text-xs text-muted-foreground">Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
