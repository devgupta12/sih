"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Clock, Target, Award, ArrowRight, CheckCircle, Mic, MicOff, RotateCcw, Home } from "lucide-react"
import Link from "next/link"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface InterviewQuestion {
  id: number
  question: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
}

const jobRoles = [
  { id: "frontend", name: "Frontend Developer", skills: ["React", "JavaScript", "CSS", "HTML"] },
  { id: "backend", name: "Backend Developer", skills: ["Node.js", "Python", "SQL", "APIs"] },
  { id: "fullstack", name: "Full Stack Developer", skills: ["React", "Node.js", "Databases", "DevOps"] },
  { id: "data-science", name: "Data Scientist", skills: ["Python", "Machine Learning", "Statistics", "SQL"] },
  { id: "mobile", name: "Mobile Developer", skills: ["React Native", "Flutter", "iOS", "Android"] },
  { id: "devops", name: "DevOps Engineer", skills: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
]

const mockQuestions: Record<string, Question[]> = {
  frontend: [
    {
      id: 1,
      question: "What is the Virtual DOM in React?",
      options: [
        "A copy of the real DOM kept in memory",
        "A virtual reality interface for DOM manipulation",
        "A debugging tool for React applications",
        "A server-side rendering technique",
      ],
      correctAnswer: 0,
      explanation:
        "The Virtual DOM is a JavaScript representation of the real DOM kept in memory and synced with the real DOM through a process called reconciliation.",
    },
    {
      id: 2,
      question: "Which CSS property is used to create a flexbox container?",
      options: ["display: flex", "flex-direction: row", "justify-content: center", "align-items: center"],
      correctAnswer: 0,
      explanation: "The display: flex property is used to create a flex container and enable flexbox layout.",
    },
    {
      id: 3,
      question: "What does 'hoisting' mean in JavaScript?",
      options: [
        "Moving variables to the top of their scope during compilation",
        "Lifting heavy objects in code",
        "Creating nested functions",
        "Optimizing code performance",
      ],
      correctAnswer: 0,
      explanation:
        "Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their containing scope during the compilation phase.",
    },
  ],
  backend: [
    {
      id: 1,
      question: "What is the purpose of middleware in Express.js?",
      options: [
        "To handle database connections",
        "To execute code during the request-response cycle",
        "To create user interfaces",
        "To manage file uploads only",
      ],
      correctAnswer: 1,
      explanation:
        "Middleware functions execute during the request-response cycle and can modify request/response objects, end the cycle, or call the next middleware.",
    },
    {
      id: 2,
      question: "Which HTTP status code indicates a successful POST request that created a resource?",
      options: ["200 OK", "201 Created", "204 No Content", "202 Accepted"],
      correctAnswer: 1,
      explanation: "201 Created indicates that the request was successful and a new resource was created as a result.",
    },
  ],
}

const mockInterviewQuestions: Record<string, InterviewQuestion[]> = {
  frontend: [
    {
      id: 1,
      question: "Tell me about a challenging frontend project you've worked on and how you overcame the difficulties.",
      category: "Experience",
      difficulty: "Medium",
    },
    {
      id: 2,
      question: "How would you optimize the performance of a React application?",
      category: "Technical",
      difficulty: "Hard",
    },
    {
      id: 3,
      question: "Explain the difference between controlled and uncontrolled components in React.",
      category: "Technical",
      difficulty: "Medium",
    },
  ],
  backend: [
    {
      id: 1,
      question: "How would you design a scalable API for a social media platform?",
      category: "System Design",
      difficulty: "Hard",
    },
    {
      id: 2,
      question: "Explain the difference between SQL and NoSQL databases and when to use each.",
      category: "Technical",
      difficulty: "Medium",
    },
  ],
}

export default function SkillTestingPage() {
  const { user } = useAuth()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [testMode, setTestMode] = useState<"quiz" | "interview" | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [interviewAnswers, setInterviewAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState("")

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Please log in to access skill testing.</p>
            <Link href="/">
              <Button>Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const questions = selectedRole ? mockQuestions[selectedRole] || [] : []
  const interviewQuestions = selectedRole ? mockInterviewQuestions[selectedRole] || [] : []

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId)
    setTestMode(null)
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setInterviewAnswers([])
    setShowResults(false)
  }

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (testMode === "quiz" && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (testMode === "interview" && currentQuestion < interviewQuestions.length - 1) {
      const newAnswers = [...interviewAnswers]
      newAnswers[currentQuestion] = currentAnswer
      setInterviewAnswers(newAnswers)
      setCurrentAnswer("")
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Finish test
      if (testMode === "interview") {
        const newAnswers = [...interviewAnswers]
        newAnswers[currentQuestion] = currentAnswer
        setInterviewAnswers(newAnswers)
      }
      setShowResults(true)
    }
  }

  const calculateQuizScore = () => {
    let correct = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index]?.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  const getInterviewScore = () => {
    // Mock AI scoring - in real app, this would use AI to analyze responses
    return Math.floor(Math.random() * 30) + 70 // Random score between 70-100
  }

  const resetTest = () => {
    setSelectedRole(null)
    setTestMode(null)
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setInterviewAnswers([])
    setShowResults(false)
    setCurrentAnswer("")
  }

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Skill Testing</h1>
              <p className="text-muted-foreground">Choose a role to start your AI-powered assessment</p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Role Selection */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobRoles.map((role) => (
              <Card
                key={role.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-secondary" />
                    {role.name}
                  </CardTitle>
                  <CardDescription>Test your skills in this role</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Key Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {role.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      Start Assessment
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-secondary" />
                  AI-Generated Quizzes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Role-specific technical questions</li>
                  <li>• Adaptive difficulty based on your responses</li>
                  <li>• Detailed explanations for each answer</li>
                  <li>• Instant scoring and ranking</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-secondary" />
                  AI Interview Coach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Simulated mock interview experience</li>
                  <li>• AI-powered response evaluation</li>
                  <li>• Personalized feedback and suggestions</li>
                  <li>• Practice common interview scenarios</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!testMode) {
    const selectedRoleData = jobRoles.find((role) => role.id === selectedRole)

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">{selectedRoleData?.name} Assessment</h1>
              <p className="text-muted-foreground">Choose your assessment type</p>
            </div>

            {/* Test Mode Selection */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card
                className="cursor-pointer hover:shadow-lg transition-all duration-200"
                onClick={() => setTestMode("quiz")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-6 w-6 text-secondary" />
                    Technical Quiz
                  </CardTitle>
                  <CardDescription>Test your technical knowledge with AI-generated questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      ~10 minutes
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="h-4 w-4" />
                      {questions.length} questions
                    </div>
                    <Button className="w-full">
                      Start Quiz
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-all duration-200"
                onClick={() => setTestMode("interview")}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="h-6 w-6 text-secondary" />
                    Mock Interview
                  </CardTitle>
                  <CardDescription>Practice with AI-powered interview simulation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      ~15 minutes
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="h-4 w-4" />
                      {interviewQuestions.length} questions
                    </div>
                    <Button className="w-full">
                      Start Interview
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button variant="outline" onClick={() => setSelectedRole(null)}>
                Choose Different Role
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const score = testMode === "quiz" ? calculateQuizScore() : getInterviewScore()
    const isGoodScore = score >= 80

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Results Header */}
            <div className="text-center mb-8">
              <div className="mb-4">
                {isGoodScore ? (
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                ) : (
                  <Target className="h-16 w-16 text-secondary mx-auto" />
                )}
              </div>
              <h1 className="text-3xl font-bold text-primary mb-2">Assessment Complete!</h1>
              <p className="text-muted-foreground">
                {testMode === "quiz" ? "Quiz" : "Interview"} results for{" "}
                {jobRoles.find((role) => role.id === selectedRole)?.name}
              </p>
            </div>

            {/* Score Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-secondary" />
                  Your Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{score}%</div>
                  <Progress value={score} className="mb-4" />
                  <p className="text-muted-foreground">
                    {isGoodScore
                      ? "Excellent work! You demonstrate strong skills in this area."
                      : "Good effort! Consider reviewing the areas below for improvement."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            {testMode === "quiz" && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Question Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {questions.map((question, index) => {
                      const userAnswer = selectedAnswers[index]
                      const isCorrect = userAnswer === question.correctAnswer

                      return (
                        <div key={question.id} className="border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              {isCorrect ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <Target className="h-5 w-5 text-red-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium mb-2">{question.question}</p>
                              <p className="text-sm text-muted-foreground mb-2">
                                Your answer: {question.options[userAnswer]}
                              </p>
                              {!isCorrect && (
                                <p className="text-sm text-green-700 mb-2">
                                  Correct answer: {question.options[question.correctAnswer]}
                                </p>
                              )}
                              <p className="text-sm text-muted-foreground">{question.explanation}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {testMode === "interview" && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>AI Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Strengths</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Clear communication and structured responses</li>
                        <li>• Good technical knowledge demonstration</li>
                        <li>• Professional demeanor throughout the interview</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Areas for Improvement</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Consider providing more specific examples</li>
                        <li>• Practice explaining complex concepts more simply</li>
                        <li>• Work on confidence in your responses</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <Button onClick={resetTest} className="flex-1">
                <RotateCcw className="h-4 w-4 mr-2" />
                Take Another Test
              </Button>
              <Link href="/dashboard" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (testMode === "quiz") {
    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} />
            </div>

            {/* Question */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{question.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAnswers[currentQuestion]?.toString()}
                  onValueChange={(value) => handleQuizAnswer(Number.parseInt(value))}
                >
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
                  <Button onClick={handleNextQuestion} disabled={selectedAnswers[currentQuestion] === undefined}>
                    {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (testMode === "interview") {
    const question = interviewQuestions[currentQuestion]
    const progress = ((currentQuestion + 1) / interviewQuestions.length) * 100

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {interviewQuestions.length}
                </span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} />
            </div>

            {/* Interview Question */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{question.category}</Badge>
                  <Badge variant={question.difficulty === "Hard" ? "destructive" : "secondary"}>
                    {question.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg mt-4">{question.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Type your response here... Take your time to provide a detailed answer."
                    rows={6}
                  />

                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsRecording(!isRecording)}
                      className={isRecording ? "text-red-600" : ""}
                    >
                      {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                      {isRecording ? "Stop Recording" : "Record Answer"}
                    </Button>
                    {isRecording && (
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                        Recording...
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                      disabled={currentQuestion === 0}
                    >
                      Previous
                    </Button>
                    <Button onClick={handleNextQuestion} disabled={!currentAnswer.trim()}>
                      {currentQuestion === interviewQuestions.length - 1 ? "Finish Interview" : "Next Question"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return null
}
