"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Pin, TrendingUp, Clock, Search, Plus, Eye, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const forumCategories = [
  {
    id: "general",
    name: "General Discussion",
    description: "General topics about comic creation and the community",
    topics: 1247,
    posts: 8932,
    lastPost: {
      title: "Welcome new members!",
      author: "Admin",
      time: "2 hours ago",
    },
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "tips",
    name: "Writing Tips",
    description: "Share and learn writing techniques and storytelling methods",
    topics: 892,
    posts: 5643,
    lastPost: {
      title: "Character development in short stories",
      author: "Sarah Chen",
      time: "1 hour ago",
    },
    color: "bg-green-100 text-green-800",
  },
  {
    id: "art",
    name: "Art & Design",
    description: "Discuss art techniques, tools, and visual storytelling",
    topics: 1156,
    posts: 7234,
    lastPost: {
      title: "Digital vs traditional art workflows",
      author: "Mike Rodriguez",
      time: "3 hours ago",
    },
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "publishing",
    name: "Publishing Help",
    description: "Get help with publishing, marketing, and distribution",
    topics: 634,
    posts: 3421,
    lastPost: {
      title: "Self-publishing platforms comparison",
      author: "Emma Wilson",
      time: "5 hours ago",
    },
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: "announcements",
    name: "Announcements",
    description: "Official announcements and platform updates",
    topics: 45,
    posts: 234,
    lastPost: {
      title: "New community features released!",
      author: "InkSaga Team",
      time: "1 day ago",
    },
    color: "bg-red-100 text-red-800",
  },
]

const recentTopics = [
  {
    id: 1,
    title: "Best practices for character development in manga",
    author: "Sarah Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    category: "Writing Tips",
    replies: 23,
    views: 456,
    likes: 12,
    lastActivity: "2 hours ago",
    isPinned: false,
    isHot: true,
    tags: ["character", "development", "manga"],
  },
  {
    id: 2,
    title: "Community Guidelines - Please Read",
    author: "Admin",
    avatar: "/placeholder.svg?height=32&width=32",
    category: "Announcements",
    replies: 5,
    views: 1234,
    likes: 45,
    lastActivity: "1 day ago",
    isPinned: true,
    isHot: false,
    tags: ["guidelines", "rules"],
  },
  {
    id: 3,
    title: "Looking for feedback on my new comic series",
    author: "Mike Rodriguez",
    avatar: "/placeholder.svg?height=32&width=32",
    category: "General Discussion",
    replies: 15,
    views: 234,
    likes: 8,
    lastActivity: "4 hours ago",
    isPinned: false,
    isHot: false,
    tags: ["feedback", "comic", "series"],
  },
  {
    id: 4,
    title: "Digital art tools comparison - Procreate vs Photoshop",
    author: "Emma Wilson",
    avatar: "/placeholder.svg?height=32&width=32",
    category: "Art & Design",
    replies: 31,
    views: 789,
    likes: 19,
    lastActivity: "6 hours ago",
    isPinned: false,
    isHot: true,
    tags: ["digital-art", "tools", "comparison"],
  },
]

export default function ForumsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community Forums</h1>
          <p className="text-muted-foreground">Discuss, share knowledge, and connect with fellow creators</p>
        </div>
        <Button asChild>
          <Link href="/community/forums/new">
            <Plus className="mr-2 h-4 w-4" />
            New Topic
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {forumCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="replies">Most Replies</SelectItem>
                  <SelectItem value="views">Most Views</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="recent">Recent Topics</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4">
            {forumCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={category.color}>{category.name}</Badge>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{category.topics} topics</span>
                            <span>{category.posts} posts</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-3">{category.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">Latest:</span>
                          <Link href={`/community/forums/${category.id}`} className="font-medium hover:text-primary">
                            {category.lastPost.title}
                          </Link>
                          <span className="text-muted-foreground">
                            by {category.lastPost.author} • {category.lastPost.time}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href={`/community/forums/${category.id}`}>View Topics</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="space-y-4">
            {recentTopics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={topic.avatar || "/placeholder.svg"} alt={topic.author} />
                      <AvatarFallback>{topic.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        {topic.isPinned && <Pin className="h-4 w-4 text-primary" />}
                        <Link href={`/community/forums/topic/${topic.id}`} className="font-medium hover:text-primary">
                          {topic.title}
                        </Link>
                        {topic.isHot && (
                          <Badge variant="destructive" className="text-xs">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            Hot
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>by {topic.author}</span>
                        <Badge variant="secondary">{topic.category}</Badge>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {topic.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {topic.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {topic.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {topic.lastActivity}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {topic.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
