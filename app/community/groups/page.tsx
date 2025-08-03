"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, Plus, Crown, Lock, Globe, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const groupCategories = [
  { id: "all", name: "All Groups" },
  { id: "manga", name: "Manga" },
  { id: "comics", name: "Comics" },
  { id: "art", name: "Art & Design" },
  { id: "writing", name: "Writing" },
  { id: "publishing", name: "Publishing" },
  { id: "networking", name: "Networking" },
]

const groups = [
  {
    id: 1,
    name: "Manga Artists United",
    description:
      "A community for manga creators to share techniques, get feedback, and collaborate on projects. We focus on traditional and digital manga creation.",
    members: 1247,
    avatar: "/placeholder.svg?height=64&width=64",
    banner: "/placeholder.svg?height=200&width=400",
    category: "manga",
    privacy: "public",
    isJoined: false,
    isOwner: false,
    activity: "Very Active",
    lastPost: "2 hours ago",
    tags: ["manga", "art", "collaboration"],
    featured: true,
  },
  {
    id: 2,
    name: "Indie Comic Creators",
    description:
      "Supporting independent comic creators with resources, networking opportunities, and collaborative projects.",
    members: 892,
    avatar: "/placeholder.svg?height=64&width=64",
    banner: "/placeholder.svg?height=200&width=400",
    category: "comics",
    privacy: "public",
    isJoined: true,
    isOwner: false,
    activity: "Active",
    lastPost: "5 hours ago",
    tags: ["indie", "comics", "publishing"],
    featured: false,
  },
  {
    id: 3,
    name: "Digital Art Techniques",
    description:
      "Learn and share digital art techniques specifically for comic and manga creation. From basics to advanced workflows.",
    members: 2156,
    avatar: "/placeholder.svg?height=64&width=64",
    banner: "/placeholder.svg?height=200&width=400",
    category: "art",
    privacy: "public",
    isJoined: false,
    isOwner: false,
    activity: "Very Active",
    lastPost: "1 hour ago",
    tags: ["digital-art", "techniques", "tutorials"],
    featured: true,
  },
  {
    id: 4,
    name: "Story Writers Circle",
    description:
      "A private group for serious writers to share drafts, provide detailed critiques, and improve storytelling skills.",
    members: 156,
    avatar: "/placeholder.svg?height=64&width=64",
    banner: "/placeholder.svg?height=200&width=400",
    category: "writing",
    privacy: "private",
    isJoined: false,
    isOwner: false,
    activity: "Moderate",
    lastPost: "1 day ago",
    tags: ["writing", "critique", "storytelling"],
    featured: false,
  },
  {
    id: 5,
    name: "Publishing Success Network",
    description:
      "Connect with successful publishers and learn the ins and outs of getting your work published and marketed effectively.",
    members: 634,
    avatar: "/placeholder.svg?height=64&width=64",
    banner: "/placeholder.svg?height=200&width=400",
    category: "publishing",
    privacy: "public",
    isJoined: true,
    isOwner: true,
    activity: "Active",
    lastPost: "3 hours ago",
    tags: ["publishing", "marketing", "business"],
    featured: false,
  },
  {
    id: 6,
    name: "Beginner Friendly Comics",
    description:
      "A welcoming space for newcomers to comic creation. Get started with basic tips, tools, and encouragement from the community.",
    members: 1834,
    avatar: "/placeholder.svg?height=64&width=64",
    banner: "/placeholder.svg?height=200&width=400",
    category: "comics",
    privacy: "public",
    isJoined: false,
    isOwner: false,
    activity: "Very Active",
    lastPost: "30 minutes ago",
    tags: ["beginner", "comics", "learning"],
    featured: true,
  },
]

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("members")

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || group.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const myGroups = groups.filter((group) => group.isJoined)
  const featuredGroups = groups.filter((group) => group.featured)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community Groups</h1>
          <p className="text-muted-foreground">Join groups to connect with like-minded creators and collaborate</p>
        </div>
        <Button asChild>
          <Link href="/community/groups/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Group
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
                placeholder="Search groups..."
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
                  {groupCategories.map((category) => (
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
                  <SelectItem value="members">Most Members</SelectItem>
                  <SelectItem value="activity">Most Active</SelectItem>
                  <SelectItem value="recent">Recently Created</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Groups</TabsTrigger>
          <TabsTrigger value="my-groups">My Groups ({myGroups.length})</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <div className="relative">
                    <div
                      className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"
                      style={{
                        backgroundImage: `url(${group.banner})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <Avatar className="absolute -bottom-6 left-4 h-12 w-12 border-4 border-background">
                      <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
                      <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {group.featured && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500 text-yellow-900">
                        <Star className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="pt-8">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <div className="flex items-center gap-1">
                        {group.privacy === "private" ? (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        )}
                        {group.isOwner && <Crown className="h-4 w-4 text-yellow-500" />}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {group.members.toLocaleString()}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {group.activity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="line-clamp-3">{group.description}</CardDescription>
                    <div className="flex flex-wrap gap-1">
                      {group.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last post: {group.lastPost}</span>
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button className="w-full" variant={group.isJoined ? "outline" : "default"} asChild>
                      <Link href={`/community/groups/${group.id}`}>{group.isJoined ? "View Group" : "Join Group"}</Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-groups" className="space-y-4">
          {myGroups.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No groups joined yet</h3>
                <p className="text-muted-foreground mb-4">Join groups to connect with other creators and collaborate</p>
                <Button asChild>
                  <Link href="/community/groups">Browse Groups</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myGroups.map((group, index) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <div className="relative">
                      <div
                        className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"
                        style={{
                          backgroundImage: `url(${group.banner})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <Avatar className="absolute -bottom-6 left-4 h-12 w-12 border-4 border-background">
                        <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
                        <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {group.isOwner && (
                        <Badge className="absolute top-2 right-2 bg-yellow-500 text-yellow-900">
                          <Crown className="mr-1 h-3 w-3" />
                          Owner
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="pt-8">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {group.members.toLocaleString()}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {group.activity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="line-clamp-3">{group.description}</CardDescription>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Last post: {group.lastPost}</span>
                      </div>
                    </CardContent>
                    <div className="p-4 pt-0">
                      <Button className="w-full" asChild>
                        <Link href={`/community/groups/${group.id}`}>View Group</Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <div className="relative">
                    <div
                      className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"
                      style={{
                        backgroundImage: `url(${group.banner})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <Avatar className="absolute -bottom-6 left-4 h-12 w-12 border-4 border-background">
                      <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
                      <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Badge className="absolute top-2 right-2 bg-yellow-500 text-yellow-900">
                      <Star className="mr-1 h-3 w-3" />
                      Featured
                    </Badge>
                  </div>
                  <CardHeader className="pt-8">
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {group.members.toLocaleString()}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {group.activity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="line-clamp-3">{group.description}</CardDescription>
                    <div className="flex flex-wrap gap-1">
                      {group.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last post: {group.lastPost}</span>
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button className="w-full" variant={group.isJoined ? "outline" : "default"} asChild>
                      <Link href={`/community/groups/${group.id}`}>{group.isJoined ? "View Group" : "Join Group"}</Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
