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
  UserCog,
  Shield,
  Server,
  Package,
  CreditCard,
  BarChart, Grid3X3
} from "lucide-react"

const menuItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: BarChart3,
      },
      {
        title: "Comics",
        url: "/dashboard/comics",
        icon: BookOpen,
      },
      {
        title: "Categories",
        url: "/dashboard/categories",
        icon: Grid3X3,
      },
       {
        title: "Writers Applications",
        url: "/dashboard/writers-applications",
        icon: Users,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Content",
        url: "/dashboard/content",
        icon: BookOpen,
      },
      {
        title: "Submissions",
        url: "/dashboard/submissions",
        icon: Upload,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Roles & Permissions",
        url: "/dashboard/roles",
        icon: Shield,
      },
      {
        title: "Server Status",
        url: "/dashboard/server",
        icon: Server,
      },
      {
        title: "Billing",
        url: "/dashboard/billing",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: UserCog,
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user } = useSelector((state: RootState) => state.user)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Shield className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin Dashboard</span>
                  <span className="truncate text-xs">Management Console</span>
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
              <DropdownMenuTrigger>
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
                    <Badge className="w-fit text-xs bg-purple-100 text-purple-800">
                      {user?.role?.replace('_', ' ')}
                    </Badge>
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
                      <Badge className="w-fit text-xs bg-purple-100 text-purple-800">
                        {user?.role?.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/" className="flex items-center">
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