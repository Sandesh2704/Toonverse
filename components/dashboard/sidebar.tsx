import type React from "react"
import { Home, BookOpen, BarChart, Settings, Grid3X3 } from "lucide-react"
import { SidebarItem } from "./sidebarItem"



const Sidebar: React.FC = () => {
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
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
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="sidebar">
      {items.map((item, index) => (
        <SidebarItem key={index} title={item.title} url={item.url} icon={item.icon} />
      ))}
    </div>
  )
}

export default Sidebar
