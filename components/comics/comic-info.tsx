"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Tag, TrendingUp, Award } from "lucide-react"
import type { Comic } from "@/types/comic"
import { motion } from "framer-motion"

interface ComicInfoProps {
  comic: Comic
}

export function ComicInfo({ comic }: ComicInfoProps) {
  const completionPercentage = comic.status === "completed" ? 100 : Math.floor(Math.random() * 80) + 20

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Comic Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status and Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Badge variant={comic.status === "completed" ? "default" : "secondary"}>{comic.status}</Badge>
            </div>
            {comic.status !== "completed" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>
            )}
          </div>

          {/* Publication Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">First Published</p>
                <p className="text-sm text-muted-foreground">{new Date(comic.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-muted-foreground">{new Date(comic.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Category and Tags */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Category</p>
                <Badge variant="outline">{comic.category}</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {comic.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{comic.rating}</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{comic.views.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Views</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{Math.floor(Math.random() * 5000) + 1000}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
