"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X, User, LogOut, Settings, BookOpen, PenTool, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/useAuth"
import Section from "./section"
import AuthModal from "./auth-modal"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Comics", href: "/comics" },
  { name: "Community", href: "/community" },
  { name: "Writers", href: "/writers" },
]

export function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search logic
      console.log("Searching for:", searchQuery)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Section paddingY="sm" >
        <div className=" flex  items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IS</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              InkSaga
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search comics, writers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </form>
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger >
                  <Button variant="ghost" className="relative h-10  w-10 rounded-full">
                    <Avatar className="w-10 h-10 cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} className="bg-gradient-to-r from-purple-500 to-pink-500" />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      <Badge variant={user.role === "writer" ? "default" : "secondary"} className="w-fit mt-1">
                        {user.role}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem >
                    <Link href="/my-account" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Account</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem >
                    <Link href="/dashboard" className="flex items-center">
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "writer" && (
                    <DropdownMenuItem >
                      <Link href="/writer" className="flex items-center">
                        <PenTool className="mr-2 h-4 w-4" />
                        <span>Writer Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === "reader" && (
                    <DropdownMenuItem >
                      <Link href="/auth/become-writer" className="flex items-center">
                        <PenTool className="mr-2 h-4 w-4" />
                        <span>Become a Writer</span>
                      </Link>
                    </DropdownMenuItem>
                  )}

   <DropdownMenuItem >
                    <Link href="/writer" className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <span>YourChannels</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem >
                    <Link href="/community" className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <span>Community</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem >
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="hidden md:flex" >
                  <Link href="/auth/become-writer">Become Writer</Link>
                </Button>
                <Button onClick={() => setIsAuthModalOpen(true)}>
                 Sign In
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </Section>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background"
          >
            <div className="container py-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search comics, writers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
              </form>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth */}
              {!user && (
                <div className="flex space-x-2 pt-4 border-t">
                  <Button variant="outline" className="flex-1 bg-transparent" >
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button className="flex-1" >
                    <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
