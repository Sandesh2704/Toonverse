"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {  Bookmark,  } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { ComicCard } from "@/components/comics/comic-card"
import { dummyComics } from "@/data/comics"
import type {  UserSave } from "@/types/auth"
import Link from "next/link"

// Mock analytics data type
interface UserAnalytics {
  totalViews: number
  totalLikes: number
  totalComments: number
  totalShares: number
  topComic: { id: string; title: string; views: number }
}

export default function Saved() {
      const { user } = useAuth()
      const [savedComics, setSavedComics] = useState<UserSave[]>([])
      const [loading, setLoading] = useState(true)
    
      useEffect(() => {
        const fetchUserData = async () => {
          setLoading(true)
          await new Promise((resolve) => setTimeout(resolve, 1000))
    
          // Mock followed writers
         
    
          // Mock saved comics
          const mockSaves: UserSave[] = dummyComics.slice(3, 9).map((comic, index) => ({
            id: `save-${index}`,
            userId: user?.id || "1",
            comicId: comic.id,
            comic,
            savedAt: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString(),
          }))
    
     
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
                <Button>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )
      }
    
   
    
      const handleUnsave = (comicId: string) => {
        setSavedComics((prev) => prev.filter((save) => save.comicId !== comicId))
      }
  return (
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
                      <Button>
                        <Link href="/">Browse Comics</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
  )
}
