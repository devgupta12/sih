"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  MapPin,
  Phone,
  Mail,
  Github,
  Linkedin,
  Globe,
  Award,
  Briefcase,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
} from "lucide-react"

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  bio: string
  linkedinUrl: string
  githubUrl: string
  portfolioUrl: string
  skills: string[]
  experience: Array<{
    title: string
    company: string
    duration: string
    description: string
  }>
  education: Array<{
    degree: string
    institution: string
    year: string
  }>
  projects: Array<{
    name: string
    description: string
    technologies: string[]
  }>
}

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    location: "",
    bio: "",
    linkedinUrl: "",
    githubUrl: "",
    portfolioUrl: "",
    skills: [],
    experience: [],
    education: [],
    projects: [],
  })
  const [profileStep, setProfileStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [socialDataFetched, setSocialDataFetched] = useState(false)

  const profileCompletion = () => {
    const fields = [
      profileData.firstName,
      profileData.lastName,
      profileData.phone,
      profileData.location,
      profileData.bio,
      profileData.linkedinUrl || profileData.githubUrl,
    ]
    const completed = fields.filter((field) => field.trim() !== "").length
    return Math.round((completed / fields.length) * 100)
  }

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProfileStep(2)
  }

  const handleSocialLinksSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate fetching data from social profiles
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock social data fetch
    if (profileData.linkedinUrl) {
      setProfileData((prev) => ({
        ...prev,
        skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
        experience: [
          {
            title: "Software Developer Intern",
            company: "Tech Corp",
            duration: "2023 - Present",
            description: "Developed web applications using React and Node.js",
          },
        ],
        education: [
          {
            degree: "Bachelor of Computer Science",
            institution: "University of Technology",
            year: "2024",
          },
        ],
      }))
    }

    if (profileData.githubUrl) {
      setProfileData((prev) => ({
        ...prev,
        projects: [
          {
            name: "E-commerce Platform",
            description: "Full-stack web application with payment integration",
            technologies: ["React", "Node.js", "MongoDB"],
          },
          {
            name: "Task Management App",
            description: "Mobile-first task management application",
            technologies: ["React Native", "Firebase"],
          },
        ],
      }))
    }

    setSocialDataFetched(true)
    setIsLoading(false)
    setProfileStep(3)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Please log in to access your dashboard.</p>
        </div>
      </div>
    )
  }

  if (profileStep === 1) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">Welcome to Talent Tuner!</h1>
              <p className="text-muted-foreground">Let's complete your profile to get started</p>
              <Progress value={25} className="mt-4" />
              <p className="text-sm text-muted-foreground mt-2">Step 1 of 3: Basic Information</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>Tell us about yourself to personalize your experience</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBasicInfoSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={profileData.email} disabled className="bg-muted" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="City, Country"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio *</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself, your interests, and career goals..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Continue to Social Profiles
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (profileStep === 2) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">Connect Your Profiles</h1>
              <p className="text-muted-foreground">
                Link your social profiles to auto-populate your experience and skills
              </p>
              <Progress value={50} className="mt-4" />
              <p className="text-sm text-muted-foreground mt-2">Step 2 of 3: Social Profiles</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Social Profiles
                </CardTitle>
                <CardDescription>We'll fetch your professional information from these platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSocialLinksSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-blue-600" />
                      LinkedIn Profile URL
                    </Label>
                    <Input
                      id="linkedin"
                      value={profileData.linkedinUrl}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll fetch your work experience, education, and skills
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github" className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      GitHub Profile URL
                    </Label>
                    <Input
                      id="github"
                      value={profileData.githubUrl}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                      placeholder="https://github.com/yourusername"
                    />
                    <p className="text-xs text-muted-foreground">We'll analyze your repositories and projects</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio/Website URL (Optional)</Label>
                    <Input
                      id="portfolio"
                      value={profileData.portfolioUrl}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, portfolioUrl: e.target.value }))}
                      placeholder="https://yourportfolio.com"
                    />
                  </div>

                  {!profileData.linkedinUrl && !profileData.githubUrl && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-amber-800">Add at least one profile</p>
                          <p className="text-xs text-amber-700 mt-1">
                            Connecting your LinkedIn or GitHub will help us create a more complete profile
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setProfileStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1" size="lg" disabled={isLoading}>
                      {isLoading ? "Fetching Data..." : "Fetch Profile Data"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Enhanced Header */}
      <div className="border-b bg-gradient-to-r from-card to-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-secondary/20">
                <AvatarImage src="/professional-headshot.png" />
                <AvatarFallback className="text-lg font-semibold">
                  {profileData.firstName[0]}
                  {profileData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <p className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profileData.location}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <Progress value={profileCompletion()} className="w-24" />
                    <span className="text-sm text-muted-foreground">{profileCompletion()}% complete</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Member since</p>
              <p className="font-medium">January 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions - Enhanced */}
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/skill-testing">
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 group border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-3 p-3 bg-blue-500/10 rounded-full w-fit group-hover:bg-blue-500/20 transition-colors">
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2 text-blue-900">Skill Testing</h3>
                    <p className="text-sm text-blue-700/80">Take AI-powered assessments</p>
                    <div className="mt-3 flex items-center justify-center gap-1 text-xs text-blue-600">
                      <Star className="h-3 w-3 fill-current" />
                      <span>Popular</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/internships">
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 group border-0 bg-gradient-to-br from-green-50 to-green-100/50 hover:from-green-100 hover:to-green-200/50">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-3 p-3 bg-green-500/10 rounded-full w-fit group-hover:bg-green-500/20 transition-colors">
                      <Briefcase className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2 text-green-900">Find Internships</h3>
                    <p className="text-sm text-green-700/80">Search opportunities</p>
                    <div className="mt-3 flex items-center justify-center gap-1 text-xs text-green-600">
                      <Clock className="h-3 w-3" />
                      <span>Updated daily</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/resume-analyzer">
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 group border-0 bg-gradient-to-br from-purple-50 to-purple-100/50 hover:from-purple-100 hover:to-purple-200/50">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-3 p-3 bg-purple-500/10 rounded-full w-fit group-hover:bg-purple-500/20 transition-colors">
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2 text-purple-900">Resume Analysis</h3>
                    <p className="text-sm text-purple-700/80">Get AI feedback</p>
                    <div className="mt-3 flex items-center justify-center gap-1 text-xs text-purple-600">
                      <Star className="h-3 w-3 fill-current" />
                      <span>AI-Powered</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Recent Activity - Enhanced */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-secondary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-green-900">Profile Setup Complete</p>
                      <p className="text-sm text-green-700">Welcome to Talent Tuner!</p>
                    </div>
                    <span className="text-xs text-green-600">Just now</span>
                  </div>

                  {socialDataFetched && (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium text-blue-900">Social Profiles Connected</p>
                        <p className="text-sm text-blue-700">
                          Imported {profileData.skills.length} skills and {profileData.experience.length} work
                          experience
                        </p>
                      </div>
                      <span className="text-xs text-blue-600">2 min ago</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary - Enhanced */}
            <Card className="border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-secondary" />
                  Profile Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-primary">Bio</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{profileData.bio}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-primary">Contact</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                      <Mail className="h-4 w-4 text-secondary" />
                      <span className="truncate">{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                      <Phone className="h-4 w-4 text-secondary" />
                      {profileData.phone}
                    </div>
                  </div>
                </div>

                {(profileData.linkedinUrl || profileData.githubUrl || profileData.portfolioUrl) && (
                  <div>
                    <h4 className="font-medium mb-2 text-primary">Links</h4>
                    <div className="space-y-2">
                      {profileData.linkedinUrl && (
                        <a
                          href={profileData.linkedinUrl}
                          className="flex items-center gap-2 text-sm text-secondary hover:underline p-2 bg-muted/50 rounded transition-colors hover:bg-muted"
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                      )}
                      {profileData.githubUrl && (
                        <a
                          href={profileData.githubUrl}
                          className="flex items-center gap-2 text-sm text-secondary hover:underline p-2 bg-muted/50 rounded transition-colors hover:bg-muted"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                      )}
                      {profileData.portfolioUrl && (
                        <a
                          href={profileData.portfolioUrl}
                          className="flex items-center gap-2 text-sm text-secondary hover:underline p-2 bg-muted/50 rounded transition-colors hover:bg-muted"
                        >
                          <Globe className="h-4 w-4" />
                          Portfolio
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skills - Enhanced */}
            {profileData.skills.length > 0 && (
              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-secondary" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-secondary/10 text-secondary hover:bg-secondary/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Experience - Enhanced */}
            {profileData.experience.length > 0 && (
              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-secondary" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profileData.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-secondary/30 pl-4 pb-4">
                      <h4 className="font-medium text-primary">{exp.title}</h4>
                      <p className="text-sm text-muted-foreground font-medium">
                        {exp.company} • {exp.duration}
                      </p>
                      <p className="text-sm mt-2 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
