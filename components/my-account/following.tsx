"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { dummyWriters } from "@/data/writers"
import type { UserFollow, } from "@/types/auth"
import Link from "next/link"

// Mock analytics data type
interface UserAnalytics {
    totalViews: number
    totalLikes: number
    totalComments: number
    totalShares: number
    topComic: { id: string; title: string; views: number }
}

export default function Following() {
    const { user } = useAuth()
    const [followedWriters, setFollowedWriters] = useState<UserFollow[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Mock followed writers
            const mockFollows: UserFollow[] = dummyWriters.slice(0, 3).map((writer, index) => ({
                id: `follow-${index}`,
                userId: user?.id || "1",
                writerId: writer.id,
                writer,
                followedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            }))




            setFollowedWriters(mockFollows)
        }

        if (user) {
            fetchUserData()
        }
    }, [user])



    const handleUnfollow = (writerId: string) => {
        setFollowedWriters((prev) => prev.filter((follow) => follow.writerId !== writerId))
    }




    return (
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
                        <Button>
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
    )
}
