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
  Users,
  PenTool,
  MessageSquare,
  BarChart3,
  Settings,
  FileText,
  Crown,
  Shield,
  Home,
  LogOut,
  ChevronUp,
} from "lucide-react"

const menuItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        roles: ["super_admin", "admin", "maintainer"],
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: BarChart3,
        roles: ["super_admin", "admin"],
      },
    ],
  },
  {
    title: "Content Management",
    items: [
      {
        title: "Comics",
        url: "/dashboard/comics",
        icon: BookOpen,
        roles: ["super_admin", "admin", "maintainer"],
      },
      {
        title: "Episodes",
        url: "/dashboard/episodes",
        icon: FileText,
        roles: ["super_admin", "admin", "maintainer"],
      },
      {
        title: "Comments",
        url: "/dashboard/comments",
        icon: MessageSquare,
        roles: ["super_admin", "admin", "maintainer"],
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
        roles: ["super_admin", "admin"],
      },
      {
        title: "Writers",
        url: "/dashboard/writers",
        icon: PenTool,
        roles: ["super_admin", "admin", "maintainer"],
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
        roles: ["super_admin", "admin"],
      },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user } = useSelector((state: RootState) => state.user)

  const hasAccess = (roles: string[]) => {
    return user && roles.includes(user.role)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "super_admin":
        return <Crown className="h-4 w-4 text-yellow-500" />
      case "admin":
        return <Shield className="h-4 w-4 text-blue-500" />
      case "maintainer":
        return <Settings className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getRoleBadge = (role: string) => {
    const variants = {
      super_admin: "bg-yellow-100 text-yellow-800",
      admin: "bg-blue-100 text-blue-800",
      maintainer: "bg-green-100 text-green-800",
    }
    return variants[role as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">InkSaga</span>
                  <span className="truncate text-xs">Admin Panel</span>
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
                {group.items
                  .filter((item) => hasAccess(item.roles))
                  .map((item) => (
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
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback className="rounded-lg">{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <div className="flex items-center space-x-1">
                      {getRoleIcon(user?.role || "")}
                      <span className="truncate text-xs capitalize">{user?.role?.replace("_", " ")}</span>
                    </div>
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
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback className="rounded-lg">{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.name}</span>
                      <Badge className={`w-fit text-xs ${getRoleBadge(user?.role || "")}`}>
                        {user?.role?.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
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
