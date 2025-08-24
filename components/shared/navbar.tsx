"use client";
import type React from "react";
import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {  Search,  Menu,  X,  User,  LogOut,  Settings,  BookOpen,  PenTool,  Users,  Filter as FilterIcon,   MessageCircleMore, // Discord
  Send,  Shuffle,  ChevronRight,    Twitter,  Globe,  Bell, MessageSquare,  Calendar,  UsersRound,  Heart, Star,  Zap,} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

import { useAuth } from "@/hooks/useAuth";
import Section from "./section";
import AuthModal from "./auth-modal";
import { categories } from "@/data/comics";

const mainNav = [
  { name: "Home", href: "/" },
  { name: "Subbed Anime", href: "/subbed" },
  { name: "Dubbed Anime", href: "/dubbed" },
  { name: "Most Popular", href: "/popular" },
  { name: "Movies", href: "/movies" },
  { name: "TV Series", href: "/tv-series" },
  { name: "OVAs", href: "/ovas" },
  { name: "ONAs", href: "/onas" },
  { name: "Specials", href: "/specials" },
  { name: "Events", href: "/events" },
];


const mockNotifications = [
  {
    id: 1,
    type: "like",
    message: "Sarah liked your comment on 'Attack on Titan'",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "comment",
    message: "New reply to your discussion about 'One Piece'",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 3,
    type: "event",
    message: "Anime discussion event starting in 1 hour",
    time: "15 min ago",
    unread: false,
  },
  {
    id: 4,
    type: "follow",
    message: "Alex started following you",
    time: "1 hour ago",
    unread: false,
  },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Auth modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Global UI state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Genres in drawer
  const [showAllGenres, setShowAllGenres] = useState(false);
  const visibleCategories = useMemo(
    () => (showAllGenres ? categories : categories.slice(0, 8)),
    [showAllGenres]
  );

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isSidebarOpen]);

  // Close helpers
  const closeAllOverlays = useCallback(() => {
    setIsSidebarOpen(false);
    setIsMobileSearchOpen(false);
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAllOverlays();
    };
    if (isSidebarOpen || isMobileSearchOpen) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [isSidebarOpen, isMobileSearchOpen, closeAllOverlays]);

  // Search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setIsMobileSearchOpen(false);
  };

  // Handle Community click
  const handleCommunityClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      router.push("/community");
      setIsSidebarOpen(false);
    } else {
      setIsAuthModalOpen(true);
      setIsSidebarOpen(false);
    }
  };

  // Handle Become Writer click
  const handleBecomeWriterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      router.push("/auth/become-writer");
      setIsSidebarOpen(false);
    } else {
      setIsAuthModalOpen(true);
      setIsSidebarOpen(false);
    }
  };

  const showBecomeWriter = !user || user?.role !== "writer";
  const unreadNotifications = mockNotifications.filter(n => n.unread).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "event":
        return <Calendar className="h-4 w-4 text-green-500" />;
      case "follow":
        return <UsersRound className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const socialLinks = [
  {name: "Discord", href: "/discord",  icon: MessageCircleMore, bg: "bg-[#5865F2]", },
  { name: "Telegram",  href: "/telegram",  icon: Send,  bg: "bg-[#0088cc]", },
  {  name: "Reddit", href: "/reddit",  icon: Globe,  bg: "bg-[#FF4500]",   },
  {
    name: "Twitter",
    href: "/twitter",
    icon: Twitter,
    bg: "bg-[#1DA1F2]", // Twitter blue
  },
];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Section paddingY="sm">
          <div className="flex items-center justify-between">
            {/* Left cluster: menu + logo */}
            <div className="flex items-center gap-2">
              {/* Menu button (desktop + mobile) */}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                onClick={() => setIsSidebarOpen(true)}
                className="shrink-0"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IS</span>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  InkSaga
                </span>
              </Link>
            </div>


            {/* Desktop search like reference (wide) */}
            <div className="hidden md:flex flex-1 max-w-[400px] mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search anime..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-28"
                />
                {/* Magnifier button */}
                <button
                  type="submit"
                  className="absolute right-24 top-1/2 -translate-y-1/2 grid place-items-center"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
                {/* Filter button (routes to /filter) */}
                <Link href="/filter" className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <FilterIcon className="h-4 w-4" />
                    Filter
                  </Button>
                </Link>
              </form>
            </div>

            {/* Right cluster: Join now (desktop), Become Writer, Notifications, Auth/User, Mobile search icon */}
            <div className="flex items-center gap-2">
              {/* Desktop "Join now" block */}
              <div className="hidden lg:flex items-center gap-4 pr-2">
                <span className="text-sm text-muted-foreground inline-block">Join now</span>
                    <div className="flex items-center gap-1">
        {socialLinks.map(({ name, href, icon: Icon, bg }) => (
          <Link
            key={name}
            href={href}
            aria-label={name}
            target="_blank"
            rel="noopener noreferrer"
            className={`${bg} p-2 rounded-full text-white transition-transform hover:scale-110`}
          >
            <Icon className="h-4 w-4" />
          </Link>
        ))}
      </div>
              </div>


              {/* Desktop middle: main nav + desktop search */}
              <div className="hidden md:flex items-center gap-6">
                {/* Community Button with enhanced styling */}
                <HoverCard openDelay={120}>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-sm  border border-purple-200 ${pathname === "/community"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                        : "text-muted-foreground hover:text-primary"
                        }`}
                      onClick={handleCommunityClick}
                    >
                      Community
                      <Users className="h-3 w-3 text-purple-500" />

                      {pathname !== "/community" && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
                      )}

                    </Button>


                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-purple-500" />
                        <p className="text-sm font-semibold">Join the Community</p>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>Chat with fellow anime & comic fans</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UsersRound className="h-4 w-4" />
                          <span>Join discussion groups</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Participate in events & watch parties</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground italic">
                        Connect with 50K+ active members!
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>

              {/* Become Writer (shows if no user OR user.role !== writer) */}
              {showBecomeWriter && (
                <HoverCard openDelay={120}>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="ghost"
                      className="hidden md:flex relative bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200"
                      onClick={handleBecomeWriterClick}
                    >
                      <div className="flex items-center gap-2">
                        <PenTool className="h-4 w-4" />
                        Become Writer
                        <Zap className="h-3 w-3 text-purple-500" />
                      </div>
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">Become a Writer</p>
                      <p className="text-sm text-muted-foreground">
                        Pitch your stories, publish chapters, and build your audience on InkSaga.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              )}

              {/* Notifications (only for logged-in users) */}
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadNotifications > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                        >
                          {unreadNotifications > 9 ? "9+" : unreadNotifications}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80" align="end">
                    <DropdownMenuLabel className="flex items-center justify-between">
                      <span>Notifications</span>
                      {unreadNotifications > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {unreadNotifications} new
                        </Badge>
                      )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-96 overflow-y-auto">
                      {mockNotifications.map((notification) => (
                        <DropdownMenuItem key={notification.id} className="flex-col items-start p-3 cursor-pointer">
                          <div className="flex items-start gap-3 w-full">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1 space-y-1">
                              <p className="text-sm leading-relaxed">{notification.message}</p>
                              <p className="text-xs text-muted-foreground">{notification.time}</p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
                            )}
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/notifications" className="w-full text-center text-sm text-primary">
                        View all notifications
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Auth / User menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="w-10 h-10 cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500">
                        <AvatarImage
                          src={user.avatar || "/default-image/comic2.jpg"}
                          alt={user.name}
                          className="bg-gradient-to-r from-purple-500 to-pink-500"
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n: string) => n[0])
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
                    <DropdownMenuItem asChild>
                      <Link href="/my-account" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Account</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    {user.role === "writer" && (
                      <DropdownMenuItem asChild>
                        <Link href="/writer" className="flex items-center">
                          <PenTool className="mr-2 h-4 w-4" />
                          <span>Writer Panel</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/community" className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Community</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
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
                  <Button onClick={() => setIsAuthModalOpen(true)}>Sign In</Button>
                </div>
              )}

              {/* Mobile search icon */}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open search"
                className="md:hidden"
                onClick={() => setIsMobileSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Section>

        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="md:hidden border-t relative z-40 bg-background"
            >
              <div className="px-4 py-3 flex items-center gap-2">
                <form onSubmit={handleSearch} className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    autoFocus
                    type="search"
                    placeholder="Search anime..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-24"
                  />

                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button
                      type="submit"
                      aria-label="Search"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                    <Link
                      href="/filter"
                      onClick={() => setIsMobileSearchOpen(false)}
                    >
                      <Button variant="secondary" size="sm" className="gap-2">
                        <FilterIcon className="h-4 w-4" />
                        Filter
                      </Button>
                    </Link>
                  </div>
                </form>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileSearchOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* OVERLAY for sidebar & mobile search click-outside */}
      <AnimatePresence>
        {(isSidebarOpen || isMobileSearchOpen) && (
          <motion.div
            key="overlay"
            className="fixed w-full h-screen inset-0 z-10 bg-black/40 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAllOverlays}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR DRAWER (mobile + desktop) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25 }}
            className="fixed inset-y-0 left-0 z-50 h-screen w-[85%] lg:w-[500px] bg-background border-r shadow-lg flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* Sticky header inside drawer */}
            <div className="sticky top-0 z-10 bg-background border-b p-4 flex items-center justify-between">
              <span className="font-bold text-lg">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Featured Actions for Mobile (Community & Become Writer) */}
              <div className="p-4 space-y-3 border-b bg-gradient-to-r from-purple-50/50 to-pink-50/50">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Featured</h3>

                <div className="grid grid-cols-1   md:grid-cols-2 gap-3">

                  {/* Community Button - Always visible and prominent */}
                  <button
                    onClick={handleCommunityClick}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Users className="h-5 w-5" />
                    <div className="flex-1 ">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Community</div>
                        <div className="flex items-center w-fit gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                          <Star className="h-2 w-2" />
                          50K+
                        </div>
                      </div>
                      <div className="text-xs text-start text-purple-100 mt-1">Chat • Groups • Events</div>
                    </div>
                  </button>


                  {showBecomeWriter && (
                    <button
                      onClick={handleBecomeWriterClick}
                      className="flex items-center text-start gap-3 p-3 rounded-lg border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
                    >
                      <PenTool className="h-5 w-5 text-purple-600" />
                      <div className="flex-1">
                        <div className="font-medium text-purple-900">Become Writer</div>
                        <div className="text-xs text-purple-600">Share your stories</div>
                      </div>
                      <Zap className="h-4 w-4 text-purple-500" />
                    </button>
                  )}

                </div>

              </div>

              {/* Primary links */}
              <nav className="flex flex-col space-y-1 p-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Browse</h3>
                {mainNav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Genres */}
              <div className="px-4 border-t pt-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Genres</h3>
                <div className="grid grid-cols-2 gap-2">
                  {visibleCategories.map((genre) => (
                    <Link
                      key={genre}
                      href={`/genre/${genre.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => setIsSidebarOpen(false)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center py-1"
                    >
                      <ChevronRight className="h-3.5 w-3.5 mr-1" />
                      {genre}
                    </Link>
                  ))}
                </div>
                <button
                  onClick={() => setShowAllGenres((v) => !v)}
                  className="mt-3 mb-4 text-sm font-medium text-primary hover:underline"
                >
                  {showAllGenres ? "Show Less" : "More"}
                </button>
              </div>

              {/* Join now cluster (mobile) */}
              <div className="flex items-center justify-between px-4 py-3 border-t mt-2">
                <span className="text-sm text-muted-foreground">Join Us</span>
                  <div className="flex items-center gap-1">
        {socialLinks.map(({ name, href, icon: Icon, bg }) => (
          <Link
            key={name}
            href={href}
            aria-label={name}
            target="_blank"
            rel="noopener noreferrer"
            className={`${bg} p-2 rounded-full text-white transition-transform hover:scale-110`}
          >
            <Icon className="h-4 w-4" />
          </Link>
        ))}
      </div>
              </div>

              {/* Auth actions in drawer (mobile) */}
              <div className="px-4 py-4 border-t bg-muted/30">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <Avatar className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500">
                        <AvatarImage src={user.avatar || "/default-image/comic2.jpg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(" ").map((n: string) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{user.name}</div>
                        <Badge variant={user.role === "writer" ? "default" : "secondary"} className="text-xs">
                          {user.role}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => { setIsAuthModalOpen(true); setIsSidebarOpen(false); }}
                  >
                    Sign In to Join Community
                  </Button>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}