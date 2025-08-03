"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Award, TrendingUp } from "lucide-react"
import type { Writer } from "@/types/user"
import { motion } from "framer-motion"

interface WriterInfoProps {
  writer: Writer
}

export function WriterInfo({ writer }: WriterInfoProps) {
  const joinDate = new Date(writer.createdAt)
  const yearsActive = new Date().getFullYear() - joinDate.getFullYear()

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Writer Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Join Date */}
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Member Since</p>
              <p className="text-sm text-muted-foreground">
                {joinDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Years Active */}
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Years Active</p>
              <p className="text-sm text-muted-foreground">
                {yearsActive === 0 ? "Less than a year" : `${yearsActive} year${yearsActive > 1 ? "s" : ""}`}
              </p>
            </div>
          </div>

          {/* Specialties */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Specialties</p>
            <div className="flex flex-wrap gap-1">
              {/* Determine specialties based on writer's work */}
              <Badge variant="outline" className="text-xs">
                Fantasy
              </Badge>
              <Badge variant="outline" className="text-xs">
                Adventure
              </Badge>
              {writer.name.includes("Maya") && (
                <Badge variant="outline" className="text-xs">
                  Sci-Fi
                </Badge>
              )}
              {writer.name.includes("Elena") && (
                <Badge variant="outline" className="text-xs">
                  Magic
                </Badge>
              )}
              {writer.name.includes("Hiroshi") && (
                <Badge variant="outline" className="text-xs">
                  Supernatural
                </Badge>
              )}
            </div>
          </div>

          {/* Content Rating */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Content Rating</p>
            <Badge variant="secondary">Teen+</Badge>
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Languages</p>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                English
              </Badge>
              {writer.name.includes("Akira") || writer.name.includes("Hiroshi") ? (
                <Badge variant="outline" className="text-xs">
                  Japanese
                </Badge>
              ) : null}
              {writer.name.includes("Elena") && (
                <Badge variant="outline" className="text-xs">
                  Spanish
                </Badge>
              )}
            </div>
          </div>

          {/* Update Frequency */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Update Schedule</p>
            <p className="text-sm text-muted-foreground">Weekly updates</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
