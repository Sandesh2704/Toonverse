"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, ExternalLink, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { dummyWriters } from "@/data/writers"

interface WriterDetailPageProps {
  params: { id: string }
}

export default function WriterDetailPage({ params }: WriterDetailPageProps) {
  const router = useRouter()
  const writer = dummyWriters.find((w) => w.id === params.id)

  if (!writer) {
    return <div className="text-center py-10">Writer not found</div>
  }

  const handleApprove = () => {
    toast.success(`Approved ${writer.name}'s application!`)
    router.push("/dashboard/writers")
  }

  const handleReject = () => {
    toast.error(`Rejected ${writer.name}'s application.`)
    router.push("/dashboard/writers")
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/dashboard/writers")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Writers
          </Button>
          <h1 className="text-3xl font-bold">{writer.name}'s Profile</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleApprove} disabled={writer.isVerified}>
            <Check className="h-4 w-4 mr-2" />
            Approve
          </Button>
          <Button variant="destructive" onClick={handleReject} disabled={writer.isVerified}>
            <X className="h-4 w-4 mr-2" />
            Reject
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Writer Profile</CardTitle>
          <CardDescription>Details and application information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={writer.avatar} />
              <AvatarFallback>{writer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xl font-semibold">{writer.name}</div>
              <div className="text-sm text-muted-foreground">{writer.username} • {writer.email}</div>
              <Badge className={writer.isVerified ? "bg-green-500" : "bg-gray-500"}>
                {writer.isVerified ? "Verified" : "Pending"}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">{writer.bio}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <div className="space-y-2">
                <p><strong>Country:</strong> {writer.country}</p>
                <p><strong>Languages:</strong> {writer.languages.join(", ")}</p>
                <p><strong>Join Date:</strong> {writer.joinDate}</p>
                <p><strong>Genres:</strong> {writer.genres.map((genre) => (
                  <Badge key={genre} variant="outline" className="mr-1">{genre}</Badge>
                ))}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Social Links</h3>
            <div className="flex flex-wrap gap-4">
              {Object.entries(writer.socialLinks).map(([platform, url]) => (
                url && (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </a>
                )
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Comics</p>
                <p className="text-lg font-semibold">{writer.totalComics}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-lg font-semibold">{formatNumber(writer.totalViews)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="text-lg font-semibold">{formatNumber(writer.followers)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-lg font-semibold">{writer.rating}/5.0</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {writer.achievements.map((achievement) => (
                <Badge key={achievement} variant="secondary">{achievement}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Latest Comic</h3>
            <p>{writer.latestComic}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}