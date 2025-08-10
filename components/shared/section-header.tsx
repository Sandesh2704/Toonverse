// components/sections/section-header.tsx
"use client"

import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface SectionHeaderProps {
  icon: LucideIcon
  title: string
  description: string
  viewAllLink?: string
  iconBg?: string
  iconColor?: string
}

export function SectionHeader({
  icon: Icon,
  title,
  description,
  viewAllLink,
  iconBg = "bg-orange-100",
  iconColor = "text-orange-600"
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-3xl font-bold ">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      {viewAllLink && (
        <Button variant="outline" icon={<ArrowRight className="ml-2 h-4 w-4" />}>
          <Link href={viewAllLink}>
            View All
            
          </Link>
        </Button>
      )}
    </div>
  )
}