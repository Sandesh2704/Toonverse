"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Supernatural",
  "Thriller",
]

const experienceLevels = [
  { value: "beginner", label: "Beginner (0-1 years)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "advanced", label: "Advanced (3-5 years)" },
  { value: "professional", label: "Professional (5+ years)" },
]

interface WriterApplication {
  bio: string
  experience: string
  genres: string[]
  socialLinks: {
    twitter: string
    instagram: string
    youtube: string
    website: string
  }
  portfolio: string
  motivation: string
  agreeToGuidelines: boolean
}

export default function BecomeWriterPage() {
  const [formData, setFormData] = useState<WriterApplication>({
    bio: "",
    experience: "",
    genres: [],
    socialLinks: {
      twitter: "",
      instagram: "",
      youtube: "",
      website: "",
    },
    portfolio: "",
    motivation: "",
    agreeToGuidelines: false,
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success("Application submitted successfully! We'll review it within 3-5 business days.")
    router.push("/dashboard")
    setLoading(false)
  }

  const handleGenreToggle = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre) ? prev.genres.filter((g) => g !== genre) : [...prev.genres, genre],
    }))
  }

  const handleSocialLinkChange = (platform: keyof WriterApplication["socialLinks"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
      <div className="container max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Become a Writer
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our community of talented creators and share your stories with readers worldwide
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle>Writer Application</CardTitle>
              <CardDescription>
                Tell us about yourself and your creative journey. All fields marked with * are required.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Bio Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">About You</h3>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio *</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself, your background, and what drives your passion for storytelling..."
                      value={formData.bio}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                      className="min-h-[120px]"
                      required
                    />
                    <p className="text-sm text-muted-foreground">{formData.bio.length}/500 characters</p>
                  </div>
                </div>

                {/* Experience Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Experience</h3>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level *</Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Genres Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Preferred Genres</h3>
                  <p className="text-sm text-muted-foreground">
                    Select the genres you're most interested in writing (select at least 1, maximum 5)
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {genres.map((genre) => (
                      <div
                        key={genre}
                        className={`cursor-pointer transition-all ${
                          formData.genres.includes(genre) ? "ring-2 ring-primary" : "hover:bg-muted"
                        }`}
                        onClick={() => handleGenreToggle(genre)}
                      >
                        <Badge
                          variant={formData.genres.includes(genre) ? "default" : "outline"}
                          className="w-full justify-center py-2 px-3"
                        >
                          {genre}
                          {formData.genres.includes(genre) && <X className="h-3 w-3 ml-1" />}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Selected: {formData.genres.length}/5</p>
                </div>

                {/* Social Links Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Social Media & Portfolio</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your social media profiles and portfolio (optional but recommended)
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter/X</Label>
                      <Input
                        id="twitter"
                        placeholder="@username or full URL"
                        value={formData.socialLinks.twitter}
                        onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        placeholder="@username or full URL"
                        value={formData.socialLinks.instagram}
                        onChange={(e) => handleSocialLinkChange("instagram", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="youtube">YouTube</Label>
                      <Input
                        id="youtube"
                        placeholder="Channel URL"
                        value={formData.socialLinks.youtube}
                        onChange={(e) => handleSocialLinkChange("youtube", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Personal Website</Label>
                      <Input
                        id="website"
                        placeholder="https://yourwebsite.com"
                        value={formData.socialLinks.website}
                        onChange={(e) => handleSocialLinkChange("website", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Portfolio Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Portfolio</h3>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Previous Work</Label>
                    <Textarea
                      id="portfolio"
                      placeholder="Share links to your previous work, published comics, or any relevant creative projects..."
                      value={formData.portfolio}
                      onChange={(e) => setFormData((prev) => ({ ...prev, portfolio: e.target.value }))}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Motivation Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Motivation</h3>
                  <div className="space-y-2">
                    <Label htmlFor="motivation">Why do you want to become a writer on InkSaga? *</Label>
                    <Textarea
                      id="motivation"
                      placeholder="Share your motivation, goals, and what you hope to achieve as a writer on our platform..."
                      value={formData.motivation}
                      onChange={(e) => setFormData((prev) => ({ ...prev, motivation: e.target.value }))}
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                </div>

                {/* Agreement Section */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="guidelines"
                      checked={formData.agreeToGuidelines}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, agreeToGuidelines: checked as boolean }))
                      }
                    />
                    <Label htmlFor="guidelines" className="text-sm leading-relaxed">
                      I agree to follow InkSaga's{" "}
                      <a href="/writer-guidelines" className="text-primary hover:underline">
                        Writer Guidelines
                      </a>
                      , maintain quality standards, and respect our community policies. I understand that my application
                      will be reviewed and I may be contacted for additional information.
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    disabled={
                      loading ||
                      !formData.bio ||
                      !formData.experience ||
                      formData.genres.length === 0 ||
                      !formData.motivation ||
                      !formData.agreeToGuidelines
                    }
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting Application...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Submit Application</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
