"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComicCard } from "@/components/comics/comic-card"
import { BookOpen, Search, Grid3X3, List } from "lucide-react"
import type { Comic } from "@/types/comic"

interface WriterComicsProps {
  comics: Comic[]
  writerId: string
}

export function WriterComics({ comics, writerId }: WriterComicsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredComics = comics.filter((comic) => {
    const matchesSearch = comic.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || comic.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const publishedComics = comics.filter((comic) => comic.status === "published")
  const ongoingComics = comics.filter((comic) => comic.status === "ongoing")
  const completedComics = comics.filter((comic) => comic.status === "completed")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Comics ({comics.length})</span>
            </CardTitle>

            <div className="flex items-center space-x-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search comics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-48"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({comics.length})</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing ({ongoingComics.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedComics.length})</TabsTrigger>
              <TabsTrigger value="published">Published ({publishedComics.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ComicGrid comics={filteredComics} viewMode={viewMode} />
            </TabsContent>

            <TabsContent value="ongoing">
              <ComicGrid comics={ongoingComics} viewMode={viewMode} />
            </TabsContent>

            <TabsContent value="completed">
              <ComicGrid comics={completedComics} viewMode={viewMode} />
            </TabsContent>

            <TabsContent value="published">
              <ComicGrid comics={publishedComics} viewMode={viewMode} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ComicGrid({ comics, viewMode }: { comics: Comic[]; viewMode: "grid" | "list" }) {
  if (comics.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Comics Found</h3>
        <p className="text-muted-foreground">This writer hasn't published any comics in this category yet.</p>
      </div>
    )
  }

  return (
    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
      {comics.map((comic, index) => (
        <motion.div
          key={comic.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ComicCard comic={comic} compact={viewMode === "list"} />
        </motion.div>
      ))}
    </div>
  )
}
