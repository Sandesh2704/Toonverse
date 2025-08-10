"use client"

import { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Eye, Check, X, BookOpen, Heart, Star } from "lucide-react"
import Link from "next/link"
import { dummyWriters } from "@/data/writers"

export default function WritersPage() {
  const { categories } = useSelector((state: RootState) => state.categories)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedCountry, setSelectedCountry] = useState("all")

  const filteredWriters = useMemo(() => {
    return dummyWriters.filter((writer) => {
      const matchesSearch =
        writer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        writer.username.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGenre = selectedGenre === "all" || writer.genres.includes(selectedGenre)
      const matchesCountry = selectedCountry === "all" || writer.country === selectedCountry

      return matchesSearch && matchesGenre && matchesCountry
    })
  }, [searchTerm, selectedGenre, selectedCountry])

  const totalWriters = dummyWriters.length
  const totalViews = dummyWriters.reduce((sum, writer) => sum + writer.totalViews, 0)
  const totalFollowers = dummyWriters.reduce((sum, writer) => sum + writer.followers, 0)
  const averageRating = dummyWriters.reduce((sum, writer) => sum + writer.rating, 0) / dummyWriters.length

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  const getVerificationBadge = (isVerified: boolean) => {
    return isVerified ? (
      <Badge className="bg-green-500">Verified</Badge>
    ) : (
      <Badge variant="outline">Pending</Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Writers Management</h1>
          <p className="text-muted-foreground">Review and manage writer applications</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Writers</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWriters}</div>
            <p className="text-xs text-muted-foreground">
              {dummyWriters.filter((w) => w.isVerified).length} verified
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalViews)}</div>
            <p className="text-xs text-muted-foreground">Across all writers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalFollowers)}</div>
            <p className="text-xs text-muted-foreground">{dummyWriters.reduce((sum, w) => sum + w.totalComics, 0)} comics</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Out of 5.0 stars</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Writers</CardTitle>
          <CardDescription>Search and filter writer applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search writers or usernames..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem  value="all">All Genres</SelectItem>
                {[...new Set(dummyWriters.flatMap((w) => w.genres))].map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {[...new Set(dummyWriters.map((w) => w.country))].map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Writers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Writers ({filteredWriters.length})</CardTitle>
          <CardDescription>Manage writer applications and their profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Writer</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Genres</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Comics</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Followers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWriters.map((writer) => (
                <TableRow key={writer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={writer.avatar} />
                        <AvatarFallback>{writer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{writer.name}</div>
                        <div className="text-sm text-muted-foreground">{writer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{writer.username}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {writer.genres.map((genre) => (
                        <Badge key={genre} variant="outline">{genre}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{writer.country}</TableCell>
                  <TableCell>{writer.totalComics}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {writer.rating}
                    </div>
                  </TableCell>
                  <TableCell>{formatNumber(writer.totalViews)}</TableCell>
                  <TableCell>{formatNumber(writer.followers)}</TableCell>
                  <TableCell>{getVerificationBadge(writer.isVerified)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/writers-applications/${writer.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" disabled={writer.isVerified}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" disabled={writer.isVerified}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}