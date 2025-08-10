import React from "react"
import Link from "next/link"

interface SidebarItemProps {
  title: string
  url: string
  icon: React.ElementType
}

export  const SidebarItem: React.FC<SidebarItemProps> = ({ title, url, icon: Icon }) => (
  <Link href={url} className="sidebar-item">
    <span className="sidebar-icon">
      <Icon size={20} />
    </span>
    <span className="sidebar-title">{title}</span>
  </Link>
)