"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Bookmark, Users, Settings, Edit } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { ComicCard } from "@/components/comics/comic-card"
import { dummyComics } from "@/data/comics"
import { dummyWriters } from "@/data/writers"
import type { UserFollow, UserLike, UserSave } from "@/types/auth"
import Link from "next/link"

export default function MyAccountPage() {
  const { user } = useAuth()
  const [followedWriters, setFollowedWriters] = useState<UserFollow[]>([])
  const [likedComics, setLikedComics] = useState<UserLike[]>([])
  const [savedComics, setSavedComics] = useState<UserSave[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API calls to fetch user data
    const fetchUserData = async () => {
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock followed writers
      const mockFollows: UserFollow[] = dummyWriters.slice(0, 3).map((writer, index) => ({
        id: `follow-${index}`,
        userId: user?.id || "1",
        writerId: writer.id,
        writer,
        followedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      }))

      // Mock liked comics
      const mockLikes: UserLike[] = dummyComics.slice(0, 6).map((comic, index) => ({
        id: `like-${index}`,
        userId: user?.id || "1",
        comicId: comic.id,
        comic,
        likedAt: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString(),
      }))

      // Mock saved comics
      const mockSaves: UserSave[] = dummyComics.slice(3, 9).map((comic, index) => ({
        id: `save-${index}`,
        userId: user?.id || "1",
        comicId: comic.id,
        comic,
        savedAt: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString(),
      }))

      setFollowedWriters(mockFollows)
      setLikedComics(mockLikes)
      setSavedComics(mockSaves)
      setLoading(false)
    }

    if (user) {
      fetchUserData()
    }
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-4">Please log in to view your account</p>
            <Button asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleUnfollow = (writerId: string) => {
    setFollowedWriters((prev) => prev.filter((follow) => follow.writerId !== writerId))
  }

  const handleUnlike = (comicId: string) => {
    setLikedComics((prev) => prev.filter((like) => like.comicId !== comicId))
  }

  const handleUnsave = (comicId: string) => {
    setSavedComics((prev) => prev.filter((save) => save.comicId !== comicId))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-3xl font-bold">{user.name}</h1>
                      <p className="text-muted-foreground">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={user.role === "writer" ? "default" : "secondary"}>{user.role}</Badge>
                        <span className="text-sm text-muted-foreground">
                          Member since {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4 md:mt-0">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Tabs */}
          <Tabs defaultValue="following" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="following" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Following ({followedWriters.length})</span>
              </TabsTrigger>
              <TabsTrigger value="liked" className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Liked ({likedComics.length})</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center space-x-2">
                <Bookmark className="h-4 w-4" />
                <span>Saved ({savedComics.length})</span>
              </TabsTrigger>
            </TabsList>

            {/* Following Tab */}
            <TabsContent value="following">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Writers You Follow</span>
                  </CardTitle>
                  <CardDescription>Stay updated with your favorite creators</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <div className="animate-pulse bg-muted rounded-full h-16 w-16"></div>
                          <div className="flex-1 space-y-2">
                            <div className="animate-pulse bg-muted h-4 w-32 rounded"></div>
                            <div className="animate-pulse bg-muted h-3 w-48 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : followedWriters.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No writers followed yet</h3>
                      <p className="text-muted-foreground mb-4">Discover and follow your favorite comic creators</p>
                      <Button asChild>
                        <Link href="/community">Explore Writers</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {followedWriters.map((follow) => (
                        <motion.div
                          key={follow.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={follow.writer.avatar || "/placeholder.svg"} alt={follow.writer.name} />
                            <AvatarFallback>
                              {follow.writer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Link href={`/writer/${follow.writer.id}`}>
                                <h3 className="font-semibold hover:text-primary transition-colors">
                                  {follow.writer.name}
                                </h3>
                              </Link>
                              {follow.writer.isVerified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{follow.writer.bio}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                              <span>{follow.writer.followers.toLocaleString()} followers</span>
                              <span>{follow.writer.totalComics} comics</span>
                              <span>Followed {new Date(follow.followedAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <Button variant="outline" size="sm" onClick={() => handleUnfollow(follow.writerId)}>
                            Unfollow
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Liked Tab */}
            <TabsContent value="liked">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Comics You Liked</span>
                  </CardTitle>
                  <CardDescription>Your favorite comics and series</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="space-y-3">
                          <div className="animate-pulse bg-muted aspect-[3/4] rounded-lg"></div>
                          <div className="animate-pulse bg-muted h-4 w-3/4 rounded"></div>
                          <div className="animate-pulse bg-muted h-3 w-1/2 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : likedComics.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No liked comics yet</h3>
                      <p className="text-muted-foreground mb-4">Start exploring and like comics you enjoy</p>
                      <Button asChild>
                        <Link href="/">Discover Comics</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {likedComics.map((like) => (
                        <motion.div
                          key={like.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="relative group"
                        >
                          <ComicCard comic={like.comic} />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="destructive" onClick={() => handleUnlike(like.comicId)}>
                              Unlike
                            </Button>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            Liked {new Date(like.likedAt).toLocaleDateString()}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Saved Tab */}
            <TabsContent value="saved">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bookmark className="h-5 w-5" />
                    <span>Saved Comics</span>
                  </CardTitle>
                  <CardDescription>Comics saved for later reading</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="space-y-3">
                          <div className="animate-pulse bg-muted aspect-[3/4] rounded-lg"></div>
                          <div className="animate-pulse bg-muted h-4 w-3/4 rounded"></div>
                          <div className="animate-pulse bg-muted h-3 w-1/2 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : savedComics.length === 0 ? (
                    <div className="text-center py-8">
                      <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No saved comics yet</h3>
                      <p className="text-muted-foreground mb-4">Save comics to read them later</p>
                      <Button asChild>
                        <Link href="/">Browse Comics</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {savedComics.map((save) => (
                        <motion.div
                          key={save.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="relative group"
                        >
                          <ComicCard comic={save.comic} />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="destructive" onClick={() => handleUnsave(save.comicId)}>
                              Remove
                            </Button>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            Saved {new Date(save.savedAt).toLocaleDateString()}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
