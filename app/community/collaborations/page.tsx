"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Handshake, Search, Plus, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const collaborationTypes = [
  { id: "all", name: "All Types" },
  { id: "comic", name: "Comic Projects" },
  { id: "art", name: "Art Collaboration" },
  { id: "writing", name: "Writing Partnership" },
  { id: "anthology", name: "Anthology" },
  { id: "contest", name: "Contest Entry" },
]

const collaborations = [
  {
    id: 1,
    title: "Sci-Fi Anthology Project",
    description:
      "Looking for writers and artists to contribute to a science fiction anthology. Each contributor will create a 5-10 page story. Professional publication planned.",
    author: {
      name: "Sarah Chen",
      avatar: "/default-image/comic2.jpg?height=32&width=32",
      role: "Editor & Publisher",
      verified: true,
    },
    type: "anthology",
    status: "open",
    deadline: "April 15, 2024",
    participants: 8,
    maxParticipants: 15,
    skillsNeeded: ["Writing", "Illustration", "Coloring"],
    timeCommitment: "2-3 weeks",
    compensation: "Revenue Share",
    tags: ["sci-fi", "anthology", "professional"],
    postedDate: "2 days ago",
    applications: 23,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Webcomic Artist Needed",
    description:
      "I have a completed script for a fantasy webcomic series and need a talented artist to bring it to life. Long-term collaboration with potential for monetization.",
    author: {
      name: "Mike Rodriguez",
      avatar: "/default-image/comic2.jpg?height=32&width=32",
      role: "Writer",
      verified: false,
    },
    type: "comic",
    status: "open",
    deadline: "March 30, 2024",
    participants: 1,
    maxParticipants: 2,
    skillsNeeded: ["Digital Art", "Character Design", "Sequential Art"],
    timeCommitment: "Ongoing",
    compensation: "50/50 Split",
    tags: ["fantasy", "webcomic", "long-term"],
    postedDate: "5 days ago",
    applications: 12,
    isFeatured: false,
  },
  {
    id: 3,
    title: "Contest Entry Team Formation",
    description:
      "The International Comic Contest is coming up! Looking for team members to create an award-winning entry. Previous contest experience preferred.",
    author: {
      name: "Emma Wilson",
      avatar: "/default-image/comic2.jpg?height=32&width=32",
      role: "Art Director",
      verified: true,
    },
    type: "contest",
    status: "urgent",
    deadline: "March 20, 2024",
    participants: 3,
    maxParticipants: 5,
    skillsNeeded: ["Concept Art", "Writing", "Lettering", "Coloring"],
    timeCommitment: "1 month intensive",
    compensation: "Prize Money Split",
    tags: ["contest", "team", "award"],
    postedDate: "1 day ago",
    applications: 18,
    isFeatured: true,
  },
  {
    id: 4,
    title: "Art Collaboration Exchange",
    description:
      "Artist looking for another artist to do art trades and collaborative pieces. Great for portfolio building and skill sharing.",
    author: {
      name: "Alex Thompson",
      avatar: "/default-image/comic2.jpg?height=32&width=32",
      role: "Digital Artist",
      verified: false,
    },
    type: "art",
    status: "open",
    deadline: "Ongoing",
    participants: 1,
    maxParticipants: 3,
    skillsNeeded: ["Digital Art", "Traditional Art"],
    timeCommitment: "Flexible",
    compensation: "Art Trade",
    tags: ["art-trade", "portfolio", "skill-sharing"],
    postedDate: "1 week ago",
    applications: 7,
    isFeatured: false,
  },
  {
    id: 5,
    title: "Writing Critique Partnership",
    description:
      "Experienced writer seeking other writers for regular script exchanges and detailed critiques. Focus on improving storytelling and character development.",
    author: {
      name: "Jennifer Park",
      avatar: "/default-image/comic2.jpg?height=32&width=32",
      role: "Script Writer",
      verified: true,
    },
    type: "writing",
    status: "open",
    deadline: "March 25, 2024",
    participants: 2,
    maxParticipants: 4,
    skillsNeeded: ["Script Writing", "Story Development"],
    timeCommitment: "2 hours/week",
    compensation: "Mutual Benefit",
    tags: ["critique", "writing", "improvement"],
    postedDate: "3 days ago",
    applications: 9,
    isFeatured: false,
  },
]

export default function CollaborationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const filteredCollaborations = collaborations.filter((collab) => {
    const matchesSearch =
      collab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collab.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || collab.type === selectedType
    return matchesSearch && matchesType
  })

  const myCollaborations = collaborations.filter((collab) => collab.participants > 1)
  const featuredCollaborations = collaborations.filter((collab) => collab.isFeatured)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Collaborations</h1>
          <p className="text-muted-foreground">
            Find partners for your creative projects and join exciting collaborations
          </p>
        </div>
        <Button>
          <Link href="/community/collaborations/create">
            <Plus className="mr-2 h-4 w-4" />
            Post Collaboration
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
                placeholder="Search collaborations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {collaborationTypes.map((type) => (
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
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="applications">Most Applications</SelectItem>
                  <SelectItem value="participants">Most Participants</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Collaborations</TabsTrigger>
          <TabsTrigger value="my-collaborations">My Collaborations</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-6">
            {filteredCollaborations.map((collab, index) => (
              <motion.div
                key={collab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">{collab.title}</CardTitle>
                          {collab.isFeatured && (
                            <Badge className="bg-yellow-500 text-yellow-900">
                              <Star className="mr-1 h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                          {collab.status === "urgent" && <Badge variant="destructive">Urgent</Badge>}
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="capitalize">
                            {collab.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">Posted {collab.postedDate}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">{collab.applications} applications</div>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">{collab.description}</CardDescription>

                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={collab.author.avatar || "/default-image/comic2.jpg"} alt={collab.author.name} />
                        <AvatarFallback>{collab.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{collab.author.name}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{collab.author.role}</span>
                        {collab.author.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Deadline:</span>
                        <div className="font-medium">{collab.deadline}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Participants:</span>
                        <div className="font-medium">
                          {collab.participants}/{collab.maxParticipants}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time Commitment:</span>
                        <div className="font-medium">{collab.timeCommitment}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Compensation:</span>
                        <div className="font-medium">{collab.compensation}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Skills Needed:</div>
                      <div className="flex flex-wrap gap-1">
                        {collab.skillsNeeded.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {collab.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-collaborations" className="space-y-4">
          {myCollaborations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Handshake className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No active collaborations</h3>
                <p className="text-muted-foreground mb-4">
                  Join collaborations to work with other creators on exciting projects
                </p>
                <Button >
                  <Link href="/community/collaborations">Browse Collaborations</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {myCollaborations.map((collab, index) => (
                <motion.div
                  key={collab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow border-primary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-xl">{collab.title}</CardTitle>
                          <Badge className="bg-green-500 text-white w-fit">Participating</Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          View Project
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Deadline:</span>
                          <div className="font-medium">{collab.deadline}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Participants:</span>
                          <div className="font-medium">
                            {collab.participants}/{collab.maxParticipants}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <div className="font-medium capitalize">{collab.status}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured" className="space-y-4">
          <div className="space-y-6">
            {featuredCollaborations.map((collab, index) => (
              <motion.div
                key={collab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow border-yellow-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">{collab.title}</CardTitle>
                          <Badge className="bg-yellow-500 text-yellow-900">
                            <Star className="mr-1 h-3 w-3" />
                            Featured
                          </Badge>
                          {collab.status === "urgent" && <Badge variant="destructive">Urgent</Badge>}
                        </div>
                        <Badge variant="outline" className="capitalize w-fit">
                          {collab.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">{collab.applications} applications</div>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">{collab.description}</CardDescription>

                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={collab.author.avatar || "/default-image/comic2.jpg"} alt={collab.author.name} />
                        <AvatarFallback>{collab.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{collab.author.name}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{collab.author.role}</span>
                        {collab.author.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Deadline:</span>
                        <div className="font-medium">{collab.deadline}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Participants:</span>
                        <div className="font-medium">
                          {collab.participants}/{collab.maxParticipants}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Compensation:</span>
                        <div className="font-medium">{collab.compensation}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Skills Needed:</div>
                      <div className="flex flex-wrap gap-1">
                        {collab.skillsNeeded.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
