"use client"

import { motion } from "framer-motion"

interface ReadingProgressBarProps {
  progress: number
}

export function ReadingProgressBar({ progress }: ReadingProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/20">
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-primary/60"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  )
}
