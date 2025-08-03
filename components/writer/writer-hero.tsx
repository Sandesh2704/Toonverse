"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, BookOpen, Eye, Calendar, Share2, MessageSquare, CheckCircle, ExternalLink } from "lucide-react"
import type { Writer } from "@/types/user"
import { toast } from "sonner"
import Link from "next/link"

interface WriterHeroProps {
  writer: Writer
}

export function WriterHero({ writer }: WriterHeroProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(writer.followers)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    setFollowerCount((prev) => (isFollowing ? prev - 1 : prev + 1))
    toast.success(isFollowing ? "Unfollowed writer" : "Following writer")
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Profile link copied to clipboard!")
  }

  const handleMessage = () => {
    toast.info("Messaging feature coming soon!")
  }

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100&text=Pattern')] bg-repeat"></div>
      </div>

      <div className="relative container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Writer Avatar and Basic Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="relative mb-6">
              <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                <AvatarImage src={writer.avatar || "/placeholder.svg"} alt={writer.name} />
                <AvatarFallback className="text-2xl">{writer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {writer.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                  <CheckCircle className="h-5 w-5" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <h1 className="text-3xl font-bold">{writer.name}</h1>
                {writer.isVerified && (
                  <Badge className="bg-blue-100 text-blue-800">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">Comic Creator & Storyteller</p>
              <div className="flex items-center justify-center lg:justify-start space-x-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Joined {new Date(writer.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Writer Description */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">{writer.bio}</p>
            </div>

            {/* Social Links */}
            {Object.keys(writer.socialLinks).length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Connect</h3>
                <div className="flex flex-wrap gap-2">
                  {writer.socialLinks.twitter && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={writer.socialLinks.twitter} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Twitter
                      </Link>
                    </Button>
                  )}
                  {writer.socialLinks.instagram && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={writer.socialLinks.instagram} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Instagram
                      </Link>
                    </Button>
                  )}
                  {writer.socialLinks.youtube && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={writer.socialLinks.youtube} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        YouTube
                      </Link>
                    </Button>
                  )}
                  {writer.socialLinks.website && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={writer.socialLinks.website} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Website
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Stats and Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white/50 rounded-lg border">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <p className="text-2xl font-bold">{followerCount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div className="p-4 bg-white/50 rounded-lg border">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <p className="text-2xl font-bold">{writer.totalComics}</p>
                <p className="text-xs text-muted-foreground">Comics</p>
              </div>
              <div className="p-4 bg-white/50 rounded-lg border">
                <div className="flex items-center justify-center mb-2">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <p className="text-2xl font-bold">{(writer.totalViews / 1000).toFixed(0)}K</p>
                <p className="text-xs text-muted-foreground">Total Views</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleFollow}
                className={`w-full ${isFollowing ? "bg-secondary hover:bg-secondary/80 text-secondary-foreground" : ""}`}
                variant={isFollowing ? "secondary" : "default"}
              >
                <Users className="mr-2 h-4 w-4" />
                {isFollowing ? "Following" : "Follow"}
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={handleMessage}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Achievements</h3>
              <div className="flex flex-wrap gap-1">
                {writer.totalViews > 100000 && (
                  <Badge variant="secondary" className="text-xs">
                    100K+ Views
                  </Badge>
                )}
                {writer.followers > 10000 && (
                  <Badge variant="secondary" className="text-xs">
                    10K+ Followers
                  </Badge>
                )}
                {writer.totalComics >= 3 && (
                  <Badge variant="secondary" className="text-xs">
                    Prolific Creator
                  </Badge>
                )}
                {writer.isVerified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified Artist
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
