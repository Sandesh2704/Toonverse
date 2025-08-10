"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, X, DollarSign, TrendingUp, Users, Shield, Edit3, BarChart3, Globe, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BenefitsSection() {

      const benefits = [
        {
          icon: <DollarSign className="h-6 w-6 text-green-500" />,
          title: "Earn Revenue",
          description: "Earn 30% revenue share from every page view once your comics start gaining traction"
        },
        {
          icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
          title: "Analytics Dashboard",
          description: "Track your comic performance, reader engagement, and earnings with detailed analytics"
        },
        {
          icon: <Users className="h-6 w-6 text-purple-500" />,
          title: "Global Audience",
          description: "Reach millions of comic readers worldwide on our international platform"
        },
        {
          icon: <Edit3 className="h-6 w-6 text-orange-500" />,
          title: "Creative Freedom",
          description: "Full creative control over your stories with our easy-to-use comic creation tools"
        },
        {
          icon: <Shield className="h-6 w-6 text-red-500" />,
          title: "Content Protection",
          description: "Your work is protected with our copyright system and secure hosting"
        },
        {
          icon: <BarChart3 className="h-6 w-6 text-indigo-500" />,
          title: "Growth Support",
          description: "Marketing support and promotional opportunities to help grow your readership"
        }
      ]
    

  return (
     <Card className="shadow-xl  border-0 ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6" />
                Why Join InkSaga?
              </CardTitle>
              <CardDescription>
                Discover the benefits of becoming a writer on our global comic reading platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-start p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                  >
                    <div className="mb-3">{benefit.icon}</div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
  )
}
