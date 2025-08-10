"use client"

import { HeroSection } from "@/components/home/hero-section"
import { FeaturedSection } from "@/components/home/featured-section"

import { WritersSection } from "@/components/home/writers-section"
import { LatestSection } from "@/components/home/latest-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { TrendingSection } from "@/components/home/trending-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedSection />
      <TrendingSection />
      <WritersSection />
      <LatestSection />
      <CategoriesSection />
      {/* <NewsletterSection /> */}
    </div>
  )
}
