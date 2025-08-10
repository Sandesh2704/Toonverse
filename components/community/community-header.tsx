"use client"

import { Bell, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function CommunityHeader() {
  return (
    <header className="flex h-16 shrink-0 top-0 bg-white  sticky  items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/community">Community</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Hub</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search community..." className="w-[200px] pl-8 md:w-[300px]" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger >
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Create New</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New Discussion</DropdownMenuItem>
            <DropdownMenuItem>New Group</DropdownMenuItem>
            <DropdownMenuItem>New Event</DropdownMenuItem>
            <DropdownMenuItem>Collaboration Post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger >
            <Button variant="outline" size="icon" className="relative bg-transparent">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Community Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">New reply in "Writing Tips"</p>
                <p className="text-xs text-muted-foreground">Sarah replied to your discussion</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Event reminder</p>
                <p className="text-xs text-muted-foreground">Virtual meetup starts in 1 hour</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">New group invitation</p>
                <p className="text-xs text-muted-foreground">You've been invited to "Manga Artists"</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
