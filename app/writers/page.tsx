"use client"

import { useState, useEffect, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Filter, CheckCircle, ArrowDown, ArrowUp } from "lucide-react"
import Link from "next/link"
import Section from "@/components/shared/section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { dummyWriters } from "@/data/writers"

// Sample dummyWriters data structure

// Define sorting options
type SortOption = "popular" | "newest" | "rating" | "followers" | "comics"

export default function WritersPage() {
    // State management
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [activeTab, setActiveTab] = useState<"all" | "following" | "verified">("all")
    const [followingStates, setFollowingStates] = useState<Record<string, boolean>>(
        dummyWriters.reduce((acc, writer) => ({ ...acc, [writer.id]: writer.isFollowing }), {})
    )
    const [currentPage, setCurrentPage] = useState(1)
    const [sortOption, setSortOption] = useState<SortOption>("popular")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
    const [isLoading, setIsLoading] = useState(false)

    // Constants
    const WRITERS_PER_PAGE = 12
    const ALL_GENRES = useMemo(() => Array.from(new Set(dummyWriters.flatMap(writer => writer.genres))).sort(), [])

    // Filter and sort writers
    const filteredWriters = useMemo(() => {
        let result = [...dummyWriters]

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            result = result.filter(
                writer =>
                    writer.name.toLowerCase().includes(term) ||
                    writer.username.toLowerCase().includes(term) ||
                    writer.bio.toLowerCase().includes(term)
            )
        }

        // Apply genre filter
        if (selectedGenres.length > 0) {
            result = result.filter(writer => selectedGenres.some(genre => writer.genres.includes(genre)))
        }

        // Apply tab filter
        if (activeTab === "following") {
            result = result.filter(writer => followingStates[writer.id])
        } else if (activeTab === "verified") {
            result = result.filter(writer => writer.isVerified)
        }

        // Apply sorting
        result.sort((a, b) => {
            let comparison = 0
            switch (sortOption) {
                case "popular":
                    comparison = a.totalViews - b.totalViews
                    break
                case "newest":
                    comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    break
                case "rating":
                    comparison = (a.rating || 0) - (b.rating || 0)
                    break
                case "followers":
                    comparison = a.followers - b.followers
                    break
                case "comics":
                    comparison = a.totalComics - b.totalComics
                    break
            }
            return sortDirection === "desc" ? -comparison : comparison
        })

        return result
    }, [searchTerm, selectedGenres, activeTab, followingStates, sortOption, sortDirection])

    // Pagination logic
    const totalPages = Math.ceil(filteredWriters.length / WRITERS_PER_PAGE)
    const currentWriters = useMemo(() => {
        const startIndex = (currentPage - 1) * WRITERS_PER_PAGE
        return filteredWriters.slice(startIndex, startIndex + WRITERS_PER_PAGE)
    }, [filteredWriters, currentPage])

    // Handlers
    const handleFollow = (writerId: string) => {
        setFollowingStates(prev => ({
            ...prev,
            [writerId]: !prev[writerId],
        }))
    }

    const handleGenreToggle = (genre: string) => {
        setSelectedGenres(prev =>
            prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
        )
        setCurrentPage(1)
    }

    const handleSortChange = (option: SortOption) => {
        if (sortOption === option) {
            setSortDirection(prev => (prev === "asc" ? "desc" : "asc"))
        } else {
            setSortOption(option)
            setSortDirection("desc")
        }
        setCurrentPage(1)
    }

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, selectedGenres, activeTab, sortOption, sortDirection])

    // Simulate loading state
    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => setIsLoading(false), 300) // Reduced timeout for better UX
        return () => clearTimeout(timer)
    }, [currentPage, searchTerm, selectedGenres, activeTab, sortOption, sortDirection])

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <Section className="py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Comic Creators</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Find and follow your favorite comic writers and artists. Explore diverse styles and genres.
                </p>
            </Section>

            {/* Search and Filter Section */}
            <Section className="mb-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                            aria-hidden="true"
                        />
                        <Input
                            placeholder="Search writers by name, username, or bio..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search writers"
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="gap-2"
                                aria-label={`Sort by ${sortOption}, ${sortDirection === "asc" ? "ascending" : "descending"}`}
                            >
                                <span className="hidden sm:inline">Sort:</span>
                                <span className="capitalize">
                                    {sortOption === "popular"
                                        ? "Most Popular"
                                        : sortOption === "newest"
                                            ? "Newest"
                                            : sortOption === "rating"
                                                ? "Rating"
                                                : sortOption === "followers"
                                                    ? "Followers"
                                                    : "Comics"}
                                </span>
                                {sortDirection === "asc" ? (
                                    <ArrowUp className="h-4 w-4" aria-hidden="true" />
                                ) : (
                                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                {[
                                    { value: "popular", label: "Most Popular" },
                                    { value: "newest", label: "Newest Creators" },
                                    { value: "rating", label: "Highest Rating" },
                                    { value: "followers", label: "Most Followers" },
                                    { value: "comics", label: "Most Comics" },
                                ].map(option => (
                                    <DropdownMenuItem
                                        key={option.value}
                                        onClick={() => handleSortChange(option.value as SortOption)}
                                        className="cursor-pointer"
                                    >
                                        {option.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Genre Filter Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {ALL_GENRES.map(genre => (
                        <Badge
                            key={genre}
                            variant={selectedGenres.includes(genre) ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/10 transition-colors"
                            onClick={() => handleGenreToggle(genre)}
                            role="button"
                            aria-pressed={selectedGenres.includes(genre)}
                            aria-label={`Filter by ${genre} genre`}
                        >
                            {genre}
                        </Badge>
                    ))}
                </div>

                {/* Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={(value) => setActiveTab(value as "all" | "following" | "verified")}
                >
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all" aria-label="Show all writers">
                            All Writers
                        </TabsTrigger>
                        <TabsTrigger value="following" aria-label="Show followed writers">
                            Following
                        </TabsTrigger>
                        <TabsTrigger value="verified" aria-label="Show verified writers">
                            Verified
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </Section>

            {/* Writers Grid */}
            <Section>
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: WRITERS_PER_PAGE }).map((_, index) => (
                            <div key={index} className="border rounded-lg overflow-hidden">
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <Skeleton className="w-12 h-12 rounded-full" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-[100px]" />
                                                <Skeleton className="h-3 w-[80px]" />
                                            </div>
                                        </div>
                                        <Skeleton className="h-9 w-20" />
                                    </div>
                                    <Skeleton className="h-12 w-full mb-4" />
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        <Skeleton className="h-6 w-16" />
                                        <Skeleton className="h-6 w-16" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-full" />
                                    </div>
                                    <div className="flex space-x-2">
                                        <Skeleton className="h-9 w-full" />
                                        <Skeleton className="h-9 w-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : currentWriters.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {currentWriters.map(writer => (
                            <div
                                key={writer.id}
                                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm"
                            >
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                                                <AvatarImage src={writer.avatar} alt={`${writer.name}'s avatar`} />
                                                <AvatarFallback>
                                                    {writer.name
                                                        .split(" ")
                                                        .map(n => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex items-center gap-1">
                                                    <h3 className="font-semibold line-clamp-1">{writer.name}</h3>
                                                    {writer.isVerified && (
                                                        <CheckCircle
                                                            className="w-4 h-4 text-blue-600 shrink-0"
                                                            aria-label="Verified writer"
                                                        />
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground line-clamp-1">{writer.username}</p>
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant={followingStates[writer.id] ? "outline" : "default"}
                                            onClick={() => handleFollow(writer.id)}
                                            className="shrink-0"
                                            aria-label={followingStates[writer.id] ? `Unfollow ${writer.name}` : `Follow ${writer.name}`}
                                        >
                                            {followingStates[writer.id] ? "Following" : "Follow"}
                                        </Button>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{writer.bio}</p>

                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {writer.genres.slice(0, 3).map(genre => (
                                            <Badge
                                                key={genre}
                                                variant="secondary"
                                                className="text-xs cursor-pointer hover:bg-primary/20"
                                                onClick={() => handleGenreToggle(genre)}
                                                role="button"
                                                aria-label={`Filter by ${genre} genre`}
                                            >
                                                {genre}
                                            </Badge>
                                        ))}
                                        {writer.genres.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{writer.genres.length - 3}
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                                        <div>
                                            <p className="text-sm font-semibold">
                                                {writer.followers >= 1000
                                                    ? `${(writer.followers / 1000).toFixed(1)}K`
                                                    : writer.followers}
                                            </p>
                                            <p className="text-xs text-muted-foreground">Followers</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">{writer.totalComics}</p>
                                            <p className="text-xs text-muted-foreground">Comics</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">
                                                {writer.totalViews >= 1000000
                                                    ? `${(writer.totalViews / 1000000).toFixed(1)}M`
                                                    : `${(writer.totalViews / 1000).toFixed(0)}K`}
                                            </p>
                                            <p className="text-xs text-muted-foreground">Views</p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm" className="flex-1" asChild>
                                            <Link href={`/writers/${writer.id}`} aria-label={`View ${writer.name}'s profile`}>
                                                Profile
                                            </Link>
                                        </Button>
                                        <Button size="sm" className="flex-1" asChild>
                                            <Link href={`/writers/${writer.id}/comics`} aria-label={`View ${writer.name}'s comics`}>
                                                Comics
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                            <Search className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">No writers found</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Try adjusting your search or filter to find what you're looking for.
                        </p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                                setSearchTerm("")
                                setSelectedGenres([])
                                setActiveTab("all")
                            }}
                            aria-label="Clear all filters"
                        >
                            Clear filters
                        </Button>
                    </div>
                )}
            </Section>

            {/* Pagination */}
            {filteredWriters.length > WRITERS_PER_PAGE && (
                <Section className="flex justify-center mt-8">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (currentPage > 1) handlePageChange(currentPage - 1)
                                    }}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                    aria-disabled={currentPage === 1}
                                    aria-label="Previous page"
                                />
                            </PaginationItem>

                            {/* Always show first page */}
                            <PaginationItem>
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handlePageChange(1)
                                    }}
                                    isActive={1 === currentPage}
                                    aria-label="Page 1"
                                >
                                    1
                                </PaginationLink>
                            </PaginationItem>

                            {/* Show ellipsis if needed */}
                            {currentPage > 3 && (
                                <PaginationItem>
                                    <PaginationEllipsis aria-hidden="true" />
                                </PaginationItem>
                            )}

                            {/* Show surrounding pages */}
                            {Array.from({ length: Math.min(3, totalPages - 2) }, (_, i) => {
                                const page = Math.max(2, Math.min(currentPage - 1, totalPages - 3)) + i
                                if (page >= 2 && page < totalPages) {
                                    return (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handlePageChange(page)
                                                }}
                                                isActive={page === currentPage}
                                                aria-label={`Page ${page}`}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                }
                                return null
                            })}

                            {/* Show ellipsis if needed */}
                            {currentPage < totalPages - 2 && (
                                <PaginationItem>
                                    <PaginationEllipsis aria-hidden="true" />
                                </PaginationItem>
                            )}

                            {/* Always show last page */}
                            {totalPages > 1 && (
                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handlePageChange(totalPages)
                                        }}
                                        isActive={totalPages === currentPage}
                                        aria-label={`Page ${totalPages}`}
                                    >
                                        {totalPages}
                                    </PaginationLink>
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (currentPage < totalPages) handlePageChange(currentPage + 1)
                                    }}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                    aria-disabled={currentPage === totalPages}
                                    aria-label="Next page"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </Section>
            )}

            {/* Stats Section */}
            <Section className="mt-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="border rounded-lg p-6 text-center">
                        <h3 className="text-3xl font-bold mb-2">{dummyWriters.length.toLocaleString()}</h3>
                        <p className="text-muted-foreground">Total Writers</p>
                    </div>
                    <div className="border rounded-lg p-6 text-center">
                        <h3 className="text-3xl font-bold mb-2">
                            {dummyWriters.filter(w => w.isVerified).length.toLocaleString()}
                        </h3>
                        <p className="text-muted-foreground">Verified Creators</p>
                    </div>
                    <div className="border rounded-lg p-6 text-center">
                        <h3 className="text-3xl font-bold mb-2">
                            {dummyWriters.reduce((sum, w) => sum + w.totalComics, 0).toLocaleString()}
                        </h3>
                        <p className="text-muted-foreground">Total Comics</p>
                    </div>
                    <div className="border rounded-lg p-6 text-center">
                        <h3 className="text-3xl font-bold mb-2">
                            {Math.round(
                                dummyWriters.reduce((sum, w) => sum + (w.rating || 0), 0) /
                                (dummyWriters.length || 1)
                            )}
                        </h3>
                        <p className="text-muted-foreground">Average Rating</p>
                    </div>
                </div>
            </Section>

            {/* CTA Section */}
            <Section className="text-center py-16">
                <h2 className="text-3xl font-bold mb-4">Are you a comic creator?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                    Join our community of talented writers and artists to showcase your work to thousands of readers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" asChild>
                        <Link href="/sign-up" aria-label="Sign up as a creator">
                            Sign Up as Creator
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/about" aria-label="Learn more about the platform">
                            Learn More
                        </Link>
                    </Button>
                </div>
            </Section>
        </div>
    )
}

