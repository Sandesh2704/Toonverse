"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Eye, Heart, Users, DollarSign, Clock, Plus, Upload, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const stats = [
  {
    title: "Total Comics",
    value: "12",
    change: "+2 this month",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Total Views",
    value: "245K",
    change: "+15% this week",
    icon: Eye,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Followers",
    value: "3.2K",
    change: "+127 this month",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Total Earnings",
    value: "$1,234",
    change: "+$89 this month",
    icon: DollarSign,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

const recentComics = [
  {
    id: "1",
    title: "Shadow Realm Chronicles",
    status: "published",
    episodes: 15,
    views: 125000,
    rating: 4.8,
    lastUpdated: "2 days ago",
    thumbnail: "/default-image/comic2.jpg?height=80&width=60&text=Comic+1",
  },
  {
    id: "2",
    title: "Neon City Nights",
    status: "draft",
    episodes: 8,
    views: 0,
    rating: 0,
    lastUpdated: "1 week ago",
    thumbnail: "/default-image/comic2.jpg?height=80&width=60&text=Comic+2",
  },
  {
    id: "3",
    title: "Mystic Academy",
    status: "pending",
    episodes: 12,
    views: 0,
    rating: 0,
    lastUpdated: "3 days ago",
    thumbnail: "/default-image/comic2.jpg?height=80&width=60&text=Comic+3",
  },
]

const viewsData = [
  { name: "Mon", views: 1200 },
  { name: "Tue", views: 1900 },
  { name: "Wed", views: 3000 },
  { name: "Thu", views: 2800 },
  { name: "Fri", views: 3900 },
  { name: "Sat", views: 4800 },
  { name: "Sun", views: 3200 },
]

const engagementData = [
  { name: "Likes", value: 1234 },
  { name: "Comments", value: 567 },
  { name: "Shares", value: 234 },
  { name: "Bookmarks", value: 890 },
]

export default function WriterDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Writer Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's how your comics are performing.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" >
            <Link href="/writer/analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Link>
          </Button>
          <Button >
            <Link href="/writer/create">
              <Plus className="mr-2 h-4 w-4" />
              Create New Comic
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Views This Week</CardTitle>
            <CardDescription>Daily views across all your comics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Overview</CardTitle>
            <CardDescription>Total engagement across all comics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Comics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Comics</CardTitle>
              <CardDescription>Manage and track your comic series</CardDescription>
            </div>
            <Button variant="outline" >
              <Link href="/writer/comics">View All Comics</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentComics.map((comic) => (
              <div key={comic.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50">
                <img
                  src={comic.thumbnail || "/default-image/comic2.jpg"}
                  alt={comic.title}
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{comic.title}</h3>
                    <Badge
                      variant={
                        comic.status === "published" ? "default" : comic.status === "pending" ? "secondary" : "outline"
                      }
                    >
                      {comic.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{comic.episodes} episodes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{comic.views.toLocaleString()} views</span>
                    </div>
                    {comic.rating > 0 && (
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{comic.rating} rating</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Updated {comic.lastUpdated}</span>
                    </div>
                  </div>
                  {comic.status === "published" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Performance</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <Button size="sm" variant="outline" >
                    <Link href={`/writer/comics/${comic.id}`}>Manage</Link>
                  </Button>
                  {comic.status === "published" && (
                    <Button size="sm" variant="ghost" >
                      <Link href={`/comics/${comic.id}`}>View</Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <Link href="/writer/create">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Plus className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Create New Comic</h3>
              <p className="text-sm text-muted-foreground">Start a new comic series</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <Link href="/writer/submissions">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Upload className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Submit Episode</h3>
              <p className="text-sm text-muted-foreground">Upload new episode content</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <Link href="/writer/analytics">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold mb-2">View Analytics</h3>
              <p className="text-sm text-muted-foreground">Track performance metrics</p>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  )
}
