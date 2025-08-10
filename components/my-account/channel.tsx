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
import WriterAnalyticsPage from "@/app/writer/analytics/page"
import WriterAnalytics from "./channel/writer-analytics"
import WriterDashboard from "@/app/writer/page"

// Mock analytics data type
interface UserAnalytics {
    totalViews: number
    totalLikes: number
    totalComments: number
    totalShares: number
    topComic: { id: string; title: string; views: number }
}


export default function Channel() {

    const { user } = useAuth()
    const [userPosts, setUserPosts] = useState<UserLike[]>([]) // For user's own comics
    const [analytics, setAnalytics] = useState<UserAnalytics | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const mockUserPosts: UserLike[] = user?.role === "writer"
                ? dummyComics
                    .filter((comic) => comic.writerId === user?.id) // Assuming comic has writerId
                    .slice(0, 6)
                    .map((comic, index) => ({
                        id: `post-${index}`,
                        userId: user?.id || "1",
                        comicId: comic.id,
                        comic,
                        likedAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
                    }))
                : []

            // Mock analytics data
            const mockAnalytics: UserAnalytics = {
                totalViews: 12500,
                totalLikes: 430,
                totalComments: 120,
                totalShares: 75,
                topComic: { id: "comic-1", title: "Top Comic Title", views: 5000 },
            }

            setUserPosts(mockUserPosts)
            setAnalytics(mockAnalytics)
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
                        <Button>
                            <Link href="/auth/login">Sign In</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Bookmark className="h-5 w-5" />
                    <span>Your Channel</span>
                </CardTitle>
                <CardDescription>Manage your posts and view analytics</CardDescription>
            </CardHeader>
            <CardContent>
                {user.role == "writer" ? (
                    <div className="text-center py-8">
                        <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Not a Writer</h3>
                        <p className="text-muted-foreground mb-4">Apply to become a writer to create and manage your comics</p>
                        <Button>
                            <Link href="/apply-writer">Apply as Writer</Link>
                        </Button>
                    </div>
                ) : (
                    <Tabs defaultValue="posts" className="space-y-4">
                        <TabsList className="grid w-full h-10 grid-cols-3">
                            <TabsTrigger value="posts" className="flex items-center space-x-2">
                                <Bookmark className="h-4 w-4" />
                                <span>Your Posts</span>
                            </TabsTrigger>
                            <TabsTrigger value="analytics" className="flex items-center space-x-2">
                                <BarChart className="h-4 w-4" />
                                <span>Analytics</span>
                            </TabsTrigger>

                            <TabsTrigger value="WriterDashboard" className="flex items-center space-x-2">
                                <BarChart className="h-4 w-4" />
                                <span>WriterDashboard</span>
                            </TabsTrigger>

                        </TabsList>

                        {/* Your Posts Sub-Tab */}
                        <TabsContent value="posts">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Your Posts</CardTitle>
                                    <CardDescription>Your published comics</CardDescription>
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
                                    ) : userPosts.length === 0 ? (
                                        <div className="text-center py-8">
                                            <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                            <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                                            <p className="text-muted-foreground mb-4">Start creating comics to share with your audience</p>
                                            <Button>
                                                <Link href="/create-comic">Create Comic</Link>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {userPosts.map((post) => (
                                                <motion.div
                                                    key={post.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="relative group"
                                                >
                                                    <ComicCard comic={post.comic} compact />
                                                    <div className="mt-2 text-xs text-muted-foreground">
                                                        Posted {new Date(post.likedAt).toLocaleDateString()}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Analytics Sub-Tab */}
                        <TabsContent value="analytics">
                            <WriterAnalytics />
                        </TabsContent>

                        <TabsContent value="WriterDashboard">
                            <WriterDashboard />
                            </TabsContent >

                    </Tabs>
                )}
            </CardContent>
        </Card>
    )
}
