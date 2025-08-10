"use client"

import React from "react"
import { motion } from "framer-motion"
import Section from "@/components/shared/section"
import BenefitsSection from "@/components/beomse-writer/benefits-section"
import ProcessSection from "@/components/beomse-writer/process-section"
import WriterAppplicationForm from "@/components/beomse-writer/writer-appplication-form"


export default function BecomeWriterPage() {




  return (
    <Section variant="gradient" className="py-16">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Become a Writer
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our community of talented creators and share your comics with readers worldwide
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {/* Benefits Section */}
            <BenefitsSection />

                 {/* Application Form */}
            <WriterAppplicationForm />

            {/* Process Section */}
            <ProcessSection />

       
          </div>
        </motion.div>
      </div>
    </Section>
  )
}