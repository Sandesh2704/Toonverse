"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, Plus, Save, Send } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { categories } from "@/data/comics"

export default function CreateComicPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [] as string[],
    thumbnail: null as File | null,
    banner: null as File | null,
    status: "draft" as "draft" | "published",
  })
  const [tagInput, setTagInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: "thumbnail" | "banner", file: File) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleSubmit = async (action: "save" | "publish") => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      if (action === "publish") {
        setFormData((prev) => ({ ...prev, status: "published" }))
        toast.success("Comic published successfully!")
      } else {
        toast.success("Comic saved as draft!")
      }
      setIsSubmitting(false)
    }, 2000)
  }

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create New Comic</h1>
          <p className="text-muted-foreground">Set up your new comic series</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => handleSubmit("save")} disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={() => handleSubmit("publish")} disabled={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                Step {step} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} />
          </div>
        </CardContent>
      </Card>

      {/* Form Steps */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Tell us about your comic series</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Comic Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter your comic title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your comic story, characters, and what makes it unique..."
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Tags & Genres</CardTitle>
              <CardDescription>Help readers discover your comic</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Add relevant tags to help readers find your comic. Examples: action, romance, fantasy, school life
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Visual Assets</CardTitle>
              <CardDescription>Upload cover images for your comic</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Thumbnail Upload */}
                <div className="space-y-2">
                  <Label>Thumbnail (Cover) *</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    {formData.thumbnail ? (
                      <div className="space-y-2">
                        <Image
                          src={URL.createObjectURL(formData.thumbnail) || "/placeholder.svg"}
                          alt="Thumbnail preview"
                          width={200}
                          height={300}
                          className="mx-auto rounded"
                        />
                        <Button variant="outline" size="sm" onClick={() => handleFileUpload("thumbnail", null as any)}>
                          Change Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Upload Thumbnail</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                          <p className="text-xs text-muted-foreground">Recommended: 400x600px</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload("thumbnail", e.target.files[0])}
                          className="hidden"
                          id="thumbnail-upload"
                        />
                        <Button variant="outline" size="sm" >
                          <label htmlFor="thumbnail-upload" className="cursor-pointer">
                            Choose File
                          </label>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Banner Upload */}
                <div className="space-y-2">
                  <Label>Banner (Optional)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    {formData.banner ? (
                      <div className="space-y-2">
                        <Image
                          src={URL.createObjectURL(formData.banner) || "/placeholder.svg"}
                          alt="Banner preview"
                          width={300}
                          height={150}
                          className="mx-auto rounded"
                        />
                        <Button variant="outline" size="sm" onClick={() => handleFileUpload("banner", null as any)}>
                          Change Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Upload Banner</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                          <p className="text-xs text-muted-foreground">Recommended: 1200x400px</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload("banner", e.target.files[0])}
                          className="hidden"
                          id="banner-upload"
                        />
                        <Button variant="outline" size="sm" >
                          <label htmlFor="banner-upload" className="cursor-pointer">
                            Choose File
                          </label>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Review & Publish</CardTitle>
              <CardDescription>Review your comic details before publishing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Comic Details</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Title:</strong> {formData.title || "Not set"}
                      </p>
                      <p>
                        <strong>Category:</strong> {formData.category || "Not set"}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {formData.description ? `${formData.description.substring(0, 100)}...` : "Not set"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-1">
                      {formData.tags.length > 0 ? (
                        formData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No tags added</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Visual Assets</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Thumbnail</p>
                        {formData.thumbnail ? (
                          <Image
                            src={URL.createObjectURL(formData.thumbnail) || "/placeholder.svg"}
                            alt="Thumbnail"
                            width={100}
                            height={150}
                            className="rounded border"
                          />
                        ) : (
                          <div className="w-[100px] h-[150px] bg-muted rounded border flex items-center justify-center">
                            <p className="text-xs text-muted-foreground">No image</p>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Banner</p>
                        {formData.banner ? (
                          <Image
                            src={URL.createObjectURL(formData.banner) || "/placeholder.svg"}
                            alt="Banner"
                            width={150}
                            height={75}
                            className="rounded border"
                          />
                        ) : (
                          <div className="w-[150px] h-[75px] bg-muted rounded border flex items-center justify-center">
                            <p className="text-xs text-muted-foreground">No image</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Publishing Options</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={formData.status === "draft"}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                    />
                    <span className="text-sm">Save as Draft - You can edit and publish later</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={formData.status === "published"}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                    />
                    <span className="text-sm">Publish Now - Make it visible to readers immediately</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={step === 1}>
          Previous
        </Button>
        <div className="flex space-x-2">
          {step < totalSteps ? (
            <Button
              onClick={nextStep}
              disabled={
                (step === 1 && (!formData.title || !formData.description || !formData.category)) ||
                (step === 3 && !formData.thumbnail)
              }
            >
              Next
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => handleSubmit("save")} disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button onClick={() => handleSubmit("publish")} disabled={isSubmitting}>
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Publishing..." : "Publish Comic"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
