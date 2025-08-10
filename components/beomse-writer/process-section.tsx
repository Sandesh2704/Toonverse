"use client"
import React from "react"
import { motion } from "framer-motion"
import {CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProcessSection() {
 const processSteps = [
    {
      step: "1",
      title: "Submit Application",
      description: "Fill out this comprehensive application form with your details and portfolio"
    },
    {
      step: "2", 
      title: "Review Process",
      description: "Our team reviews your application within 3-5 business days"
    },
    {
      step: "3",
      title: "Account Setup",
      description: "Once approved, you'll receive access to your writer dashboard"
    },
    {
      step: "4",
      title: "Create & Publish",
      description: "Start creating comics using our tools and publish after owner approval"
    },
    {
      step: "5",
      title: "Start Earning",
      description: "Begin earning revenue once your comics gain readership and views"
    }
  ]

    return (
     <Card className="shadow-xl border-0 ">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6" />
                    Application Process
                  </CardTitle>
                  <CardDescription>
                    Here's how the writer application and onboarding process works
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {processSteps.map((process, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                          {process.step}
                        </div>
                        <h3 className="font-semibold mb-2">{process.title}</h3>
                        <p className="text-sm text-muted-foreground">{process.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
  )
}
