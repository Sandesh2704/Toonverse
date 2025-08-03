"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { categories } from "@/data/comics"
import { Sword, Zap, Heart, Skull, Laugh, Drama, Ghost, Coffee, Crown, Sparkles, BookOpen } from "lucide-react"

const categoryIcons = {
  Fantasy: Sword,
  "Sci-Fi": Zap,
  Romance: Heart,
  Action: Sword,
  Adventure: BookOpen,
  Mystery: Ghost,
  Horror: Skull,
  Comedy: Laugh,
  Drama: Drama,
  Supernatural: Sparkles,
  "Slice of Life": Coffee,
  Historical: Crown,
}

export function CategoriesSection() {
  return (
    <section className="py-16">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons] || BookOpen
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Link href={`/comics/categories/${category.toLowerCase()}`}>
                      <div className="flex flex-col items-center space-y-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold group-hover:text-primary transition-colors">{category}</h3>
                          <Badge variant="secondary" className="mt-1">
                            {Math.floor(Math.random() * 50) + 10} comics
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/comics/categories">View All Categories</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
