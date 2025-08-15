"use client"

import Slider from "react-slick"
import { ComicCard } from "@/components/comics/comic-card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { LeftButton, RightButton } from "@/components/shared/left-right-button"
import { SectionHeader } from "../shared/section-header"
import { useRef } from "react"
import Section from "../shared/section"
import { dummyComics } from "@/data/comics"


export function FeaturedSection() {
  const sliderRef = useRef<Slider | null>(null)

  // Use first 6 comics from dummyComics as featured
  const featuredComics = dummyComics.slice(0, 6)

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
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
            {featuredComics.map((comic) => (
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