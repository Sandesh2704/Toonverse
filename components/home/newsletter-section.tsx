"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import Section from "../shared/section"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Simulate subscription
    setTimeout(() => {
      setIsSubscribed(true)
      toast.success("Successfully subscribed to newsletter!")
      setEmail("")
    }, 1000)
  }

  return (
    <Section variant="gradient" className="py-16 ">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-8 w-8" />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-2">Stay in the Loop</h2>
              <p className="text-muted-foreground mb-6">
                Get notified about new comic releases, exclusive content, and special offers. Join thousands of comic
                enthusiasts!
              </p>

              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit" size="lg">
                    Subscribe
                  </Button>
                </form>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Thank you for subscribing!</span>
                </div>
              )}

              <p className="text-xs text-muted-foreground mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Section>
  )
}
