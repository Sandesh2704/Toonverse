"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Heart, MessageSquare, Users, TrendingUp, TrendingDown, Download } from "lucide-react"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

const viewsData = [
  { date: "Jan 1", views: 1200, likes: 45, comments: 12 },
  { date: "Jan 2", views: 1900, likes: 67, comments: 18 },
  { date: "Jan 3", views: 3000, likes: 89, comments: 24 },
  { date: "Jan 4", views: 2800, likes: 76, comments: 21 },
  { date: "Jan 5", views: 3900, likes: 112, comments: 31 },
  { date: "Jan 6", views: 4800, likes: 134, comments: 42 },
  { date: "Jan 7", views: 3200, likes: 98, comments: 28 },
]

const comicPerformance = [
  { name: "Shadow Realm Chronicles", views: 125000, rating: 4.8, episodes: 15 },
  { name: "Neon City Nights", views: 89000, rating: 4.6, episodes: 8 },
  { name: "Mystic Academy", views: 156000, rating: 4.9, episodes: 12 },
  { name: "Urban Legends", views: 67000, rating: 4.5, episodes: 22 },
]

const audienceData = [
  { name: "13-17", value: 25, color: "#8884d8" },
  { name: "18-24", value: 35, color: "#82ca9d" },
  { name: "25-34", value: 28, color: "#ffc658" },
  { name: "35+", value: 12, color: "#ff7300" },
]

const engagementData = [
  { date: "Week 1", engagement: 65 },
  { date: "Week 2", engagement: 72 },
  { date: "Week 3", engagement: 68 },
  { date: "Week 4", engagement: 78 },
  { date: "Week 5", engagement: 85 },
  { date: "Week 6", engagement: 82 },
]

export default function WriterAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your comic performance and audience insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Views",
            value: "437K",
            change: "+15.2%",
            trend: "up",
            icon: Eye,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
          },
          {
            title: "Total Likes",
            value: "23.4K",
            change: "+8.7%",
            trend: "up",
            icon: Heart,
            color: "text-red-600",
            bgColor: "bg-red-100",
          },
          {
            title: "Comments",
            value: "5.2K",
            change: "+12.3%",
            trend: "up",
            icon: MessageSquare,
            color: "text-green-600",
            bgColor: "bg-green-100",
          },
          {
            title: "Followers",
            value: "8.9K",
            change: "-2.1%",
            trend: "down",
            icon: Users,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comics">Comic Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Views Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Views Over Time</CardTitle>
                <CardDescription>Daily views across all your comics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Engagement Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Likes and comments over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="likes" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="comments" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comic Performance Comparison</CardTitle>
              <CardDescription>Views and ratings for each of your comics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comicPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Performing Comics */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Comics</CardTitle>
              <CardDescription>Your most successful comic series</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comicPerformance
                  .sort((a, b) => b.views - a.views)
                  .map((comic, index) => (
                    <div key={comic.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{comic.name}</h4>
                          <p className="text-sm text-muted-foreground">{comic.episodes} episodes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{comic.views.toLocaleString()} views</p>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span className="text-sm">{comic.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>Age Demographics</CardTitle>
                <CardDescription>Age distribution of your readers</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={audienceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {audienceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Reader Retention */}
            <Card>
              <CardHeader>
                <CardTitle>Reader Retention</CardTitle>
                <CardDescription>How engaged your audience is over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="engagement" stroke="hsl(var(--primary))" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Audience Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Audience Insights</CardTitle>
              <CardDescription>Key metrics about your readership</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">78%</p>
                  <p className="text-sm text-muted-foreground">Return Readers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">4.2</p>
                  <p className="text-sm text-muted-foreground">Avg. Episodes Read</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">12m</p>
                  <p className="text-sm text-muted-foreground">Avg. Reading Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Engagement Rate */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Rate</CardTitle>
                <CardDescription>Weekly engagement percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="engagement" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Comments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Comments</CardTitle>
                <CardDescription>Latest reader feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      user: "Alex Chen",
                      comment: "Amazing artwork! Can't wait for the next episode.",
                      comic: "Shadow Realm Chronicles",
                      time: "2 hours ago",
                    },
                    {
                      user: "Sarah Kim",
                      comment: "The character development is incredible.",
                      comic: "Mystic Academy",
                      time: "5 hours ago",
                    },
                    {
                      user: "Mike Johnson",
                      comment: "This series keeps getting better!",
                      comic: "Neon City Nights",
                      time: "1 day ago",
                    },
                  ].map((comment, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{comment.user}</p>
                        <p className="text-xs text-muted-foreground">{comment.time}</p>
                      </div>
                      <p className="text-sm mb-1">{comment.comment}</p>
                      <Badge variant="outline" className="text-xs">
                        {comment.comic}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
