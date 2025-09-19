"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Users,
  Search,
  Star,
  MapPin,
  Mail,
  Target,
  TrendingUp,
  Eye,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Code,
  Globe,
  Github,
  Linkedin,
} from "lucide-react"

interface Candidate {
  id: string
  name: string
  email: string
  location: string
  avatar: string
  skills: string[]
  experience: string
  education: string
  overallScore: number
  skillTestScores: {
    technical: number
    communication: number
    problemSolving: number
  }
  lastActive: string
  status: "available" | "interviewing" | "hired"
  resumeUrl?: string
  portfolioUrl?: string
  linkedinUrl?: string
  githubUrl?: string
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    location: "San Francisco, CA",
    avatar: "/professional-headshot.png",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
    experience: "3 years as Software Developer",
    education: "BS Computer Science, Stanford University",
    overallScore: 92,
    skillTestScores: {
      technical: 95,
      communication: 88,
      problemSolving: 93,
    },
    lastActive: "2 hours ago",
    status: "available",
    portfolioUrl: "https://sarahjohnson.dev",
    linkedinUrl: "https://linkedin.com/in/sarahjohnson",
    githubUrl: "https://github.com/sarahjohnson",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    location: "New York, NY",
    avatar: "/professional-headshot.png",
    skills: ["Java", "Spring Boot", "Docker", "Kubernetes", "PostgreSQL"],
    experience: "5 years as Backend Engineer",
    education: "MS Software Engineering, MIT",
    overallScore: 88,
    skillTestScores: {
      technical: 92,
      communication: 82,
      problemSolving: 90,
    },
    lastActive: "1 day ago",
    status: "interviewing",
    linkedinUrl: "https://linkedin.com/in/michaelchen",
    githubUrl: "https://github.com/michaelchen",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    location: "Austin, TX",
    avatar: "/professional-headshot.png",
    skills: ["React", "Vue.js", "JavaScript", "CSS", "Figma"],
    experience: "2 years as Frontend Developer",
    education: "BS Web Development, UT Austin",
    overallScore: 85,
    skillTestScores: {
      technical: 87,
      communication: 91,
      problemSolving: 78,
    },
    lastActive: "3 hours ago",
    status: "available",
    portfolioUrl: "https://emilyrodriguez.design",
    linkedinUrl: "https://linkedin.com/in/emilyrodriguez",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@email.com",
    location: "Seattle, WA",
    avatar: "/professional-headshot.png",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "R"],
    experience: "4 years as Data Scientist",
    education: "PhD Data Science, University of Washington",
    overallScore: 94,
    skillTestScores: {
      technical: 96,
      communication: 89,
      problemSolving: 97,
    },
    lastActive: "5 hours ago",
    status: "available",
    linkedinUrl: "https://linkedin.com/in/davidkim",
    githubUrl: "https://github.com/davidkim",
  },
]

export default function CompanyDashboard() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)

  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSkill = selectedSkill === "all" || candidate.skills.includes(selectedSkill)
    const matchesLocation = selectedLocation === "all" || candidate.location.includes(selectedLocation)
    const matchesStatus = selectedStatus === "all" || candidate.status === selectedStatus

    return matchesSearch && matchesSkill && matchesLocation && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "interviewing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "hired":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Please log in to access the company dashboard.</p>
        </div>
      </div>
    )
  }

  if (selectedCandidate) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => setSelectedCandidate(null)}>
                  ← Back to Candidates
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-primary">Candidate Profile</h1>
                  <p className="text-muted-foreground">Detailed view and assessment results</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
                <Button>
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Candidate
                </Button>
              </div>
            </div>

            {/* Candidate Header */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <Avatar className="h-24 w-24 border-2 border-secondary/20">
                    <AvatarImage src={selectedCandidate.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl font-semibold">
                      {selectedCandidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-primary mb-2">{selectedCandidate.name}</h2>
                        <div className="space-y-1 text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {selectedCandidate.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {selectedCandidate.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Last active {selectedCandidate.lastActive}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getScoreColor(selectedCandidate.overallScore)}`}>
                          {selectedCandidate.overallScore}
                        </div>
                        <div className="text-sm text-muted-foreground">Overall Score</div>
                        <Badge className={`mt-2 ${getStatusColor(selectedCandidate.status)}`}>
                          {selectedCandidate.status.charAt(0).toUpperCase() + selectedCandidate.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Assessment Scores */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-secondary" />
                      Skill Assessment Results
                    </CardTitle>
                    <CardDescription>Detailed breakdown of assessment performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div
                          className={`text-2xl font-bold ${getScoreColor(selectedCandidate.skillTestScores.technical)} mb-1`}
                        >
                          {selectedCandidate.skillTestScores.technical}%
                        </div>
                        <div className="text-sm font-medium text-blue-900">Technical Skills</div>
                        <div className="text-xs text-blue-700 mt-1">Coding & Problem Solving</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div
                          className={`text-2xl font-bold ${getScoreColor(selectedCandidate.skillTestScores.communication)} mb-1`}
                        >
                          {selectedCandidate.skillTestScores.communication}%
                        </div>
                        <div className="text-sm font-medium text-green-900">Communication</div>
                        <div className="text-xs text-green-700 mt-1">Verbal & Written</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div
                          className={`text-2xl font-bold ${getScoreColor(selectedCandidate.skillTestScores.problemSolving)} mb-1`}
                        >
                          {selectedCandidate.skillTestScores.problemSolving}%
                        </div>
                        <div className="text-sm font-medium text-purple-900">Problem Solving</div>
                        <div className="text-xs text-purple-700 mt-1">Analytical Thinking</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-secondary" />
                      Technical Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-secondary/10 text-secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Experience & Education */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-secondary" />
                        Experience
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{selectedCandidate.experience}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-secondary" />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{selectedCandidate.education}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Interview
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Resume
                    </Button>
                  </CardContent>
                </Card>

                {/* Links */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">External Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedCandidate.portfolioUrl && (
                      <a
                        href={selectedCandidate.portfolioUrl}
                        className="flex items-center gap-2 text-sm text-secondary hover:underline p-2 bg-muted/50 rounded transition-colors hover:bg-muted"
                      >
                        <Globe className="h-4 w-4" />
                        Portfolio
                      </a>
                    )}
                    {selectedCandidate.linkedinUrl && (
                      <a
                        href={selectedCandidate.linkedinUrl}
                        className="flex items-center gap-2 text-sm text-secondary hover:underline p-2 bg-muted/50 rounded transition-colors hover:bg-muted"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}
                    {selectedCandidate.githubUrl && (
                      <a
                        href={selectedCandidate.githubUrl}
                        className="flex items-center gap-2 text-sm text-secondary hover:underline p-2 bg-muted/50 rounded transition-colors hover:bg-muted"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    )}
                  </CardContent>
                </Card>

                {/* Match Score */}
                <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Star className="h-5 w-5 text-secondary" />
                      Match Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary mb-2">94%</div>
                      <p className="text-sm text-muted-foreground">Excellent match for your requirements</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-full">
                <Building2 className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">Company Dashboard</h1>
                <p className="text-muted-foreground">Find and evaluate top talent</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Candidates</p>
                    <p className="text-2xl font-bold text-primary">1,247</p>
                  </div>
                  <Users className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Available Now</p>
                    <p className="text-2xl font-bold text-green-600">892</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">In Process</p>
                    <p className="text-2xl font-bold text-yellow-600">156</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Score</p>
                    <p className="text-2xl font-bold text-blue-600">87</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Find Candidates
              </CardTitle>
              <CardDescription>Search and filter candidates based on your requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Search by name or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    <SelectItem value="React">React</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="TypeScript">TypeScript</SelectItem>
                    <SelectItem value="Node.js">Node.js</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="San Francisco">San Francisco</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Austin">Austin</SelectItem>
                    <SelectItem value="Seattle">Seattle</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Candidates List */}
          <Card>
            <CardHeader>
              <CardTitle>Candidates ({filteredCandidates.length})</CardTitle>
              <CardDescription>Click on any candidate to view detailed profile and assessment results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-primary">{candidate.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {candidate.location}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">{candidate.experience}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(candidate.overallScore)}`}>
                            {candidate.overallScore}
                          </div>
                          <div className="text-xs text-muted-foreground">Overall Score</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${getStatusColor(candidate.status)}`}>
                            {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
