"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Star, Heart, MessageSquare } from "lucide-react"
import type { Writer } from "@/types/user"
import type { Comic } from "@/types/comic"
import { motion } from "framer-motion"

interface WriterStatsProps {
  writer: Writer
  comics: Comic[]
}

export function WriterStats({ writer, comics }: WriterStatsProps) {
  const avgRating = comics.length > 0 ? comics.reduce((acc, comic) => acc + comic.rating, 0) / comics.length : 0

  const totalEpisodes = comics.reduce((acc, comic) => acc + (comic.episodes?.length || 0), 0)
  const completedComics = comics.filter((comic) => comic.status === "completed").length
  const completionRate = comics.length > 0 ? (completedComics / comics.length) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span>Performance Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Average Rating */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Average Rating</span>
              </div>
              <span className="text-sm font-bold">{avgRating.toFixed(1)}/5.0</span>
            </div>
            <Progress value={avgRating * 20} className="h-2" />
          </div>

          {/* Engagement Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Engagement Rate</span>
              </div>
              <span className="text-sm font-bold">8.5%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>

          {/* Completion Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Completion Rate</span>
              </div>
              <span className="text-sm font-bold">{completionRate.toFixed(0)}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{totalEpisodes}</p>
              <p className="text-xs text-muted-foreground">Total Episodes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{completedComics}</p>
              <p className="text-xs text-muted-foreground">Completed Series</p>
            </div>
          </div>

          {/* Monthly Growth */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Monthly Growth</p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Followers</span>
                <span className="text-green-600">+12.5%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Views</span>
                <span className="text-green-600">+8.3%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Engagement</span>
                <span className="text-green-600">+15.7%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
