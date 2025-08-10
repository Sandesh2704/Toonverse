"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setActiveRooms } from "@/store/chatSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Users, Calendar, Handshake, TrendingUp, Hash, Search } from "lucide-react"
import Link from "next/link"
import { mockChatRooms } from "@/data/chat"

export default function CommunityPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Initialize chat rooms for the community
    dispatch(setActiveRooms(mockChatRooms))
  }, [dispatch])

  const stats = [
    { label: "Active Members", value: "2,847", icon: Users, change: "+12%" },
    { label: "Messages Today", value: "1,234", icon: MessageSquare, change: "+8%" },
    { label: "Upcoming Events", value: "5", icon: Calendar, change: "+2" },
    { label: "Active Collaborations", value: "23", icon: Handshake, change: "+15%" },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "message",
      user: "Alex Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      action: "posted in",
      target: "General Discussion",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "join",
      user: "Sarah Kim",
      avatar: "/placeholder.svg?height=32&width=32",
      action: "joined",
      target: "Manga Artists",
      time: "5 minutes ago",
    },
    {
      id: 3,
      type: "collaboration",
      user: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      action: "started a collaboration in",
      target: "Writing Circle",
      time: "10 minutes ago",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Community Hub</h1>
        <p className="text-muted-foreground mt-2">
          Connect, collaborate, and grow with fellow creators in the InkSaga community
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last week
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button className="h-auto p-4">
          <Link href="/community/chat">
            <div className="text-center">
              <MessageSquare className="h-6 w-6 mx-auto mb-2" />
              <div className="font-medium">Join Chat</div>
              <div className="text-xs opacity-90">Real-time conversations</div>
            </div>
          </Link>
        </Button>
        <Button variant="outline"  className="h-auto p-4 bg-transparent">
          <Link href="/community/forums">
            <div className="text-center">
              <MessageSquare className="h-6 w-6 mx-auto mb-2" />
              <div className="font-medium">Browse Forums</div>
              <div className="text-xs opacity-70">Discussion threads</div>
            </div>
          </Link>
        </Button>
        <Button variant="outline"  className="h-auto p-4 bg-transparent">
          <Link href="/community/groups">
            <div className="text-center">
              <Users className="h-6 w-6 mx-auto mb-2" />
              <div className="font-medium">Find Groups</div>
              <div className="text-xs opacity-70">Interest-based communities</div>
            </div>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto p-4 bg-transparent">
          <Link href="/community/events">
            <div className="text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2" />
              <div className="font-medium">View Events</div>
              <div className="text-xs opacity-70">Workshops & meetups</div>
            </div>
          </Link>
        </Button>
      </div>

      {/* Active Chats & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Chats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Chats</CardTitle>
              <CardDescription>Join the conversation</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Link href="/community/chat">
                <Search className="h-4 w-4 mr-2" />
                Search Messages
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockChatRooms.slice(0, 3).map((room) => (
              <div key={room.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={room.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      <Hash className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{room.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {room.participants.filter((p) => p.isOnline).length} online
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {room.unreadCount > 0 && (
                    <Badge variant="destructive" className="h-5 w-5 p-0 text-xs rounded-full">
                      {room.unreadCount}
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm">
                    <Link href="/community/chat">Join</Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>What's happening in the community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                    <span className="font-medium">{activity.target}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
