"use client"

import Slider from "react-slick"
import { ComicCard } from "@/components/comics/comic-card"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { LeftButton, RightButton } from "@/components/shared/left-right-button"
import { SectionHeader } from "../shared/section-header"
import { useRef } from "react"
import Section from "../shared/section"

// Static data for when we don't have enough latest comics
const staticLatestComics = [
  {
    id: "latest-static-1",
    title: "New Beginnings",
    description: "A fresh start in a world full of possibilities.",
    thumbnail: "/placeholder.svg",
    rating: 4.5,
    views: 8500,
    status: "ongoing",
    author: "Fresh Start",
    authorId: "author-l1",
    tags: ["Slice of Life", "Drama"],
    episodes: Array(5).fill({}),
    updatedAt: new Date().toISOString()
  },
  {
    id: "latest-static-2",
    title: "Tech Revolution",
    description: "The future is now with groundbreaking inventions.",
    thumbnail: "/placeholder.svg",
    rating: 4.3,
    views: 7200,
    status: "ongoing",
    author: "Future Tech",
    authorId: "author-l2",
    tags: ["Sci-Fi", "Technology"],
    episodes: Array(8).fill({}),
    updatedAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: "latest-static-3",
    title: "Mystery Mansion",
    description: "Secrets hidden in every corner of the old house.",
    thumbnail: "/placeholder.svg",
    rating: 4.6,
    views: 9800,
    status: "ongoing",
    author: "Horror Master",
    authorId: "author-l3",
    tags: ["Horror", "Mystery"],
    episodes: Array(12).fill({}),
    updatedAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  },
  {
    id: "latest-static-4",
    title: "Sports Rivals",
    description: "Intense competition on and off the field.",
    thumbnail: "/placeholder.svg",
    rating: 4.2,
    views: 6500,
    status: "ongoing",
    author: "Sports Fan",
    authorId: "author-l4",
    tags: ["Sports", "Drama"],
    episodes: Array(6).fill({}),
    updatedAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
  },
  {
    id: "latest-static-5",
    title: "Culinary Journey",
    description: "Exploring world cuisines one recipe at a time.",
    thumbnail: "/placeholder.svg",
    rating: 4.4,
    views: 7800,
    status: "ongoing",
    author: "Food Explorer",
    authorId: "author-l5",
    tags: ["Cooking", "Travel"],
    episodes: Array(9).fill({}),
    updatedAt: new Date(Date.now() - 345600000).toISOString() // 4 days ago
  },
  {
    id: "latest-static-6",
    title: "Artistic Dreams",
    description: "A young artist's struggle to find their voice.",
    thumbnail: "/placeholder.svg",
    rating: 4.7,
    views: 9200,
    status: "ongoing",
    author: "Creative Mind",
    authorId: "author-l6",
    tags: ["Art", "Drama"],
    episodes: Array(7).fill({}),
    updatedAt: new Date(Date.now() - 432000000).toISOString() // 5 days ago
  }
]

export function LatestSection() {
  const { latest } = useSelector((state: RootState) => state.comics)
  const sliderRef = useRef<Slider | null>(null)

  // Combine latest comics with static comics if needed
  const comicsToShow = latest.length > 0
    ? [...latest, ...staticLatestComics.slice(0, Math.max(0, 6 - latest.length))]
    : staticLatestComics

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false, // Using custom buttons
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
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
    <Section className="py-16 bg-muted/30">
      <div className="container flex flex-col gap-4">
        <SectionHeader
          icon={Clock}
          title="Latest Updates"
          description="Recently updated comics with new episodes"
          viewAllLink="/comics?sort=latest"
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <div className="relative">
          <Slider {...sliderSettings} ref={sliderRef} className="latest-slider">
            {comicsToShow.map((comic) => (
              <div key={comic.id} className="px-2">
                <ComicCard 
                  comic={comic} 
                  showUpdateBadge 
                />
              </div>
            ))}
          </Slider>

          <div className="flex justify-end gap-3 mt-4">
            <LeftButton onClick={prevSlide} />
            <RightButton onClick={nextSlide} />
          </div>
        </div>
      </div>
    </Section>
  )
}