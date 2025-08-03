"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Globe,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  Camera,
  Shield,
  TrendingUp,
  DollarSign,
  Eye,
  Heart,
  BookOpen,
  Award,
  Lock,
  CreditCard,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Edit,
  Save,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"

const writerStats = {
  totalComics: 12,
  totalEpisodes: 156,
  totalViews: 2450000,
  totalLikes: 89500,
  followers: 15600,
  monthlyEarnings: 2340,
  verificationStatus: "verified",
  memberSince: "January 2022",
  lastActive: "2 hours ago",
}

const socialPlatforms = [
  { name: "Twitter", icon: Twitter, placeholder: "@username", value: "@johndoe_comics" },
  { name: "Instagram", icon: Instagram, placeholder: "@username", value: "@johndoe.art" },
  { name: "YouTube", icon: Youtube, placeholder: "Channel URL", value: "youtube.com/c/johndoecomics" },
  { name: "Facebook", icon: Facebook, placeholder: "Page URL", value: "" },
  { name: "Website", icon: Globe, placeholder: "https://yourwebsite.com", value: "johndoecomics.com" },
]

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Supernatural",
  "Thriller",
]

export default function WriterAccountPage() {
  const { user } = useSelector((state: RootState) => state.user)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    displayName: user?.name || "John Doe",
    bio: "Passionate comic creator with over 5 years of experience in digital storytelling. I love creating immersive worlds and compelling characters that resonate with readers.",
    location: "San Francisco, CA",
    website: "johndoecomics.com",
    birthDate: "1990-05-15",
    phone: "+1 (555) 123-4567",
    genres: ["Fantasy", "Adventure", "Sci-Fi"],
    experience: "professional",
    socialLinks: socialPlatforms.reduce(
      (acc, platform) => ({
        ...acc,
        [platform.name.toLowerCase()]: platform.value,
      }),
      {} as Record<string, string>,
    ),
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    commentNotifications: true,
    likeNotifications: false,
    followerNotifications: true,
    collaborationRequests: true,
    marketingEmails: false,
    weeklyDigest: true,
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    showLocation: true,
    allowMessages: true,
    showOnlineStatus: true,
    showReadingActivity: true,
  })

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!")
    setIsEditing(false)
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      toast.success("Avatar uploaded successfully!")
    }
  }

  const getVerificationBadge = () => {
    switch (writerStats.verificationStatus) {
      case "verified":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <X className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <AlertCircle className="w-3 h-3 mr-1" />
            Unverified
          </Badge>
        )
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Account Management</h1>
          <p className="text-muted-foreground">Manage your writer profile and account settings</p>
        </div>
        <div className="flex items-center space-x-2">
          {getVerificationBadge()}
          <Button variant="outline" size="sm">
            <Award className="w-4 h-4 mr-2" />
            Apply for Pro
          </Button>
        </div>
      </div>

      {/* Profile Overview Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
              >
                <Camera className="w-4 h-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{profileData.displayName}</h2>
                  <p className="text-muted-foreground">Writer since {writerStats.memberSince}</p>
                </div>
                <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{writerStats.totalComics}</p>
                  <p className="text-sm text-muted-foreground">Comics</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{writerStats.followers.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{(writerStats.totalViews / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-muted-foreground">Views</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">${writerStats.monthlyEarnings}</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="monetization">Monetization</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your personal details and bio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={profileData.displayName}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, displayName: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Tell readers about yourself..."
                  />
                  <p className="text-xs text-muted-foreground">{profileData.bio.length}/500 characters</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, website: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="yourwebsite.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select
                    value={profileData.experience}
                    onValueChange={(value) => setProfileData((prev) => ({ ...prev, experience: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                      <SelectItem value="professional">Professional (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Genres & Specializations */}
            <Card>
              <CardHeader>
                <CardTitle>Genres & Specializations</CardTitle>
                <CardDescription>Select the genres you specialize in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Preferred Genres</Label>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <Badge
                        key={genre}
                        variant={profileData.genres.includes(genre) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors ${!isEditing ? "cursor-default" : ""}`}
                        onClick={() => {
                          if (!isEditing) return
                          setProfileData((prev) => ({
                            ...prev,
                            genres: prev.genres.includes(genre)
                              ? prev.genres.filter((g) => g !== genre)
                              : [...prev.genres, genre],
                          }))
                        }}
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Selected: {profileData.genres.length}/5 genres</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Skills & Tools</Label>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Digital Art</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Storytelling</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Character Design</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Panel Layout</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Media Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media & Links</CardTitle>
              <CardDescription>Connect your social media accounts to grow your audience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialPlatforms.map((platform) => (
                  <div key={platform.name} className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <platform.icon className="w-4 h-4" />
                      <span>{platform.name}</span>
                    </Label>
                    <Input
                      value={profileData.socialLinks[platform.name.toLowerCase()] || ""}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          socialLinks: {
                            ...prev.socialLinks,
                            [platform.name.toLowerCase()]: e.target.value,
                          },
                        }))
                      }
                      disabled={!isEditing}
                      placeholder={platform.placeholder}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {isEditing && (
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Account Details */}
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>Manage your account information and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="email" type="email" value={user?.email || "john.doe@example.com"} disabled />
                    <Badge variant="outline" className="text-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={profileData.birthDate}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, birthDate: e.target.value }))}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Security</h4>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Shield className="w-4 h-4 mr-2" />
                    Two-Factor Authentication
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Account Statistics</CardTitle>
                <CardDescription>Your account activity and performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{writerStats.totalComics}</p>
                    <p className="text-sm text-muted-foreground">Total Comics</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{writerStats.totalEpisodes}</p>
                    <p className="text-sm text-muted-foreground">Total Episodes</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Eye className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{(writerStats.totalViews / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Heart className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{(writerStats.totalLikes / 1000).toFixed(1)}K</p>
                    <p className="text-sm text-muted-foreground">Total Likes</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Profile Completion</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-muted-foreground">Complete your profile to increase visibility</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Recent Activity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Last login</span>
                      <span className="text-muted-foreground">{writerStats.lastActive}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last comic update</span>
                      <span className="text-muted-foreground">3 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profile updated</span>
                      <span className="text-muted-foreground">1 week ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">General Notifications</h4>
                <div className="space-y-4">
                  {[
                    {
                      key: "emailNotifications",
                      label: "Email Notifications",
                      description: "Receive notifications via email",
                    },
                    {
                      key: "pushNotifications",
                      label: "Push Notifications",
                      description: "Receive browser push notifications",
                    },
                    {
                      key: "weeklyDigest",
                      label: "Weekly Digest",
                      description: "Get a weekly summary of your activity",
                    },
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{setting.label}</Label>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch
                        checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, [setting.key]: checked }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Content Notifications</h4>
                <div className="space-y-4">
                  {[
                    {
                      key: "commentNotifications",
                      label: "New Comments",
                      description: "When someone comments on your comics",
                    },
                    { key: "likeNotifications", label: "New Likes", description: "When someone likes your content" },
                    { key: "followerNotifications", label: "New Followers", description: "When someone follows you" },
                    {
                      key: "collaborationRequests",
                      label: "Collaboration Requests",
                      description: "When someone wants to collaborate",
                    },
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{setting.label}</Label>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch
                        checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, [setting.key]: checked }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Marketing & Updates</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                    </div>
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, marketingEmails: checked }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control who can see your information and activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Profile Visibility</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select
                      value={privacySettings.profileVisibility}
                      onValueChange={(value) => setPrivacySettings((prev) => ({ ...prev, profileVisibility: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Anyone can view</SelectItem>
                        <SelectItem value="followers">Followers Only</SelectItem>
                        <SelectItem value="private">Private - Only you</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {[
                    {
                      key: "showEmail",
                      label: "Show Email Address",
                      description: "Display your email on your profile",
                    },
                    {
                      key: "showPhone",
                      label: "Show Phone Number",
                      description: "Display your phone number on your profile",
                    },
                    {
                      key: "showLocation",
                      label: "Show Location",
                      description: "Display your location on your profile",
                    },
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{setting.label}</Label>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch
                        checked={privacySettings[setting.key as keyof typeof privacySettings]}
                        onCheckedChange={(checked) =>
                          setPrivacySettings((prev) => ({ ...prev, [setting.key]: checked }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Activity & Interactions</h4>
                <div className="space-y-4">
                  {[
                    {
                      key: "allowMessages",
                      label: "Allow Direct Messages",
                      description: "Let other users send you messages",
                    },
                    { key: "showOnlineStatus", label: "Show Online Status", description: "Display when you're online" },
                    {
                      key: "showReadingActivity",
                      label: "Show Reading Activity",
                      description: "Display what you're currently reading",
                    },
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{setting.label}</Label>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch
                        checked={privacySettings[setting.key as keyof typeof privacySettings]}
                        onCheckedChange={(checked) =>
                          setPrivacySettings((prev) => ({ ...prev, [setting.key]: checked }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monetization Tab */}
        <TabsContent value="monetization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Earnings Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Track your revenue and payouts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold text-green-600">${writerStats.monthlyEarnings}</p>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold text-blue-600">$18,450</p>
                    <p className="text-sm text-muted-foreground">Total Earned</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Next Payout</span>
                    <span className="font-medium">$2,340 on Jan 31</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payout Method</span>
                    <span className="text-muted-foreground">PayPal</span>
                  </div>
                </div>

                <Button className="w-full">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Update Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Monetization Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Monetization Settings</CardTitle>
                <CardDescription>Configure how you earn from your content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Premium Content</Label>
                      <p className="text-sm text-muted-foreground">Allow readers to pay for premium episodes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Tips & Donations</Label>
                      <p className="text-sm text-muted-foreground">Let readers tip you for your work</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Merchandise Sales</Label>
                      <p className="text-sm text-muted-foreground">Sell merchandise related to your comics</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Premium Episode Price</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">$</span>
                    <Input type="number" placeholder="2.99" className="flex-1" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Minimum Tip Amount</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">$</span>
                    <Input type="number" placeholder="1.00" className="flex-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Detailed breakdown of your earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Premium Episodes</p>
                  <p className="text-2xl font-bold">$1,890</p>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Tips & Donations</p>
                  <p className="text-2xl font-bold">$340</p>
                  <p className="text-xs text-green-600">+8% from last month</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Ad Revenue</p>
                  <p className="text-2xl font-bold">$110</p>
                  <p className="text-xs text-red-600">-3% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verification Tab */}
        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Writer Verification</CardTitle>
              <CardDescription>Get verified to build trust with your audience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-blue-600" />
                <div>
                  <h4 className="font-medium text-blue-900">Verification Status: Verified</h4>
                  <p className="text-sm text-blue-700">
                    Your account has been verified. You now have access to premium features.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Verification Benefits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Verified badge on profile</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Higher search ranking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Premium monetization features</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Priority customer support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Access to beta features</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Collaboration opportunities</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Verification History</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Identity Verification</p>
                        <p className="text-sm text-muted-foreground">Completed on Dec 15, 2023</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Portfolio Review</p>
                        <p className="text-sm text-muted-foreground">Completed on Dec 18, 2023</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Content Quality Check</p>
                        <p className="text-sm text-muted-foreground">Completed on Dec 20, 2023</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
