"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Plus, Save, Send, FileText, ImageIcon, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

const existingComics = [
  { id: "1", title: "Shadow Realm Chronicles", episodes: 15 },
  { id: "2", title: "Neon City Nights", episodes: 8 },
  { id: "3", title: "Mystic Academy", episodes: 12 },
]

export default function SubmissionsPage() {
  const [submissionType, setSubmissionType] = useState<"episode" | "comic">("episode")
  const [selectedComic, setSelectedComic] = useState("")
  const [episodeData, setEpisodeData] = useState({
    title: "",
    description: "",
    episodeNumber: "",
    pages: [] as File[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const newFiles = Array.from(files).filter((file) => file.type.startsWith("image/"))
    setEpisodeData((prev) => ({
      ...prev,
      pages: [...prev.pages, ...newFiles],
    }))
  }

  const removePage = (index: number) => {
    setEpisodeData((prev) => ({
      ...prev,
      pages: prev.pages.filter((_, i) => i !== index),
    }))
  }

  const reorderPages = (fromIndex: number, toIndex: number) => {
    const newPages = [...episodeData.pages]
    const [removed] = newPages.splice(fromIndex, 1)
    newPages.splice(toIndex, 0, removed)
    setEpisodeData((prev) => ({ ...prev, pages: newPages }))
  }

  const handleSubmit = async () => {
    if (!selectedComic || !episodeData.title || episodeData.pages.length === 0) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast.success("Episode submitted successfully! It will be reviewed within 24 hours.")
      setEpisodeData({ title: "", description: "", episodeNumber: "", pages: [] })
      setSelectedComic("")
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Submit Content</h1>
          <p className="text-muted-foreground">Upload new episodes or create new comic series</p>
        </div>
      </div>

      {/* Submission Type Tabs */}
      <Tabs value={submissionType} onValueChange={(value) => setSubmissionType(value as "episode" | "comic")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="episode">New Episode</TabsTrigger>
          <TabsTrigger value="comic">New Comic Series</TabsTrigger>
        </TabsList>

        <TabsContent value="episode" className="space-y-6">
          {/* Episode Submission Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit New Episode</CardTitle>
              <CardDescription>Add a new episode to one of your existing comic series</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Comic Selection */}
              <div className="space-y-2">
                <Label htmlFor="comic-select">Select Comic Series *</Label>
                <Select value={selectedComic} onValueChange={setSelectedComic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a comic series" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingComics.map((comic) => (
                      <SelectItem key={comic.id} value={comic.id}>
                        {comic.title} (Episode {comic.episodes + 1})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Episode Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="episode-title">Episode Title *</Label>
                  <Input
                    id="episode-title"
                    placeholder="Enter episode title"
                    value={episodeData.title}
                    onChange={(e) => setEpisodeData((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="episode-number">Episode Number</Label>
                  <Input
                    id="episode-number"
                    placeholder="Auto-generated"
                    value={episodeData.episodeNumber}
                    onChange={(e) => setEpisodeData((prev) => ({ ...prev, episodeNumber: e.target.value }))}
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="episode-description">Episode Description</Label>
                <Textarea
                  id="episode-description"
                  placeholder="Brief description of this episode..."
                  value={episodeData.description}
                  onChange={(e) => setEpisodeData((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              {/* Page Upload */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Episode Pages *</Label>
                  <Badge variant="outline">{episodeData.pages.length} pages uploaded</Badge>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <div className="space-y-4">
                    <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-lg font-medium">Upload Episode Pages</p>
                      <p className="text-sm text-muted-foreground">Drag and drop images here, or click to browse</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Supported formats: PNG, JPG, WEBP • Max 10MB per file
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="pages-upload"
                    />
                    <Button variant="outline" asChild>
                      <label htmlFor="pages-upload" className="cursor-pointer">
                        Choose Files
                      </label>
                    </Button>
                  </div>
                </div>

                {/* Pages Preview */}
                {episodeData.pages.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Page Order</h3>
                      <p className="text-sm text-muted-foreground">Drag to reorder pages</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {episodeData.pages.map((page, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-[3/4] border rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={URL.createObjectURL(page) || "/placeholder.svg"}
                              alt={`Page ${index + 1}`}
                              width={120}
                              height={160}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {index + 1}
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removePage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submission Guidelines */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-900">Submission Guidelines</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Pages should be in reading order (left to right, top to bottom)</li>
                      <li>• Recommended resolution: 800x1200px or higher</li>
                      <li>• File size should not exceed 10MB per page</li>
                      <li>• Content will be reviewed within 24 hours</li>
                      <li>• Make sure all text is readable and images are clear</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !selectedComic || !episodeData.title || episodeData.pages.length === 0}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit for Review"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comic" className="space-y-6">
          {/* New Comic Series */}
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Create New Comic Series</h3>
              <p className="text-muted-foreground text-center mb-4">
                To create a new comic series, use the dedicated comic creation workflow
              </p>
              <Button asChild>
                <a href="/writer/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Comic
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Submissions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
          <CardDescription>Track the status of your recent episode submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "1",
                comic: "Shadow Realm Chronicles",
                episode: "Episode 16: The Final Battle",
                status: "approved",
                submittedAt: "2 days ago",
                pages: 12,
              },
              {
                id: "2",
                comic: "Neon City Nights",
                episode: "Episode 9: Digital Dreams",
                status: "pending",
                submittedAt: "1 day ago",
                pages: 8,
              },
              {
                id: "3",
                comic: "Mystic Academy",
                episode: "Episode 13: Hidden Powers",
                status: "rejected",
                submittedAt: "3 days ago",
                pages: 10,
                feedback: "Some pages need higher resolution",
              },
            ].map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{submission.episode}</h4>
                  <p className="text-sm text-muted-foreground">{submission.comic}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{submission.pages} pages</span>
                    <span>•</span>
                    <span>Submitted {submission.submittedAt}</span>
                  </div>
                  {submission.feedback && <p className="text-xs text-red-600 mt-1">{submission.feedback}</p>}
                </div>
                <Badge
                  variant={
                    submission.status === "approved"
                      ? "default"
                      : submission.status === "pending"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {submission.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
