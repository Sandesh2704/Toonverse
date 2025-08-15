"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, MoreHorizontal, Edit, Eye, Trash2, BookOpen, Clock, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"

const comics = [
  {
    id: "1",
    title: "Shadow Realm Chronicles",
    status: "published",
    episodes: 15,
    views: 125000,
    rating: 4.8,
    followers: 2340,
    lastUpdated: "2 days ago",
    thumbnail: "/default-image/comic2.jpg?height=120&width=90&text=Comic+1",
    category: "Fantasy",
    progress: 85,
  },
  {
    id: "2",
    title: "Neon City Nights",
    status: "draft",
    episodes: 8,
    views: 0,
    rating: 0,
    followers: 0,
    lastUpdated: "1 week ago",
    thumbnail: "/default-image/comic2.jpg?height=120&width=90&text=Comic+2",
    category: "Sci-Fi",
    progress: 60,
  },
  {
    id: "3",
    title: "Mystic Academy",
    status: "pending",
    episodes: 12,
    views: 0,
    rating: 0,
    followers: 0,
    lastUpdated: "3 days ago",
    thumbnail: "/default-image/comic2.jpg?height=120&width=90&text=Comic+3",
    category: "Fantasy",
    progress: 75,
  },
  {
    id: "4",
    title: "Urban Legends",
    status: "published",
    episodes: 22,
    views: 89000,
    rating: 4.6,
    followers: 1890,
    lastUpdated: "1 day ago",
    thumbnail: "/default-image/comic2.jpg?height=120&width=90&text=Comic+4",
    category: "Supernatural",
    progress: 90,
  },
]

export default function WriterComicsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredComics = comics.filter((comic) => {
    const matchesSearch = comic.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || comic.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleDeleteComic = (comicId: string) => {
    toast.success("Comic deleted successfully")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Comics</h1>
          <p className="text-muted-foreground">Manage your comic series and episodes</p>
        </div>
        <Button >
          <Link href="/writer/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Comic
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{comics.length}</p>
                <p className="text-xs text-muted-foreground">Total Comics</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {comics.reduce((acc, comic) => acc + comic.views, 0).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {comics.reduce((acc, comic) => acc + comic.followers, 0).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Total Followers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{comics.filter((c) => c.status === "published").length}</p>
                <p className="text-xs text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search comics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Comics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComics.map((comic, index) => (
          <motion.div
            key={comic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={comic.thumbnail || "/default-image/comic2.jpg"}
                  alt={comic.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge className={getStatusColor(comic.status)}>{comic.status}</Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger >
                      <Button variant="ghost" size="icon" className="bg-black/50 hover:bg-black/70 text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem >
                        <Link href={`/writer/comics/${comic.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      {comic.status === "published" && (
                        <DropdownMenuItem >
                          <Link href={`/comics/${comic.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Public
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleDeleteComic(comic.id)} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold line-clamp-1">{comic.title}</h3>
                    <p className="text-sm text-muted-foreground">{comic.category}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{comic.episodes} episodes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span>{comic.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{comic.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{comic.lastUpdated}</span>
                    </div>
                  </div>

                  {comic.status === "published" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Performance</span>
                        <span>{comic.progress}%</span>
                      </div>
                      <Progress value={comic.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1" >
                      <Link href={`/writer/comics/${comic.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Manage
                      </Link>
                    </Button>
                    {comic.status === "published" && (
                      <Button size="sm" variant="outline" >
                        <Link href={`/comics/${comic.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredComics.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Comics Found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm || selectedStatus !== "all"
                ? "Try adjusting your search or filters"
                : "You haven't created any comics yet"}
            </p>
            <Button >
              <Link href="/writer/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Comic
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
