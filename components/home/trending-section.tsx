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
import { dummyComics } from "@/data/comics"

// Static data for when we don't have enough trending comics


export function TrendingSection() {
  const { trending } = useSelector((state: RootState) => state.comics)
  const sliderRef = useRef<Slider | null>(null)

  const staticComics =  dummyComics.slice(0, 6)
  
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