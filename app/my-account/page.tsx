"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Bookmark, Users, Settings, Edit, BarChart } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { ComicCard } from "@/components/comics/comic-card"
import { dummyComics } from "@/data/comics"
import { dummyWriters } from "@/data/writers"
import type { UserFollow, UserLike, UserSave } from "@/types/auth"
import Link from "next/link"
import Section from "@/components/shared/section"
import Liked from "@/components/my-account/liked"
import Following from "@/components/my-account/following"
import Saved from "@/components/my-account/saved"
import Channel from "@/components/my-account/channel"



export default function MyAccountPage() {
  const { user } = useAuth()
  const [followedWriters, setFollowedWriters] = useState<UserFollow[]>([])
  const [likedComics, setLikedComics] = useState<UserLike[]>([])
  const [savedComics, setSavedComics] = useState<UserSave[]>([])


  useEffect(() => {
    const fetchUserData = async () => {
   
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
            <Button>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }



  return (
    <Section>
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
            <TabsList className="grid w-full h-12 grid-cols-4">
              <TabsTrigger value="following" className="flex items-center cursor-pointer space-x-2">
                <Users className="h-4 w-4" />
                <span>Following ({followedWriters.length})</span>
              </TabsTrigger>
              <TabsTrigger value="liked" className="flex items-center cursor-pointer space-x-2">
                <Heart className="h-4 w-4" />
                <span>Liked ({likedComics.length})</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center cursor-pointer space-x-2">
                <Bookmark className="h-4 w-4" />
                <span>Saved ({savedComics.length})</span>
              </TabsTrigger>
              <TabsTrigger value="channel" className="flex items-center cursor-pointer space-x-2">
                <Bookmark className="h-4 w-4" />
                <span>Your Channel</span>
              </TabsTrigger>
            </TabsList>

            {/* Following Tab */}
            <TabsContent value="following">
            <Following/>
            </TabsContent>

            {/* Liked Tab */}
            <TabsContent value="liked">
             <Liked/>
            </TabsContent>

            {/* Saved Tab */}
            <TabsContent value="saved">
             <Saved/>
            </TabsContent>

            {/* Your Channel Tab with Sub-Tabs */}
            <TabsContent value="channel">
             <Channel/>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </Section>
  )
}