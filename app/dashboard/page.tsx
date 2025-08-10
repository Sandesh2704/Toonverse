"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Users,
  PenTool,
  MessageSquare,
  TrendingUp,
  Eye,
  Star,
  Clock,
  ArrowUpRight,
  Plus,
  Settings,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const stats = [
  {
    title: "Total Comics",
    value: "1,234",
    change: "+12%",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Active Users",
    value: "45,678",
    change: "+8%",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Writers",
    value: "892",
    change: "+15%",
    icon: PenTool,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Comments",
    value: "23,456",
    change: "+23%",
    icon: MessageSquare,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

const recentComics = [
  {
    id: "1",
    title: "Shadow Realm Chronicles",
    author: "Akira Tanaka",
    status: "pending",
    submittedAt: "2 hours ago",
    episodes: 15,
  },
  {
    id: "2",
    title: "Neon City Nights",
    author: "Maya Chen",
    status: "approved",
    submittedAt: "5 hours ago",
    episodes: 8,
  },
  {
    id: "3",
    title: "Mystic Academy",
    author: "Elena Rodriguez",
    status: "rejected",
    submittedAt: "1 day ago",
    episodes: 12,
  },
]

const topComics = [
  {
    id: "1",
    title: "Dragon Heart Saga",
    views: 125000,
    rating: 4.8,
    trend: "+15%",
  },
  {
    id: "2",
    title: "Urban Legends",
    views: 98000,
    rating: 4.6,
    trend: "+8%",
  },
  {
    id: "3",
    title: "Space Pirates Odyssey",
    views: 87000,
    rating: 4.5,
    trend: "+12%",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your platform.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Quick Actions
        </Button>
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
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">{stat.change}</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Submissions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Submissions</CardTitle>
                <CardDescription>Latest comic submissions awaiting review</CardDescription>
              </div>
              <Button variant="outline" size="sm" >
                <Link href="/dashboard/comics">
                  View All
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComics.map((comic) => (
                <div key={comic.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{comic.title}</p>
                    <p className="text-sm text-muted-foreground">
                      by {comic.author} • {comic.episodes} episodes
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <Clock className="inline mr-1 h-3 w-3" />
                      {comic.submittedAt}
                    </p>
                  </div>
                  <Badge
                    variant={
                      comic.status === "approved" ? "default" : comic.status === "pending" ? "secondary" : "destructive"
                    }
                  >
                    {comic.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Comics */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Performing Comics</CardTitle>
                <CardDescription>Most popular comics this month</CardDescription>
              </div>
              <Button variant="outline" size="sm" >
                <Link href="/dashboard/analytics">
                  View Analytics
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topComics.map((comic, index) => (
                <div key={comic.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{comic.title}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{comic.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{comic.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {comic.trend}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" >
              <Link href="/dashboard/comics">
                <BookOpen className="h-6 w-6" />
                <span>Manage Comics</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" >
              <Link href="/dashboard/users">
                <Users className="h-6 w-6" />
                <span>User Management</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" >
              <Link href="/dashboard/settings">
                <Settings className="h-6 w-6" />
                <span>System Settings</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
