"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Star, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { dummyComics } from "@/data/comics"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const featuredComics = dummyComics.slice(0, 3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredComics.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [featuredComics.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredComics.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredComics.length) % featuredComics.length)
  }

  return (
    <section className="relative h-[70vh] overflow-hidden">
      <AnimatePresence mode="wait">
        {featuredComics.map(
          (comic, index) =>
            index === currentSlide && (
              <motion.div
                key={comic.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
                <Image src={comic.banner || comic.thumbnail} alt={comic.title} fill className="object-cover" priority />

                <div className="absolute inset-0 z-20 flex items-center">
                  <div className="container">
                    <div className="max-w-2xl space-y-6">
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        <Badge variant="secondary" className="mb-4">
                          {comic.category}
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{comic.title}</h1>
                        <p className="text-lg text-gray-200 mb-6 line-clamp-3">{comic.description}</p>
                      </motion.div>

                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex items-center space-x-6 text-white"
                      >
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
                      </motion.div>

                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex items-center space-x-4"
                      >
                        <Button size="lg" asChild>
                          <Link href={`/comics/${comic.id}`}>
                            <Play className="mr-2 h-5 w-5" />
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
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ),
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {featuredComics.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
