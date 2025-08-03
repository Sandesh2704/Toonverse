"use client"

import type React from "react"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { CommunitySidebar } from "@/components/community/community-sidebar"
import { CommunityHeader } from "@/components/community/community-header"
import { ChatProvider } from "@/components/chat/chat-provider"

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ChatProvider>
      <SidebarProvider>
        <CommunitySidebar />
        <SidebarInset>
          <CommunityHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </ChatProvider>
  )
}
