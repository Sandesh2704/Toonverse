"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useFormHelpers } from "@/hooks/useRedux"
import { useAppDispatch } from "@/hooks/useRedux"
import { createComic } from "@/store/comicsSlice"
import { toast } from "sonner"

export function ReduxFormExample() {
  const dispatch = useAppDispatch()
  const formId = "create-comic-form"
  
  const {
    formData,
    submitting,
    error,
    success,
    updateField,
    setSubmitting,
    setFormError,
    setFormSuccess,
    resetForm,
    getFormValues,
    getFormErrors,
    hasErrors,
    isFormValid
  } = useFormHelpers(formId)

  // Initialize form on component mount
  useEffect(() => {
    resetForm({
      title: "",
      description: "",
      category: "",
      tags: ""
    })
  }, [resetForm])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFormValid()) {
      setFormError("Please fix the errors above")
      return
    }

    setSubmitting(true)
    setFormError(null)

    try {
      const values = getFormValues()
      const tags = values.tags ? values.tags.split(',').map(tag => tag.trim()) : []
      
      const comicData = {
        title: values.title,
        description: values.description,
        category: values.category,
        tags,
        author: "Current User",
        authorId: "user-1",
        thumbnail: "/default-image/comic2.jpg",
        status: "ongoing" as const,
        rating: 0,
        views: 0,
        episodes: []
      }

      await dispatch(createComic(comicData)).unwrap()
      
      setFormSuccess(true)
      toast.success("Comic created successfully!")
      resetForm()
    } catch (error) {
      setFormError("Failed to create comic. Please try again.")
      toast.error("Failed to create comic")
    } finally {
      setSubmitting(false)
    }
  }

  const validateField = (fieldName: string, value: any) => {
    switch (fieldName) {
      case "title":
        if (!value || value.trim().length < 3) {
          return "Title must be at least 3 characters long"
        }
        break
      case "description":
        if (!value || value.trim().length < 10) {
          return "Description must be at least 10 characters long"
        }
        break
      case "category":
        if (!value) {
          return "Please select a category"
        }
        break
    }
    return undefined
  }

  const handleFieldChange = (fieldName: string, value: string) => {
    updateField(fieldName, value)
    
    // Clear field error when user starts typing
    const error = validateField(fieldName, value)
    if (!error) {
      // Field is valid, clear any existing error
    }
  }

  const handleFieldBlur = (fieldName: string) => {
    const field = formData[fieldName]
    if (field) {
      const error = validateField(fieldName, field.value)
      if (error) {
        // You could dispatch a setFieldError action here
        console.log(`Field ${fieldName} error:`, error)
      }
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create New Comic</CardTitle>
        <CardDescription>
          This form demonstrates Redux Toolkit integration with form state management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title?.value || ""}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              onBlur={() => handleFieldBlur("title")}
              placeholder="Enter comic title"
              className={formData.title?.error ? "border-red-500" : ""}
            />
            {formData.title?.error && (
              <p className="text-sm text-red-500">{formData.title.error}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description?.value || ""}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              onBlur={() => handleFieldBlur("description")}
              placeholder="Enter comic description"
              className={formData.description?.error ? "border-red-500" : ""}
            />
            {formData.description?.error && (
              <p className="text-sm text-red-500">{formData.description.error}</p>
            )}
          </div>

          {/* Category Field */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              aria-label="Select comic category"
              value={formData.category?.value || ""}
              onChange={(e) => handleFieldChange("category", e.target.value)}
              onBlur={() => handleFieldBlur("category")}
              className={`w-full p-2 border rounded-md ${
                formData.category?.error ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a category</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Romance">Romance</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
            </select>
            {formData.category?.error && (
              <p className="text-sm text-red-500">{formData.category.error}</p>
            )}
          </div>

          {/* Tags Field */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags?.value || ""}
              onChange={(e) => handleFieldChange("tags", e.target.value)}
              placeholder="fantasy, adventure, magic"
            />
          </div>

          {/* Form Error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form Success */}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-600">Comic created successfully!</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitting || !isFormValid()}
            className="w-full"
          >
            {submitting ? "Creating..." : "Create Comic"}
          </Button>

          {/* Debug Info */}
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <h4 className="font-medium text-sm mb-2">Debug Info:</h4>
            <div className="text-xs space-y-1">
              <p>Form Valid: {isFormValid() ? "Yes" : "No"}</p>
              <p>Has Errors: {hasErrors() ? "Yes" : "No"}</p>
              <p>Submitting: {submitting ? "Yes" : "No"}</p>
              <p>Form Values: {JSON.stringify(getFormValues())}</p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
