"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  Plus,
  MessageSquare,
  Users,
  Home,
  LogOut,
  ChevronUp,
  PenTool,
  Upload,
  Eye,
  DollarSign,
} from "lucide-react"

const menuItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/writer",
        icon: LayoutDashboard,
      },
      {
        title: "Analytics",
        url: "/writer/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        title: "My Comics",
        url: "/writer/comics",
        icon: BookOpen,
      },
      {
        title: "Episodes",
        url: "/writer/episodes",
        icon: FileText,
      },
      {
        title: "Create New",
        url: "/writer/create",
        icon: Plus,
      },
      {
        title: "Submissions",
        url: "/writer/submissions",
        icon: Upload,
      },
    ],
  },
  {
    title: "Engagement",
    items: [
      {
        title: "Comments",
        url: "/writer/comments",
        icon: MessageSquare,
      },
      {
        title: "Followers",
        url: "/writer/followers",
        icon: Users,
      },
      {
        title: "Reviews",
        url: "/writer/reviews",
        icon: Eye,
      },
    ],
  },
  {
    title: "Monetization",
    items: [
      {
        title: "Earnings",
        url: "/writer/earnings",
        icon: DollarSign,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/writer/profile",
        icon: PenTool,
      },
      {
        title: "Settings",
        url: "/writer/settings",
        icon: Settings,
      },
    ],
  },
]

export function WriterSidebar() {
  const pathname = usePathname()
  const { user } = useSelector((state: RootState) => state.user)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" >
              <Link href="/writer">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <PenTool className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Writer Studio</span>
                  <span className="truncate text-xs">Create & Manage</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger >
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatar || "/default-image/comic2.jpg"} alt={user?.name} />
                    <AvatarFallback className="rounded-lg">{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <Badge className="w-fit text-xs bg-green-100 text-green-800">Writer</Badge>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.avatar || "/default-image/comic2.jpg"} alt={user?.name} />
                      <AvatarFallback className="rounded-lg">{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.name}</span>
                      <Badge className="w-fit text-xs bg-green-100 text-green-800">Writer</Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Website
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
