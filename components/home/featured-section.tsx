"use client"

import Slider from "react-slick"
import { ComicCard } from "@/components/comics/comic-card"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { LeftButton, RightButton } from "@/components/shared/left-right-button"
import { SectionHeader } from "../shared/section-header"
import { useRef } from "react"
import Section from "../shared/section"

// Static data for when we don't have enough featured comics
const staticFeaturedComics = [
  {
    id: "featured-static-1",
    title: "Epic Legends",
    description: "Tales of heroes from ancient times that shaped our world.",
    thumbnail: "/placeholder.svg",
    rating: 4.9,
    views: 18200,
    status: "ongoing",
    author: "Legendary Tales",
    authorId: "author-f1",
    tags: ["Epic", "Fantasy", "Adventure"],
    episodes: Array(20).fill({})
  },
  {
    id: "featured-static-2",
    title: "Neon Shadows",
    description: "Cyber-enhanced detectives solving crimes in 2150.",
    thumbnail: "/placeholder.svg",
    rating: 4.7,
    views: 14500,
    status: "ongoing",
    author: "Cyber Noir",
    authorId: "author-f2",
    tags: ["Cyberpunk", "Mystery", "Sci-Fi"],
    episodes: Array(15).fill({})
  },
  {
    id: "featured-static-3",
    title: "The Last Kingdom",
    description: "A fallen prince fights to reclaim his birthright.",
    thumbnail: "/placeholder.svg",
    rating: 4.8,
    views: 16800,
    status: "completed",
    author: "Historical Fiction",
    authorId: "author-f3",
    tags: ["Historical", "Drama", "Action"],
    episodes: Array(30).fill({})
  },
  {
    id: "featured-static-4",
    title: "Galactic Explorers",
    description: "Bold astronauts discovering new civilizations.",
    thumbnail: "/placeholder.svg",
    rating: 4.6,
    views: 13200,
    status: "ongoing",
    author: "Space Odyssey",
    authorId: "author-f4",
    tags: ["Space", "Adventure", "Sci-Fi"],
    episodes: Array(12).fill({})
  },
  {
    id: "featured-static-5",
    title: "Mystic Academy",
    description: "Young wizards learning ancient magic in a hidden school.",
    thumbnail: "/placeholder.svg",
    rating: 4.5,
    views: 11500,
    status: "ongoing",
    author: "Magic Pen",
    authorId: "author-f5",
    tags: ["Magic", "School", "Fantasy"],
    episodes: Array(18).fill({})
  },
  {
    id: "featured-static-6",
    title: "Samurai's Honor",
    description: "A warrior's journey through feudal Japan.",
    thumbnail: "/placeholder.svg",
    rating: 4.7,
    views: 15700,
    status: "completed",
    author: "Eastern Tales",
    authorId: "author-f6",
    tags: ["Historical", "Samurai", "Drama"],
    episodes: Array(25).fill({})
  }
]

export function FeaturedSection() {
  const { featured } = useSelector((state: RootState) => state.comics)
  const sliderRef = useRef<Slider | null>(null)

  // Combine featured comics with static comics if needed
  const comicsToShow = featured.length > 0
    ? [...featured, ...staticFeaturedComics.slice(0, Math.max(0, 6 - featured.length))]
    : staticFeaturedComics

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Showing 3 at a time since they're featured and likely larger
    slidesToScroll: 1,
    arrows: false, // We'll use our custom buttons
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
          icon={ArrowRight}
          title="Featured Comics"
          description="Hand-picked comics that you shouldn't miss"
          viewAllLink="/comics"
        />

        <div className="relative">
          <Slider {...sliderSettings} ref={sliderRef} className="featured-slider">
            {comicsToShow.map((comic) => (
              <div key={comic.id} className="px-2">
                <ComicCard comic={comic} featured />
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