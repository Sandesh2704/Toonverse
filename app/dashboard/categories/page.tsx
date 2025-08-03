"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store"
import {
  addCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
  type Category,
} from "@/store/categoriesSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Sparkles, Rocket, Heart, Zap, Search, Ghost, Smile, Coffee, BarChart3 } from "lucide-react"
import { toast } from "sonner"

const iconMap = {
  Sparkles,
  Rocket,
  Heart,
  Zap,
  Search,
  Ghost,
  Smile,
  Coffee,
  BarChart3,
}

const colorOptions = [
  { value: "purple", label: "Purple", class: "bg-purple-500" },
  { value: "blue", label: "Blue", class: "bg-blue-500" },
  { value: "pink", label: "Pink", class: "bg-pink-500" },
  { value: "red", label: "Red", class: "bg-red-500" },
  { value: "gray", label: "Gray", class: "bg-gray-500" },
  { value: "black", label: "Black", class: "bg-black" },
  { value: "yellow", label: "Yellow", class: "bg-yellow-500" },
  { value: "green", label: "Green", class: "bg-green-500" },
  { value: "indigo", label: "Indigo", class: "bg-indigo-500" },
  { value: "orange", label: "Orange", class: "bg-orange-500" },
]

const iconOptions = [
  { value: "Sparkles", label: "Sparkles" },
  { value: "Rocket", label: "Rocket" },
  { value: "Heart", label: "Heart" },
  { value: "Zap", label: "Zap" },
  { value: "Search", label: "Search" },
  { value: "Ghost", label: "Ghost" },
  { value: "Smile", label: "Smile" },
  { value: "Coffee", label: "Coffee" },
  { value: "BarChart3", label: "Chart" },
]

export default function CategoriesPage() {
  const dispatch = useDispatch()
  const { categories, loading } = useSelector((state: RootState) => state.categories)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "purple",
    icon: "Sparkles",
    isActive: true,
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      color: "purple",
      icon: "Sparkles",
      isActive: true,
    })
    setEditingCategory(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error("Category name is required")
      return
    }

    const slug = formData.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    if (editingCategory) {
      dispatch(
        updateCategory({
          ...editingCategory,
          ...formData,
          slug,
          comicsCount: editingCategory.comicsCount,
        }),
      )
      toast.success("Category updated successfully")
    } else {
      dispatch(
        addCategory({
          ...formData,
          slug,
          comicsCount: 0,
        }),
      )
      toast.success("Category created successfully")
    }

    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
      icon: category.icon,
      isActive: category.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (categoryId: string) => {
    dispatch(deleteCategory(categoryId))
    toast.success("Category deleted successfully")
  }

  const handleToggleStatus = (categoryId: string) => {
    dispatch(toggleCategoryStatus(categoryId))
    toast.success("Category status updated")
  }

  const totalComics = categories.reduce((sum, cat) => sum + cat.comicsCount, 0)
  const activeCategories = categories.filter((cat) => cat.isActive).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories Management</h1>
          <p className="text-muted-foreground">Manage comic categories and organize your content</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>{editingCategory ? "Edit Category" : "Create New Category"}</DialogTitle>
                <DialogDescription>
                  {editingCategory
                    ? "Update the category details below."
                    : "Add a new category to organize your comics."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter category name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter category description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Color</Label>
                    <Select
                      value={formData.color}
                      onValueChange={(value) => setFormData({ ...formData, color: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded-full ${color.class}`} />
                              {color.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Icon</Label>
                    <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((icon) => {
                          const IconComponent = iconMap[icon.value as keyof typeof iconMap]
                          return (
                            <SelectItem key={icon.value} value={icon.value}>
                              <div className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4" />
                                {icon.label}
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingCategory ? "Update" : "Create"} Category</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">{activeCategories} active categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comics</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComics}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCategories}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeCategories / categories.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon as keyof typeof iconMap]
          const colorClass = colorOptions.find((c) => c.value === category.color)?.class || "bg-gray-500"

          return (
            <Card key={category.id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${colorClass} text-white`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>{category.comicsCount} comics</CardDescription>
                    </div>
                  </div>
                  <Badge variant={category.isActive ? "default" : "secondary"}>
                    {category.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={category.isActive}
                      onCheckedChange={() => handleToggleStatus(category.id)}
                      size="sm"
                    />
                    <span className="text-sm text-muted-foreground">{category.isActive ? "Active" : "Inactive"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Category</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{category.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(category.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
