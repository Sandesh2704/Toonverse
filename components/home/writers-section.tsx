"use client"

import { useRef, useState } from "react"
import Slider from "react-slick"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, BookOpen, Eye, CheckCircle, Star } from "lucide-react"
import Link from "next/link"
import { LeftButton, RightButton } from "@/components/shared/left-right-button"
import Section from "../shared/section"
import { dummyWriters } from "@/data/writers"


export function WritersSection() {
  const [followingStates, setFollowingStates] = useState<Record<string, boolean>>(
    dummyWriters.reduce(
      (acc, writer) => ({
        ...acc,
        [writer.id]: writer.isFollowing || false,
      }),
      {},
    ),
  )
  const sliderRef = useRef<Slider>(null)

  const handleFollow = (writerId: string) => {
    setFollowingStates((prev) => ({
      ...prev,
      [writerId]: !prev[writerId],
    }))
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const nextSlide = () => sliderRef.current?.slickNext()
  const prevSlide = () => sliderRef.current?.slickPrev()

  return (
    <Section variant="gradient" className="py-16">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">Featured Writers</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover talented creators and their amazing stories. Follow your favorite writers to stay updated with
          their latest work.
        </p>
      </div>

      {/* Writers Slider */}
      <div className="relative">
        <Slider {...sliderSettings} ref={sliderRef} className="writers-slider">
          {dummyWriters.map((writer) => (
            <div key={writer.id} className="p-2">
              <Card className="h-full hover:shadow-xl transition-all duration-300 py-0 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  {/* Writer Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                        <AvatarImage src={writer.avatar} alt={writer.name} />
                        <AvatarFallback className="text-lg font-semibold">
                          {writer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-lg">{writer.name}</h3>
                          {writer.isVerified && <CheckCircle className="w-5 h-5 text-blue-600" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{writer.username}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{writer.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={followingStates[writer.id] ? "outline" : "default"}
                      onClick={() => handleFollow(writer.id)}
                      className="shrink-0"
                    >
                      {followingStates[writer.id] ? "Following" : "Follow"}
                    </Button>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{writer.bio}</p>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {writer.genres.slice(0, 3).map((genre) => (
                      <Badge key={genre} variant="secondary" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm font-semibold">
                        {writer.followers >= 1000 ? `${(writer.followers / 1000).toFixed(1)}K` : writer.followers}
                      </p>
                      <p className="text-xs text-muted-foreground">Followers</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <BookOpen className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm font-semibold">{writer.totalComics}</p>
                      <p className="text-xs text-muted-foreground">Comics</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Eye className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm font-semibold">
                        {writer.totalViews >= 1000000
                          ? `${(writer.totalViews / 1000000).toFixed(1)}M`
                          : `${(writer.totalViews / 1000).toFixed(0)}K`}
                      </p>
                      <p className="text-xs text-muted-foreground">Views</p>
                    </div>
                  </div>

                  {/* Latest Comic */}
                  <div className="border-t pt-4">
                    <p className="text-xs text-muted-foreground mb-1">Latest Comic:</p>
                    <p className="font-medium text-sm mb-3">{writer.latestComic}</p>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={`/writer/${writer.id}`}>View Profile</Link>
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                        <Link href={`/writer/${writer.id}/comics`}>View Comics</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </div>

      {/* View All Writers Button */}
      <div className="flex justify-between mt-4">
        <Button size="lg" icon={<Users className="w-5 h-5" />} asChild>
          <Link href="/writers">View All Writers</Link>
        </Button>

        <div className="flex gap-3">
          <LeftButton onClick={prevSlide} />
          <RightButton onClick={nextSlide} />
        </div>
      </div>
    </Section>
  )
}