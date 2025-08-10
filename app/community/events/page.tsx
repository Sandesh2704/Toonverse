"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Users, Video, Search, Plus, Star, ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const eventTypes = [
  { id: "all", name: "All Events" },
  { id: "workshop", name: "Workshops" },
  { id: "networking", name: "Networking" },
  { id: "critique", name: "Critique Sessions" },
  { id: "collaboration", name: "Collaboration" },
  { id: "social", name: "Social" },
]

const events = [
  {
    id: 1,
    title: "Virtual Comic Creation Workshop",
    description:
      "Learn the fundamentals of comic creation from professional artists. This hands-on workshop covers storytelling, character design, and panel layout.",
    date: "March 15, 2024",
    time: "2:00 PM - 4:00 PM EST",
    type: "workshop",
    format: "virtual",
    attendees: 45,
    maxAttendees: 50,
    host: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Professional Comic Artist",
    },
    isAttending: false,
    isFeatured: true,
    tags: ["beginner-friendly", "digital-art", "storytelling"],
    location: "Zoom",
  },
  {
    id: 2,
    title: "Writer Networking Meetup",
    description:
      "Connect with fellow writers, share experiences, and build lasting professional relationships in the comic industry.",
    date: "March 18, 2024",
    time: "7:00 PM - 9:00 PM EST",
    type: "networking",
    format: "virtual",
    attendees: 23,
    maxAttendees: 30,
    host: {
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Community Manager",
    },
    isAttending: true,
    isFeatured: false,
    tags: ["networking", "writers", "career"],
    location: "Discord",
  },
  {
    id: 3,
    title: "Art Critique Session",
    description:
      "Get constructive feedback on your artwork from experienced artists and peers. Bring your latest pieces for review and discussion.",
    date: "March 22, 2024",
    time: "3:00 PM - 5:00 PM EST",
    type: "critique",
    format: "virtual",
    attendees: 18,
    maxAttendees: 25,
    host: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Art Director",
    },
    isAttending: false,
    isFeatured: false,
    tags: ["critique", "feedback", "improvement"],
    location: "Google Meet",
  },
  {
    id: 4,
    title: "Collaborative Comic Project Kickoff",
    description:
      "Join a collaborative comic project where multiple creators work together to create an anthology. Perfect for building portfolio and networking.",
    date: "March 25, 2024",
    time: "1:00 PM - 3:00 PM EST",
    type: "collaboration",
    format: "virtual",
    attendees: 12,
    maxAttendees: 15,
    host: {
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Project Coordinator",
    },
    isAttending: false,
    isFeatured: true,
    tags: ["collaboration", "anthology", "team-work"],
    location: "Zoom",
  },
  {
    id: 5,
    title: "Monthly Social Hour",
    description:
      "Casual hangout for community members to chat, share updates, and get to know each other better in a relaxed environment.",
    date: "March 28, 2024",
    time: "8:00 PM - 10:00 PM EST",
    type: "social",
    format: "virtual",
    attendees: 34,
    maxAttendees: 100,
    host: {
      name: "Community Team",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "InkSaga Team",
    },
    isAttending: true,
    isFeatured: false,
    tags: ["social", "community", "casual"],
    location: "Discord",
  },
  {
    id: 6,
    title: "Publishing Workshop: From Idea to Print",
    description:
      "Learn the complete publishing process from manuscript to printed comic. Covers self-publishing, traditional publishing, and digital distribution.",
    date: "April 2, 2024",
    time: "10:00 AM - 12:00 PM EST",
    type: "workshop",
    format: "virtual",
    attendees: 67,
    maxAttendees: 75,
    host: {
      name: "Jennifer Park",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Publishing Expert",
    },
    isAttending: false,
    isFeatured: true,
    tags: ["publishing", "business", "distribution"],
    location: "Zoom",
  },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || event.type === selectedType
    return matchesSearch && matchesType
  })

  const upcomingEvents = events.filter((event) => new Date(event.date) >= new Date())
  const myEvents = events.filter((event) => event.isAttending)
  const featuredEvents = events.filter((event) => event.isFeatured)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community Events</h1>
          <p className="text-muted-foreground">Join workshops, networking sessions, and collaborative events</p>
        </div>
        <Button >
          <Link href="/community/events/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="attendees">Most Popular</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcomingEvents.length})</TabsTrigger>
          <TabsTrigger value="my-events">My Events ({myEvents.length})</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          {event.isFeatured && (
                            <Badge className="bg-yellow-500 text-yellow-900">
                              <Star className="mr-1 h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="w-fit capitalize">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="line-clamp-3">{event.description}</CardDescription>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Video className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {event.attendees}/{event.maxAttendees} attending
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={event.host.avatar || "/placeholder.svg"} alt={event.host.name} />
                        <AvatarFallback className="text-xs">{event.host.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <span className="font-medium">{event.host.name}</span>
                        <span className="text-muted-foreground"> • {event.host.role}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button className="w-full" variant={event.isAttending ? "outline" : "default"}>
                      {event.isAttending ? "Attending" : "Join Event"}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-events" className="space-y-4">
          {myEvents.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No events joined yet</h3>
                <p className="text-muted-foreground mb-4">
                  Join events to connect with other creators and learn new skills
                </p>
                <Button >
                  <Link href="/community/events">Browse Events</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {myEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow h-full border-primary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <Badge variant="outline" className="w-fit capitalize">
                            {event.type}
                          </Badge>
                        </div>
                        <Badge className="bg-green-500 text-white">Attending</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Video className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </CardContent>
                    <div className="p-4 pt-0">
                      <Button className="w-full bg-transparent" variant="outline">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Join Meeting
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full border-yellow-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <Badge className="bg-yellow-500 text-yellow-900">
                            <Star className="mr-1 h-3 w-3" />
                            Featured
                          </Badge>
                        </div>
                        <Badge variant="outline" className="w-fit capitalize">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="line-clamp-3">{event.description}</CardDescription>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {event.attendees}/{event.maxAttendees} attending
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={event.host.avatar || "/placeholder.svg"} alt={event.host.name} />
                        <AvatarFallback className="text-xs">{event.host.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <span className="font-medium">{event.host.name}</span>
                        <span className="text-muted-foreground"> • {event.host.role}</span>
                      </div>
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button className="w-full" variant={event.isAttending ? "outline" : "default"}>
                      {event.isAttending ? "Attending" : "Join Event"}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
