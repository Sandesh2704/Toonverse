"use client"

import { motion } from "framer-motion"
import Marquee from "react-fast-marquee"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { categories } from "@/data/comics"
import {
  Sword,
  Zap,
  Heart,
  Skull,
  Laugh,
  Drama,
  Ghost,
  Coffee,
  Crown,
  Sparkles,
  BookOpen,
  Gamepad2,
  Wand2,
  Castle,
  CircuitBoard,
  Trees,
  Plane,
  Music,
  UtensilsCrossed,
  PawPrint,
  Globe,
  Satellite,
  Telescope
} from "lucide-react"
import Section from "../shared/section"

const categoryIcons = {
  Fantasy: Castle,
  "Sci-Fi": Satellite,
  Romance: Heart,
  Action: Sword,
  Adventure: Globe,
  Mystery: Zap,
  Horror: Skull,
  Comedy: Laugh,
  Drama: Drama,
  Supernatural: Sparkles,
  "Slice of Life": Coffee,
  Thriller: Skull,
  Historical: Crown,
  "Science Fiction": Telescope,
  "Romantic Comedy": Heart,
  "Action & Adventure": Sword,
  "Fantasy & Magic": Wand2,
  "Sports & Games": Gamepad2,
  "Magic & Superpowers": Sparkles,
  "Mythology & Folklore": Castle,
  "Thriller & Suspense": Zap,
  "Cyberpunk & Steampunk": CircuitBoard,
  "Post-Apocalyptic": Skull,
  "Urban & City Life": Trees,
  "School & Slice of Life": BookOpen,
  "Music & Performing Arts": Music,
  "Food & Cooking": UtensilsCrossed,
  "Pets & Animals": PawPrint,
  "Technology & Gadgets": CircuitBoard,
  "Travel & Adventure": Plane,
  "Historical Fiction": Crown,
  "Fantasy Realms": Wand2,
  "Superhero Adventures": Sparkles,
  "Mystical Creatures": Castle,
  "Space & Galaxy": Satellite,
  "Classic Literature": BookOpen
}

function CategoryCard({ category }: { category: string }) {
  const Icon = categoryIcons[category as keyof typeof categoryIcons] || BookOpen
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer mx-2 w-44 h-44 flex flex-col">
      <CardContent className="p-4 flex flex-col flex-1 text-center justify-between">
        <Link href={`/comics/categories/${category.toLowerCase()}`} className="flex flex-col flex-1">
          <div className="flex flex-col items-center space-y-3 flex-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-semibold group-hover:text-primary transition-colors text-sm line-clamp-2 h-10">
                {category}
              </h3>
              <Badge variant="secondary" className="mt-1">
                {Math.floor(Math.random() * 50) + 10} comics
              </Badge>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}


export function CategoriesSection() {
  // Split categories into 3 roughly equal rows
  const rowSize = Math.ceil(categories.length / 3)
  const rows = [
    categories.slice(0, rowSize),
    categories.slice(rowSize, rowSize * 2),
    categories.slice(rowSize * 2)
  ]

  return (
    <Section variant="gradient" className="py-16 ">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover comics across different genres and find your next favorite story
          </p>
        </motion.div>

        <div className="flex flex-col relative gap-4">
           <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-purple-50 via-purple-50/70 to-transparent z-10 pointer-events-none"></div>
      {/* Gradient overlay right */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-indigo-50 via-indigo-50/70 to-transparent z-10 pointer-events-none"></div>

          {rows.map((row, rowIndex) => (
            <Marquee
              key={rowIndex}
              pauseOnHover
              gradient={false}
              speed={40 + rowIndex * 10} // slightly different speed for each row
              direction={rowIndex % 2 === 0 ? "left" : "right"} // alternate scroll direction
            >
              {row.map((category) => (
                <CategoryCard key={category} category={category} />
              ))}
            </Marquee>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" size="lg">
            <Link href="/comics/categories">View All Categories</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
