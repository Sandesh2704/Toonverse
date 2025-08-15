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
import { Home, MessageSquare, Users, Calendar, Handshake, Settings, ChevronUp, LogOut, Hash, User } from "lucide-react"

const menuItems = [
  {
    title: "Community",
    items: [
      {
        title: "Overview",
        url: "/community",
        icon: Home,
      },
      {
        title: "Chat",
        url: "/community/chat",
        icon: MessageSquare,
        badge: "chat",
      },
      {
        title: "Forums",
        url: "/community/forums",
        icon: MessageSquare,
      },
      {
        title: "Groups",
        url: "/community/groups",
        icon: Users,
      },
    ],
  },
  {
    title: "Activities",
    items: [
      {
        title: "Events",
        url: "/community/events",
        icon: Calendar,
      },
      {
        title: "Collaborations",
        url: "/community/collaborations",
        icon: Handshake,
      },
    ],
  },
]

export function CommunitySidebar() {
  const pathname = usePathname()
  const { user } = useSelector((state: RootState) => state.user)
  const { activeRooms } = useSelector((state: RootState) => state.chat)

  const totalUnreadMessages = activeRooms.reduce((acc, room) => acc + room.unreadCount, 0)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Link href="/community" className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Users className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Community Hub</span>
                  <span className="truncate text-xs">Connect & Collaborate</span>
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
                {group.items.map((item) => {
                  const showBadge = item.badge === "chat" && totalUnreadMessages > 0
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={pathname === item.url}>
                        <Link href={item.url}>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                          {showBadge && (
                            <Badge variant="destructive" className="ml-auto h-5 w-5 p-0 text-xs rounded-full">
                              {totalUnreadMessages}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Quick Chat Access */}
      <SidebarGroup>
        <SidebarGroupLabel>Quick Chat</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {activeRooms.slice(0, 3).map((room) => (
              <SidebarMenuItem key={room.id}>
                <SidebarMenuButton asChild>
                  <Link href={`/community/chat/${room.id}`}>
                    <div className="flex items-center gap-2 w-full">
                      {room.type === "group" ? (
                        <Hash className="h-3 w-3 text-muted-foreground" />
                      ) : (
                        <User className="h-3 w-3 text-muted-foreground" />
                      )}
                      <span className="text-xs truncate flex-1">{room.name}</span>
                      {room.unreadCount > 0 && (
                        <Badge variant="destructive" className="h-4 w-4 p-0 text-xs rounded-full">
                          {room.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent  w-full data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatar || "/default-image/comic2.jpg"}  alt={user?.name} />
                    <AvatarFallback className="rounded-lg">{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <Badge className="w-fit text-xs bg-blue-100 text-blue-800">Member</Badge>
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
                      <Badge className="w-fit text-xs bg-blue-100 text-blue-800">Member</Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/" className="flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Community Settings
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