"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Filter,
  Bookmark,
  ExternalLink,
  Home,
  Briefcase,
  Calendar,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "remote" | "hybrid" | "onsite"
  experienceLevel: "entry" | "mid" | "senior"
  salary: {
    min: number
    max: number
    currency: string
  }
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  applicationDeadline: string
  skills: string[]
  companyLogo: string
  isBookmarked: boolean
  applicants: number
  rating: number
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "hybrid",
    experienceLevel: "entry",
    salary: { min: 4000, max: 6000, currency: "USD" },
    description:
      "Join our dynamic frontend team to build cutting-edge web applications using React, TypeScript, and modern development tools. You'll work on real projects that impact thousands of users.",
    requirements: ["React", "JavaScript", "HTML/CSS", "Git"],
    benefits: ["Health Insurance", "Flexible Hours", "Learning Budget", "Mentorship"],
    postedDate: "2024-01-15",
    applicationDeadline: "2024-02-15",
    skills: ["React", "JavaScript", "TypeScript", "CSS"],
    companyLogo: "/company-logo-1.png",
    isBookmarked: false,
    applicants: 45,
    rating: 4.5,
  },
  {
    id: "2",
    title: "Backend Developer Intern",
    company: "DataFlow Solutions",
    location: "New York, NY",
    type: "remote",
    experienceLevel: "entry",
    salary: { min: 3500, max: 5500, currency: "USD" },
    description:
      "Work with our backend team to develop scalable APIs and microservices. Learn about cloud architecture, databases, and modern backend technologies.",
    requirements: ["Node.js", "Python", "SQL", "REST APIs"],
    benefits: ["Remote Work", "Health Insurance", "Stock Options", "Professional Development"],
    postedDate: "2024-01-12",
    applicationDeadline: "2024-02-12",
    skills: ["Node.js", "Python", "PostgreSQL", "AWS"],
    companyLogo: "/company-logo-2.png",
    isBookmarked: true,
    applicants: 32,
    rating: 4.2,
  },
  {
    id: "3",
    title: "Full Stack Developer Intern",
    company: "StartupXYZ",
    location: "Austin, TX",
    type: "onsite",
    experienceLevel: "entry",
    salary: { min: 3000, max: 4500, currency: "USD" },
    description:
      "Be part of a fast-growing startup and work on both frontend and backend development. Great opportunity to learn the full development lifecycle.",
    requirements: ["React", "Node.js", "MongoDB", "JavaScript"],
    benefits: ["Startup Equity", "Free Lunch", "Flexible PTO", "Learning Opportunities"],
    postedDate: "2024-01-10",
    applicationDeadline: "2024-02-10",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    companyLogo: "/company-logo-3.png",
    isBookmarked: false,
    applicants: 28,
    rating: 4.0,
  },
  {
    id: "4",
    title: "Data Science Intern",
    company: "AI Innovations",
    location: "Seattle, WA",
    type: "hybrid",
    experienceLevel: "entry",
    salary: { min: 4500, max: 7000, currency: "USD" },
    description:
      "Work on machine learning projects and data analysis. Gain hands-on experience with Python, TensorFlow, and big data technologies.",
    requirements: ["Python", "Machine Learning", "Statistics", "SQL"],
    benefits: ["Health Insurance", "Gym Membership", "Conference Attendance", "Mentorship"],
    postedDate: "2024-01-08",
    applicationDeadline: "2024-02-08",
    skills: ["Python", "TensorFlow", "Pandas", "SQL"],
    companyLogo: "/company-logo-4.png",
    isBookmarked: true,
    applicants: 67,
    rating: 4.7,
  },
  {
    id: "5",
    title: "Mobile Developer Intern",
    company: "MobileFirst Co.",
    location: "Los Angeles, CA",
    type: "onsite",
    experienceLevel: "entry",
    salary: { min: 3800, max: 5200, currency: "USD" },
    description:
      "Develop mobile applications for iOS and Android platforms. Learn React Native and native development practices.",
    requirements: ["React Native", "JavaScript", "Mobile Development", "Git"],
    benefits: ["Health Insurance", "Device Allowance", "Training Programs", "Team Events"],
    postedDate: "2024-01-05",
    applicationDeadline: "2024-02-05",
    skills: ["React Native", "iOS", "Android", "JavaScript"],
    companyLogo: "/company-logo-5.png",
    isBookmarked: false,
    applicants: 41,
    rating: 4.3,
  },
  {
    id: "6",
    title: "DevOps Engineer Intern",
    company: "CloudTech Systems",
    location: "Denver, CO",
    type: "remote",
    experienceLevel: "mid",
    salary: { min: 5000, max: 7500, currency: "USD" },
    description:
      "Learn about cloud infrastructure, CI/CD pipelines, and containerization. Work with AWS, Docker, and Kubernetes.",
    requirements: ["AWS", "Docker", "Linux", "CI/CD"],
    benefits: ["Remote Work", "Certification Support", "Health Insurance", "Flexible Schedule"],
    postedDate: "2024-01-03",
    applicationDeadline: "2024-02-03",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins"],
    companyLogo: "/company-logo-6.png",
    isBookmarked: false,
    applicants: 23,
    rating: 4.4,
  },
]

export default function InternshipsPage() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs)
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [experienceFilter, setExperienceFilter] = useState("all")
  const [salaryFilter, setSalaryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [skillsFilter, setSkillsFilter] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("recent")

  const allSkills = Array.from(new Set(mockJobs.flatMap((job) => job.skills)))

  useEffect(() => {
    let filtered = jobs

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter((job) => job.location.toLowerCase().includes(locationFilter.toLowerCase()))
    }

    // Experience filter
    if (experienceFilter !== "all") {
      filtered = filtered.filter((job) => job.experienceLevel === experienceFilter)
    }

    // Salary filter
    if (salaryFilter !== "all") {
      const [min, max] = salaryFilter.split("-").map(Number)
      filtered = filtered.filter((job) => {
        if (max) {
          return job.salary.min >= min && job.salary.max <= max
        } else {
          return job.salary.min >= min
        }
      })
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((job) => job.type === typeFilter)
    }

    // Skills filter
    if (skillsFilter.length > 0) {
      filtered = filtered.filter((job) => skillsFilter.some((skill) => job.skills.includes(skill)))
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        case "salary":
          return b.salary.max - a.salary.max
        case "rating":
          return b.rating - a.rating
        case "applicants":
          return a.applicants - b.applicants
        default:
          return 0
      }
    })

    setFilteredJobs(filtered)
  }, [jobs, searchQuery, locationFilter, experienceFilter, salaryFilter, typeFilter, skillsFilter, sortBy])

  const toggleBookmark = (jobId: string) => {
    setJobs((prevJobs) => prevJobs.map((job) => (job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job)))
  }

  const toggleSkillFilter = (skill: string) => {
    setSkillsFilter((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setLocationFilter("")
    setExperienceFilter("all")
    setSalaryFilter("all")
    setTypeFilter("all")
    setSkillsFilter([])
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Please log in to search for internships.</p>
            <Link href="/">
              <Button>Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Internship Search</h1>
            <p className="text-muted-foreground">Find your perfect internship opportunity</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                    {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
                {/* Location Filter */}
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    placeholder="Enter city or state"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>

                {/* Experience Level */}
                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Salary Range */}
                <div className="space-y-2">
                  <Label>Salary Range (Monthly)</Label>
                  <Select value={salaryFilter} onValueChange={setSalaryFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ranges</SelectItem>
                      <SelectItem value="0-3000">$0 - $3,000</SelectItem>
                      <SelectItem value="3000-5000">$3,000 - $5,000</SelectItem>
                      <SelectItem value="5000-7000">$5,000 - $7,000</SelectItem>
                      <SelectItem value="7000">$7,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Type */}
                <div className="space-y-2">
                  <Label>Job Type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Skills Filter */}
                <div className="space-y-2">
                  <Label>Skills</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {allSkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={skillsFilter.includes(skill)}
                          onCheckedChange={() => toggleSkillFilter(skill)}
                        />
                        <Label htmlFor={skill} className="text-sm cursor-pointer">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by job title, company, or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="salary">Highest Salary</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="applicants">Fewest Applicants</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredJobs.length} of {jobs.length} internships
              </p>
              <div className="flex items-center gap-2">
                {(searchQuery ||
                  locationFilter ||
                  experienceFilter !== "all" ||
                  salaryFilter !== "all" ||
                  typeFilter !== "all" ||
                  skillsFilter.length > 0) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Filter className="h-3 w-3" />
                    Filters Applied
                  </Badge>
                )}
              </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-primary">{job.title}</h3>
                              <p className="text-muted-foreground">{job.company}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleBookmark(job.id)}
                              className={job.isBookmarked ? "text-secondary" : ""}
                            >
                              <Bookmark className={`h-4 w-4 ${job.isBookmarked ? "fill-current" : ""}`} />
                            </Button>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />${job.salary.min.toLocaleString()} - $
                              {job.salary.max.toLocaleString()}/month
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {job.applicants} applicants
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-current text-yellow-500" />
                              {job.rating}
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{job.description}</p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {job.skills.slice(0, 4).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.skills.length - 4} more
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Posted {new Date(job.postedDate).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Apply by {new Date(job.applicationDeadline).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              <Button size="sm">
                                Apply Now
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredJobs.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No internships found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search criteria or filters to find more opportunities.
                    </p>
                    <Button onClick={clearFilters}>Clear All Filters</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
