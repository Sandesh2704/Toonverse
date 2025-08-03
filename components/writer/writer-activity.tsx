"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, BookOpen, Upload, Star } from "lucide-react"
import type { Writer } from "@/types/user"
import { motion } from "framer-motion"

interface WriterActivityProps {
  writer: Writer
}

export function WriterActivity({ writer }: WriterActivityProps) {
  // Mock activity data - in real app this would come from API
  const activities = [
    {
      id: "1",
      type: "episode_published",
      title: "Published Episode 16 of Shadow Realm Chronicles",
      description: "The Final Battle - An epic conclusion to the current arc",
      timestamp: "2 days ago",
      icon: Upload,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "2",
      type: "comic_updated",
      title: "Updated Neon City Nights",
      description: "Added new character designs and story outline",
      timestamp: "1 week ago",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "3",
      type: "milestone",
      title: "Reached 15K Followers!",
      description: "Thank you all for the amazing support",
      timestamp: "2 weeks ago",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      id: "4",
      type: "episode_published",
      title: "Published Episode 13 of Mystic Academy",
      description: "Hidden Powers - Secrets are revealed",
      timestamp: "3 weeks ago",
      icon: Upload,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "5",
      type: "announcement",
      title: "New Comic Series Announcement",
      description: "Working on an exciting new fantasy adventure!",
      timestamp: "1 month ago",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>

                <div className="flex-1 space-y-1">
                  <h4 className="font-medium text-sm">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                    <Badge variant="outline" className="text-xs">
                      {activity.type.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-6">
            <button className="text-sm text-primary hover:underline">View All Activity</button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
