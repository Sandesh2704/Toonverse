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
import { dummyComics } from "@/data/comics"

export function LatestSection() {
  const { latest } = useSelector((state: RootState) => state.comics)
  const sliderRef = useRef<Slider | null>(null)
   const staticLatestComics  =  dummyComics.slice(0, 6)
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