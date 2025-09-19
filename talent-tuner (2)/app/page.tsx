"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Brain,
  Users,
  Building2,
  Shield,
  Target,
  TrendingUp,
  Briefcase,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react"

export default function LandingPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      if (user.role === "user") {
        router.push("/dashboard")
      } else if (user.role === "company") {
        router.push("/company-dashboard")
      } else if (user.role === "admin") {
        router.push("/admin-dashboard")
      }
    }
  }, [user, router])

  const handleRoleSelection = (role: "user" | "company" | "admin") => {
    router.push(`/auth?role=${role}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Talent Management Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 text-balance">
            Unlock Your Career Potential with <span className="text-secondary">AI Intelligence</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 text-balance max-w-3xl mx-auto leading-relaxed">
            Transform your career journey with personalized skill assessments, intelligent internship matching, and
            AI-driven resume optimization. Join thousands of professionals advancing their careers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="text-lg px-8 py-6 group bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70"
              onClick={() => handleRoleSelection("user")}
            >
              Tune Your Career
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent"
              onClick={() => handleRoleSelection("company")}
            >
              For Companies
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Everything You Need to Succeed</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform combines cutting-edge AI with proven career development strategies
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit group-hover:bg-secondary/20 transition-colors">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-xl">AI Skill Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Take personalized assessments with AI-generated questions tailored to your target role. Get instant
                feedback and detailed performance analytics.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit group-hover:bg-secondary/20 transition-colors">
                <Briefcase className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-xl">Smart Job Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Discover internships and jobs that perfectly match your skills and career goals. Our AI analyzes
                thousands of opportunities across multiple platforms.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit group-hover:bg-secondary/20 transition-colors">
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-xl">Resume Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Get AI-powered feedback on your resume with specific suggestions for improvement. Receive personalized
                career roadmaps and skill recommendations.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Choose Your Path</h2>
          <p className="text-lg text-muted-foreground">Select your role to access tailored features and experiences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Candidate Card */}
          <Card
            className="cursor-pointer group hover:shadow-2xl transition-all duration-500 border-2 hover:border-secondary/50 bg-gradient-to-br from-card to-card/50"
            onMouseEnter={() => setHoveredCard("candidate")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleRoleSelection("user")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-blue-500/10 rounded-full w-fit group-hover:bg-blue-500/20 transition-colors">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Job Seekers</CardTitle>
              <CardDescription className="text-base">
                Students, graduates, and professionals looking to advance their careers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm">Personalized skill assessments</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm">AI-powered job matching</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm">Resume optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm">Career roadmap guidance</span>
              </div>

              <Button className="w-full mt-6 group-hover:bg-blue-600 transition-colors">
                Get Started
                <ArrowRight
                  className={`ml-2 h-4 w-4 transition-transform ${hoveredCard === "candidate" ? "translate-x-1" : ""}`}
                />
              </Button>
            </CardContent>
          </Card>

          {/* Company Card */}
          <Card
            className="cursor-pointer group hover:shadow-2xl transition-all duration-500 border-2 hover:border-secondary/50 bg-gradient-to-br from-card to-card/50"
            onMouseEnter={() => setHoveredCard("company")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleRoleSelection("company")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-green-500/10 rounded-full w-fit group-hover:bg-green-500/20 transition-colors">
                <Building2 className="h-12 w-12 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Companies</CardTitle>
              <CardDescription className="text-base">
                HR teams and recruiters looking to find the best talent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm">Access candidate profiles</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm">View skill assessment results</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm">Advanced filtering tools</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm">Talent analytics dashboard</span>
              </div>

              <Button className="w-full mt-6 group-hover:bg-green-600 transition-colors">
                Find Talent
                <ArrowRight
                  className={`ml-2 h-4 w-4 transition-transform ${hoveredCard === "company" ? "translate-x-1" : ""}`}
                />
              </Button>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card
            className="cursor-pointer group hover:shadow-2xl transition-all duration-500 border-2 hover:border-secondary/50 bg-gradient-to-br from-card to-card/50"
            onMouseEnter={() => setHoveredCard("admin")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleRoleSelection("admin")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-purple-500/10 rounded-full w-fit group-hover:bg-purple-500/20 transition-colors">
                <Shield className="h-12 w-12 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Administrators</CardTitle>
              <CardDescription className="text-base">
                Platform administrators managing users and system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm">User management</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm">System analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm">Content moderation</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm">Platform configuration</span>
              </div>

              <Button className="w-full mt-6 group-hover:bg-purple-600 transition-colors">
                Admin Access
                <ArrowRight
                  className={`ml-2 h-4 w-4 transition-transform ${hoveredCard === "admin" ? "translate-x-1" : ""}`}
                />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Trusted by Thousands</h2>
            <p className="text-lg text-muted-foreground">Join the growing community of successful professionals</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Partner Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="h-6 w-6 text-secondary" />
              <span className="text-xl font-bold text-primary">Talent Tuner</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Empowering careers with AI-driven insights and personalized guidance
            </p>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                Contact Us
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-6">© 2024 Talent Tuner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
