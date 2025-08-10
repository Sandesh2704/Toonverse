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

// Mock analytics data type
interface UserAnalytics {
    totalViews: number
    totalLikes: number
    totalComments: number
    totalShares: number
    topComic: { id: string; title: string; views: number }
}


export default function Liked() {

    const { user } = useAuth()
    const [likedComics, setLikedComics] = useState<UserLike[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))


            // Mock liked comics
            const mockLikes: UserLike[] = dummyComics.slice(0, 6).map((comic, index) => ({
                id: `like-${index}`,
                userId: user?.id || "1",
                comicId: comic.id,
                comic,
                likedAt: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString(),
            }))



            setLikedComics(mockLikes)
            setLoading(false)
        }

        if (user) {
            fetchUserData()
        }
    }, [user])



    const handleUnlike = (comicId: string) => {
        setLikedComics((prev) => prev.filter((like) => like.comicId !== comicId))
    }



    return (
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
                        <Button>
                            <Link href="/">Discover Comics</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {likedComics.map((like) => (
                            <motion.div
                                className="relative group"
                                key={like.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <ComicCard comic={like.comic} compact />
                                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
    )
}
