"use client"

import { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { demoComics } from "@/data/demoComics"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Eye, Edit, Trash2, Star, Heart, BookOpen } from "lucide-react"
import Image from "next/image"

export default function ComicsPage() {
  const { categories } = useSelector((state: RootState) => state.categories)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredComics = useMemo(() => {
    return demoComics.filter((comic) => {
      const matchesSearch =
        comic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comic.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || comic.category === selectedCategory
      const matchesStatus = selectedStatus === "all" || comic.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchTerm, selectedCategory, selectedStatus])

  const totalViews = demoComics.reduce((sum, comic) => sum + comic.views, 0)
  const totalLikes = demoComics.reduce((sum, comic) => sum + comic.likes, 0)
  const totalEpisodes = demoComics.reduce((sum, comic) => sum + comic.episodeCount, 0)
  const averageRating = demoComics.reduce((sum, comic) => sum + comic.rating, 0) / demoComics.length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-green-500"
      case "completed":
        return "bg-blue-500"
      case "hiatus":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Comics Management</h1>
          <p className="text-muted-foreground">Manage your comic collection and track performance</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Comic
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comics</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoComics.length}</div>
            <p className="text-xs text-muted-foreground">
              {demoComics.filter((c) => c.status === "ongoing").length} ongoing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalViews)}</div>
            <p className="text-xs text-muted-foreground">Across all comics</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalLikes)}</div>
            <p className="text-xs text-muted-foreground">{totalEpisodes} total episodes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Out of 5.0 stars</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Comics</CardTitle>
          <CardDescription>Search and filter your comic collection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search comics or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories
                  .filter((cat) => cat.isActive)
                  .map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="hiatus">Hiatus</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Comics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Comics ({filteredComics.length})</CardTitle>
          <CardDescription>Manage your comic collection</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Comic</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Episodes</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComics.map((comic) => (
                <TableRow key={comic.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={comic.thumbnail || "/placeholder.svg"}
                        alt={comic.title}
                        width={40}
                        height={60}
                        className="rounded object-cover"
                      />
                      <div>
                        <div className="font-medium">{comic.title}</div>
                        <div className="text-sm text-muted-foreground">{comic.description.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${comic.author.charAt(0)}`} />
                        <AvatarFallback>{comic.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {comic.author}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{comic.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(comic.status)}`} />
                      <span className="capitalize">{comic.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>{comic.episodeCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {comic.rating}
                    </div>
                  </TableCell>
                  <TableCell>{formatNumber(comic.views)}</TableCell>
                  <TableCell>{formatNumber(comic.likes)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
