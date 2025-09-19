"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Target,
  Award,
  Lightbulb,
  ArrowRight,
  Download,
  RefreshCw,
  Star,
  Clock,
  Users,
  Briefcase,
  X,
} from "lucide-react"

interface ResumeAnalysis {
  overallScore: number
  sections: {
    name: string
    score: number
    feedback: string
    suggestions: string[]
  }[]
  strengths: string[]
  improvements: string[]
  keywords: {
    present: string[]
    missing: string[]
  }
  careerRoadmap: {
    currentLevel: string
    nextSteps: string[]
    skillGaps: string[]
    recommendedCourses: string[]
  }
}

export default function ResumeAnalyzer() {
  const { user } = useAuth()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [targetRole, setTargetRole] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null)
  const [analysisStep, setAnalysisStep] = useState<"upload" | "analyzing" | "results">("upload")
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.type === "application/pdf" || file.type.includes("document"))) {
      setSelectedFile(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type === "application/pdf" || file.type.includes("document")) {
        setSelectedFile(file)
      }
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  const handleAnalyze = async () => {
    if (!selectedFile || !targetRole) return

    setIsAnalyzing(true)
    setAnalysisStep("analyzing")

    try {
      // TODO: Integrate with Gemini API for resume analysis
      await new Promise((resolve) => setTimeout(resolve, 4000))

      const mockAnalysis: ResumeAnalysis = {
        overallScore: Math.floor(Math.random() * 30) + 70,
        sections: [
          {
            name: "Contact Information",
            score: 95,
            feedback: "Excellent - All essential contact details are present and professional",
            suggestions: ["Consider adding your LinkedIn profile URL", "Add your portfolio website if applicable"],
          },
          {
            name: "Professional Summary",
            score: 72,
            feedback: "Good foundation but could be more impactful for " + targetRole + " role",
            suggestions: [
              "Include specific achievements with quantifiable results",
              "Tailor summary to highlight " + targetRole + " relevant skills",
              "Add industry-specific keywords for ATS optimization",
            ],
          },
          {
            name: "Work Experience",
            score: 85,
            feedback: "Strong experience section with good use of action verbs",
            suggestions: [
              "Quantify more achievements with specific metrics and percentages",
              "Add more recent technologies relevant to " + targetRole,
              "Include leadership examples if targeting senior roles",
            ],
          },
          {
            name: "Skills",
            score: 68,
            feedback: "Skills are relevant but presentation could be improved",
            suggestions: [
              "Organize skills by category (Technical, Soft Skills, Tools)",
              "Add proficiency levels or years of experience",
              "Include more " + targetRole + "-specific skills",
            ],
          },
          {
            name: "Education",
            score: 90,
            feedback: "Well-formatted education section",
            suggestions: ["Consider adding relevant coursework for " + targetRole, "Include GPA if above 3.5"],
          },
        ],
        strengths: [
          "Clear and professional formatting",
          "Strong technical background relevant to " + targetRole,
          "Relevant work experience progression",
          "Good use of action verbs and quantified achievements",
          "Appropriate length and structure",
        ],
        improvements: [
          "Add more quantified achievements and impact metrics",
          "Include more " + targetRole + "-specific keywords",
          "Strengthen professional summary with role-specific focus",
          "Add relevant certifications or training",
          "Improve skills organization and categorization",
        ],
        keywords: {
          present: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git", "Agile", "Problem Solving"],
          missing: [
            "TypeScript",
            "AWS",
            "Docker",
            "Kubernetes",
            "CI/CD",
            "Machine Learning",
            "API Design",
            "System Design",
          ],
        },
        careerRoadmap: {
          currentLevel: "Mid-Level " + targetRole,
          nextSteps: [
            "Gain cloud computing experience (AWS/Azure/GCP)",
            "Learn containerization and orchestration technologies",
            "Develop leadership and mentoring capabilities",
            "Contribute to open-source projects in your field",
            "Obtain industry-relevant certifications",
          ],
          skillGaps: [
            "Cloud platforms and services",
            "DevOps practices and automation",
            "System design and architecture",
            "Team leadership and project management",
            "Advanced problem-solving methodologies",
          ],
          recommendedCourses: [
            "AWS Solutions Architect Certification",
            "Advanced " + targetRole + " Bootcamp",
            "System Design and Architecture",
            "Leadership in Technology Teams",
            "Industry-Specific Certification Programs",
          ],
        },
      }

      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
      setAnalysisStep("results")
    } catch (error) {
      console.error("Resume analysis failed:", error)
      setIsAnalyzing(false)
      setAnalysisStep("upload")
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-100 border-green-200"
    if (score >= 60) return "bg-yellow-100 border-yellow-200"
    return "bg-red-100 border-red-200"
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Please log in to access the Resume Analyzer.</p>
        </div>
      </div>
    )
  }

  if (analysisStep === "upload") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <TrendingUp className="h-4 w-4" />
                AI-Powered Resume Analysis
              </div>
              <h1 className="text-4xl font-bold text-primary mb-4">Resume Analyzer</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get instant AI feedback on your resume with personalized suggestions and career roadmap recommendations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-secondary/50 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit">
                    <Upload className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle>Upload Your Resume</CardTitle>
                  <CardDescription>Upload your resume in PDF or Word format for AI analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        dragActive
                          ? "border-secondary bg-secondary/5"
                          : "border-muted-foreground/25 hover:border-secondary/50"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop your resume here, or click to browse
                      </p>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <Label htmlFor="resume-upload" className="cursor-pointer">
                        <Button variant="outline" className="pointer-events-none bg-transparent">
                          Choose File
                        </Button>
                      </Label>
                      <p className="text-xs text-muted-foreground mt-2">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
                    </div>

                    {selectedFile && (
                      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <FileText className="h-5 w-5 text-green-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-green-800">{selectedFile.name}</p>
                          <p className="text-xs text-green-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeFile}
                          className="text-green-600 hover:text-green-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target-role">Target Role</Label>
                    <Input
                      id="target-role"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      placeholder="e.g., Senior Software Engineer, Product Manager, Data Scientist"
                    />
                    <p className="text-xs text-muted-foreground">
                      This helps our AI provide more targeted feedback and career recommendations
                    </p>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleAnalyze} disabled={!selectedFile || !targetRole}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Analyze Resume with AI
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5 text-secondary" />
                      What You'll Get
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Comprehensive AI Score</p>
                        <p className="text-sm text-muted-foreground">
                          Overall rating with detailed section-by-section breakdown
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Gemini AI-Powered Feedback</p>
                        <p className="text-sm text-muted-foreground">
                          Specific, actionable suggestions for improvement
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">ATS Keyword Analysis</p>
                        <p className="text-sm text-muted-foreground">
                          Optimization recommendations for applicant tracking systems
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Personalized Career Roadmap</p>
                        <p className="text-sm text-muted-foreground">
                          Next steps, skill gaps, and learning recommendations
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Star className="h-5 w-5 text-secondary" />
                      <span className="font-medium text-secondary">Pro Tip</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      For best results, upload your most recent resume and specify the exact role you're targeting. Our
                      Gemini AI will provide tailored feedback based on current industry standards and job market
                      requirements.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (analysisStep === "analyzing") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="mx-auto mb-6 p-4 bg-secondary/10 rounded-full w-fit">
                <RefreshCw className="h-12 w-12 text-secondary animate-spin" />
              </div>
              <h1 className="text-3xl font-bold text-primary mb-4">Analyzing Your Resume</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Our Gemini AI is carefully reviewing your resume and comparing it against {targetRole} industry
                standards...
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Parsing document structure and content</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Analyzing content quality and relevance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RefreshCw className="h-5 w-5 text-secondary animate-spin" />
                    <span>Comparing against {targetRole} requirements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Generating personalized career roadmap</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Preparing actionable recommendations</span>
                  </div>
                </div>
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Resume Analysis Results</h1>
              <p className="text-muted-foreground">
                Analysis for <span className="font-medium">{selectedFile?.name}</span> • Target Role:{" "}
                <span className="font-medium">{targetRole}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setAnalysisStep("upload")}>
                <Upload className="h-4 w-4 mr-2" />
                Analyze Another
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>

          <Card className={`mb-8 border-2 ${getScoreBgColor(analysis!.overallScore)}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-2">Overall AI Score</h2>
                  <p className="text-muted-foreground">Your resume scored above average for {targetRole} positions</p>
                </div>
                <div className="text-center">
                  <div className={`text-6xl font-bold ${getScoreColor(analysis!.overallScore)} mb-2`}>
                    {analysis!.overallScore}
                  </div>
                  <div className="text-sm text-muted-foreground">out of 100</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="sections" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="sections">Section Analysis</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="roadmap">Career Roadmap</TabsTrigger>
            </TabsList>

            <TabsContent value="sections" className="space-y-6">
              <div className="grid gap-6">
                {analysis!.sections.map((section, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          {section.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Progress value={section.score} className="w-24" />
                          <span className={`font-bold ${getScoreColor(section.score)}`}>{section.score}%</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{section.feedback}</p>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Suggestions for improvement:</h4>
                        <ul className="space-y-1">
                          {section.suggestions.map((suggestion, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="keywords" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      Keywords Present
                    </CardTitle>
                    <CardDescription>These relevant keywords were found in your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysis!.keywords.present.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      Missing Keywords
                    </CardTitle>
                    <CardDescription>Consider adding these keywords to improve ATS compatibility</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysis!.keywords.missing.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="border-red-200 text-red-600">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      Strengths
                    </CardTitle>
                    <CardDescription>What your resume does well</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysis!.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-600">
                      <AlertTriangle className="h-5 w-5" />
                      Areas for Improvement
                    </CardTitle>
                    <CardDescription>Opportunities to strengthen your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysis!.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="roadmap" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-secondary" />
                    Your Career Roadmap
                  </CardTitle>
                  <CardDescription>
                    Based on your current profile, here's your personalized career development plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 p-4 bg-secondary/10 rounded-lg">
                      <Users className="h-6 w-6 text-secondary" />
                      <div>
                        <p className="font-medium">Current Level</p>
                        <p className="text-sm text-muted-foreground">{analysis!.careerRoadmap.currentLevel}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <ArrowRight className="h-4 w-4" />
                            Next Steps
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {analysis!.careerRoadmap.nextSteps.map((step, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                                {step}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Skill Gaps
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {analysis!.careerRoadmap.skillGaps.map((gap, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                                {gap}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Recommended Learning
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          {analysis!.careerRoadmap.recommendedCourses.map((course, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <Briefcase className="h-4 w-4 text-secondary" />
                              <span className="text-sm">{course}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
