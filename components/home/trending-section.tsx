// components/sections/trending-section-vertical.tsx
"use client"

import Slider from "react-slick"
import { ComicCard } from "@/components/comics/comic-card"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"

import { TrendingUp } from "lucide-react"
import { LeftButton, RightButton } from "@/components/shared/left-right-button"
import { SectionHeader } from "../shared/section-header"
import { useRef } from "react"
import Section from "../shared/section"

// Static data for when we don't have enough trending comics
const staticComics = [
  {
    id: "static-1",
    title: "The Last Hero",
    description: "In a world without heroes, one man stands against darkness.",
    thumbnail: "/placeholder.svg",
    rating: 4.8,
    views: 12500,
    status: "ongoing",
    author: "Alex Writer",
    authorId: "author-1",
    tags: ["Action", "Adventure", "Fantasy"],
    episodes: Array(15).fill({})
  },
  {
    id: "static-2",
    title: "Cyber Dreams",
    description: "Neon-lit streets hide secrets of the digital afterlife.",
    thumbnail: "/placeholder.svg",
    rating: 4.6,
    views: 9800,
    status: "ongoing",
    author: "Neon Author",
    authorId: "author-2",
    tags: ["Sci-Fi", "Cyberpunk", "Thriller"],
    episodes: Array(12).fill({})
  },
  {
    id: "static-3",
    title: "Mystic Forest",
    description: "Ancient magic awakens in the heart of the forbidden woods.",
    thumbnail: "/placeholder.svg",
    rating: 4.9,
    views: 15300,
    status: "completed",
    author: "Elena Novelist",
    authorId: "author-3",
    tags: ["Fantasy", "Mystery", "Magic"],
    episodes: Array(24).fill({})
  },
  {
    id: "static-4",
    title: "Space Pioneers",
    description: "Colonizing Mars was only the beginning of their journey.",
    thumbnail: "/placeholder.svg",
    rating: 4.5,
    views: 8700,
    status: "ongoing",
    author: "Cosmo Tales",
    authorId: "author-4",
    tags: ["Sci-Fi", "Space", "Adventure"],
    episodes: Array(8).fill({})
  },
  {
    id: "static-5",
    title: "Royal Intrigue",
    description: "A game of thrones where every move could be your last.",
    thumbnail: "/placeholder.svg",
    rating: 4.7,
    views: 11200,
    status: "ongoing",
    author: "Historia",
    authorId: "author-5",
    tags: ["Drama", "Historical", "Politics"],
    episodes: Array(18).fill({})
  },
  {
    id: "static-6",
    title: "Ghost Detective",
    description: "Solving crimes only the dead can see.",
    thumbnail: "/placeholder.svg",
    rating: 4.4,
    views: 7600,
    status: "ongoing",
    author: "Mystery Inc",
    authorId: "author-6",
    tags: ["Mystery", "Supernatural", "Horror"],
    episodes: Array(10).fill({})
  }
]

export function TrendingSection() {
  const { trending } = useSelector((state: RootState) => state.comics)
  const sliderRef = useRef<Slider | null>(null)
  
  // Combine trending comics with static comics if needed
  const comicsToShow = trending.length > 0
    ? [...trending, ...staticComics.slice(0, Math.max(0, 6 - trending.length))]
    : staticComics

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false, // We'll use custom arrows
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
    <Section className="py-16">
      <div className="container flex flex-col gap-4">
        <SectionHeader
          icon={TrendingUp}
          title="Trending Now"
          description="Most popular comics this week"
          viewAllLink="/comics/trending"
        />

        {/* Main content area with slider and navigation buttons */}
<div className="relative flex items-stretch h-full gap-2">
  {/* Slider */}
  <div className="flex-1 min-w-0 overflow-hidden h-fit">
    <Slider {...sliderSettings} ref={sliderRef} className="trending-slider">
      {comicsToShow.map((comic, index) => (
        <div key={comic.id} className="px-2">
          <ComicCard
            comic={comic}
            showRank={index + 1}
            showUpdateBadge={index % 3 === 0}
          />
        </div>
      ))}
    </Slider>
  </div>

  {/* Buttons */}
  <div className="grid grid-rows-2 gap-2 h-96">
    <LeftButton onClick={prevSlide} className="h-full" />
    <RightButton onClick={nextSlide} className=" h-full" />
  </div>
</div>





        </div>
    </Section>
  )
}