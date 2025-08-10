"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import Link from "next/link"

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

const experienceLevels = [
    { value: "beginner", label: "Beginner (0-1 years)" },
    { value: "intermediate", label: "Intermediate (1-3 years)" },
    { value: "advanced", label: "Advanced (3-5 years)" },
    { value: "professional", label: "Professional (5+ years)" },
]

const countries = [
    { code: "+1", name: "United States", flag: "🇺🇸" },
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
    { code: "+81", name: "Japan", flag: "🇯🇵" },
    { code: "+86", name: "China", flag: "🇨🇳" },
    { code: "+49", name: "Germany", flag: "🇩🇪" },
    { code: "+33", name: "France", flag: "🇫🇷" },
    { code: "+39", name: "Italy", flag: "🇮🇹" },
    { code: "+61", name: "Australia", flag: "🇦🇺" },
    { code: "+82", name: "South Korea", flag: "🇰🇷" },
]

// Zod schema for validation
const writerApplicationSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    countryCode: z.string().min(1, "Country code is required"),
    mobile: z.string().min(10, "Please enter a valid mobile number"),
    country: z.string().min(1, "Country is required"),
    bio: z.string().min(50, "Bio must be at least 50 characters").max(500, "Bio must not exceed 500 characters"),
    experience: z.string().min(1, "Experience level is required"),
    genres: z.array(z.string()).min(1, "Please select at least one genre").max(5, "Maximum 5 genres allowed"),
    socialLinks: z.object({
        twitter: z.string().optional(),
        instagram: z.string().optional(),
        youtube: z.string().optional(),
        website: z.string().optional(),
    }),
    portfolio: z.string().optional(),
    motivation: z.string().min(100, "Please provide more detailed motivation (minimum 100 characters)"),
    agreeToGuidelines: z.boolean().refine((val) => val === true, {
        message: "Please agree to the writer guidelines",
    }),
})

type WriterApplication = z.infer<typeof writerApplicationSchema>

export default function WriterApplicationForm() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
    } = useForm<WriterApplication>({
        resolver: zodResolver(writerApplicationSchema),
        defaultValues: {
            fullName: "",
            username: "",
            email: "",
            countryCode: "+91",
            mobile: "",
            country: "",
            bio: "",
            experience: "",
            genres: [],
            socialLinks: {
                twitter: "",
                instagram: "",
                youtube: "",
                website: "",
            },
            portfolio: "",
            motivation: "",
            agreeToGuidelines: false,
        },
    })

    const genresValue = watch("genres")
    const bioValue = watch("bio")
    const motivationValue = watch("motivation")

    const handleGenreToggle = (genre: string) => {
        const currentGenres = genresValue
        const updatedGenres = currentGenres.includes(genre)
            ? currentGenres.filter((g) => g !== genre)
            : [...currentGenres, genre]
        setValue("genres", updatedGenres, { shouldValidate: true })
    }

    const onSubmit = async (data: WriterApplication) => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))
            toast.success("Application submitted successfully! We'll review it within 3-5 business days.")
            router.push("/dashboard")
        } catch (error) {
            toast.error("Something went wrong. Please try again.")
        }
    }

    return (
        <Card className="shadow-xl max-w-6xl mx-auto border-0">
            <CardHeader>
                <CardTitle>Writer Application</CardTitle>
                <CardDescription>
                    Tell us about yourself and your creative journey. All fields marked with * are required.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name *</Label>
                                <Input
                                    id="fullName"
                                    placeholder="Enter your full name"
                                    {...register("fullName")}
                                    className={errors.fullName ? "border-red-500" : ""}
                                />
                                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">Username *</Label>
                                <Input
                                    id="username"
                                    placeholder="Choose a unique username"
                                    {...register("username")}
                                    className={errors.username ? "border-red-500" : ""}
                                />
                                {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                {...register("email")}
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="mobile">Mobile Number *</Label>
                                <div className="flex space-x-2">
                                    <Select
                                        value={watch("countryCode")}
                                        onValueChange={(value) => setValue("countryCode", value, { shouldValidate: true })}
                                    >
                                        <SelectTrigger className="w-32">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map((country) => (
                                                <SelectItem key={country.code} value={country.code}>
                                                    {country.flag} {country.code}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        id="mobile"
                                        placeholder="Mobile number"
                                        {...register("mobile")}
                                        className={errors.mobile ? "border-red-500" : ""}
                                    />
                                </div>
                                {errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">Country *</Label>
                                <Select
                                    value={watch("country")}
                                    onValueChange={(value) => setValue("country", value, { shouldValidate: true })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((country) => (
                                            <SelectItem key={country.name} value={country.name}>
                                                {country.flag} {country.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">About You</h3>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio *</Label>
                            <Textarea
                                id="bio"
                                placeholder="Tell us about yourself, your background, and what drives your passion for comic storytelling..."
                                {...register("bio")}
                                className={errors.bio ? "border-red-500" : "min-h-[120px]"}
                            />
                            <div className="flex justify-between">
                                <p className="text-sm text-muted-foreground">{bioValue.length}/500 characters (minimum 50)</p>
                                {errors.bio && <p className="text-sm text-red-500">{errors.bio.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Experience</h3>
                        <div className="space-y-2">
                            <Label htmlFor="experience">Experience Level *</Label>
                            <Select
                                value={watch("experience")}
                                onValueChange={(value) => setValue("experience", value, { shouldValidate: true })}
                            >
                                <SelectTrigger className={errors.experience ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select your experience level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {experienceLevels.map((level) => (
                                        <SelectItem key={level.value} value={level.value}>
                                            {level.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.experience && <p className="text-sm text-red-500">{errors.experience.message}</p>}
                        </div>
                    </div>

                    {/* Genres Section */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold">Preferred Genres</h3>
                            <p className="text-sm text-muted-foreground">
                                Select the genres you're most interested in writing (minimum 1, maximum 5)
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                            {genres.map((genre) => (
                                <div
                                    key={genre}
                                    className={`cursor-pointer transition-all ${genresValue.includes(genre) ? "ring-2 ring-primary" : "hover:bg-muted"}`}
                                    onClick={() => handleGenreToggle(genre)}
                                >
                                    <Badge
                                        variant={genresValue.includes(genre) ? "default" : "outline"}
                                        className="w-full justify-center py-2 px-3"
                                    >
                                        {genre}
                                        {genresValue.includes(genre) && <X className="h-3 w-3 ml-1" />}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-muted-foreground">Selected: {genresValue.length}/5</p>
                            {errors.genres && <p className="text-sm text-red-500">{errors.genres.message}</p>}
                        </div>
                    </div>

                    {/* Social Links Section */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold">Social Media & Portfolio</h3>
                            <p className="text-sm text-muted-foreground">
                                Share your social media profiles and portfolio (optional but recommended)
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="socialLinks.twitter">Twitter/X</Label>
                                <Input
                                    id="socialLinks.twitter"
                                    placeholder="@username or full URL"
                                    {...register("socialLinks.twitter")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="socialLinks.instagram">Instagram</Label>
                                <Input
                                    id="socialLinks.instagram"
                                    placeholder="@username or full URL"
                                    {...register("socialLinks.instagram")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="socialLinks.youtube">YouTube</Label>
                                <Input
                                    id="socialLinks.youtube"
                                    placeholder="Channel URL"
                                    {...register("socialLinks.youtube")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="socialLinks.website">Personal Website</Label>
                                <Input
                                    id="socialLinks.website"
                                    placeholder="https://yourwebsite.com"
                                    {...register("socialLinks.website")}
                                />
                            </div>
                        </div>
                    </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{/* Portfolio Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Portfolio</h3>
                        <div className="space-y-2">
                            <Label htmlFor="portfolio">Previous Work</Label>
                            <Textarea
                                id="portfolio"
                                placeholder="Share links to your previous work, published comics, or any relevant creative projects..."
                                {...register("portfolio")}
                                className="min-h-[100px]"
                            />
                        </div>
                    </div>

                    {/* Motivation Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Motivation</h3>
                        <div className="space-y-2">
                            <Label htmlFor="motivation">Why do you want to become a writer on InkSaga? *</Label>
                            <Textarea
                                id="motivation"
                                placeholder="Share your motivation, goals, and what you hope to achieve as a comic writer on our platform..."
                                {...register("motivation")}
                                className={errors.motivation ? "border-red-500" : "min-h-[100px]"}
                            />
                            <div className="flex justify-between">
                                <p className="text-sm text-muted-foreground">{motivationValue.length} characters (minimum 100)</p>
                                {errors.motivation && <p className="text-sm text-red-500">{errors.motivation.message}</p>}
                            </div>
                        </div>
                    </div>
</div>
                    

                    {/* Agreement Section */}
                    <div>
                        <div className="flex items-start space-x-2">
                            <Checkbox
                                id="guidelines"
                                checked={watch("agreeToGuidelines")}
                                onCheckedChange={(checked) => setValue("agreeToGuidelines", checked as boolean, { shouldValidate: true })}
                            />
                            <Label htmlFor="guidelines" className="text-sm leading-relaxed flex ">
                                <div className="flex-1">
                                      I agree to follow InkSaga's{" "}
                                <Link href="/writer-guidelines" className="text-blue-500 hover:underline">
                                    Writer Guidelines
                                </Link>
                                , maintain quality standards, and respect our community policies. I understand that my application
                                will be reviewed and I may be contacted for additional information. I also understand that comics
                                require owner approval before publication and earnings begin once my content gains readership.

                                </div>
                              
                            </Label>
                        </div>
                        {errors.agreeToGuidelines && <p className="text-sm text-red-500 mt-2">{errors.agreeToGuidelines.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6 border-t">
                        <Button
                            type="submit"
                            size="lg"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Submitting Application...</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <span>Submit Application</span>
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}