"use client"

import { useRef, useState } from "react"
import Slider from "react-slick"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Star, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { dummyComics } from "@/data/comics"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Section from "../shared/section"
import { LeftButton, RightButton } from "../shared/left-right-button"

export function HeroSection() {
  const sliderRef = useRef<Slider | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const featuredComics = dummyComics.slice(0, 3)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
    pauseOnHover: true,
    beforeChange: (_: number, next: number) => setCurrentSlide(next), // Track active slide
  }

  const nextSlide = () => sliderRef.current?.slickNext()
  const prevSlide = () => sliderRef.current?.slickPrev()
  const goToSlide = (index: number) => sliderRef.current?.slickGoTo(index)

  return (
    <div className="relative h-[70vh] overflow-hidden bg-black">
      <Slider {...settings} ref={sliderRef} className="h-full">
        {featuredComics.map((comic, index) => (
          <div key={comic.id} className="h-[70vh] relative">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={"/default-image/comic2.jpg"}
                alt={comic.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center h-full w-full">
              <Section variant="transparent" className="space-y-7">
                <Badge variant="secondary" className="mb-4">
                  {comic.category}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {comic.title}
                </h1>
                <p className="text-lg text-gray-200 mb-6 line-clamp-3">{comic.description}</p>

                <div className="flex items-center space-x-6 text-white">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{comic.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-5 w-5" />
                    <span>{comic.views.toLocaleString()} views</span>
                  </div>
                  <Badge variant="outline" className="text-white border-white">
                    {comic.status}
                  </Badge>
                </div>

                <div className="flex items-center space-x-4">
                  <Button size="lg" variant="gradient" icon={ <Play className="h-5 w-5" />} className="text-white">
                    <Link href={`/comics/${comic.id}`}>
                      Read Now
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-black bg-transparent"
                  >
                    Add to Wishlist
                  </Button>
                </div>
              </Section>
            </div>
          </div>
        ))}
      </Slider>

      {/* Navigation & Indicators inside max-w */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <Section variant="transparent" className="flex justify-between items-center">
          {/* Slide Indicators */}
          <div className="flex flex-row space-x-2">
            {featuredComics.map((_, idx) => (
              <button
                key={idx}
                className={`w-9 h-1.5 rounded-full cursor-pointer transition-colors ${
                  idx === currentSlide ? "bg-white" : "bg-white/40 hover:bg-white/60"
                }`}
                onClick={() => goToSlide(idx)}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex flex-row  gap-3">

            <LeftButton onClick={prevSlide} />
            <RightButton onClick={nextSlide} />

          </div>
        </Section>
      </div>
    </div>
  )
}
