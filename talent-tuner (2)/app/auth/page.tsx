"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Building2, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

function AuthContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, login, signup } = useAuth()
  const [userType, setUserType] = useState<"user" | "company" | "admin">("user")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const role = searchParams.get("role") as "user" | "company" | "admin"
    if (role) {
      setUserType(role)
    }
  }, [searchParams])

  useEffect(() => {
    if (user) {
      if (user.role === "user") {
        router.push("/dashboard")
      } else if (user.role === "company") {
        router.push("/company-dashboard")
      } else if (user.role === "admin") {
        router.push("/admin-dashboard")
      }
    }
  }, [user, router])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      await login(email, password, userType)
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const userData = Object.fromEntries(formData.entries())

    try {
      await signup(userData, userType)
    } catch (error) {
      console.error("Signup failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleInfo = () => {
    switch (userType) {
      case "user":
        return {
          icon: Users,
          title: "Job Seeker",
          description: "Access skill testing, job search, and career development tools",
          color: "text-blue-600",
        }
      case "company":
        return {
          icon: Building2,
          title: "Company",
          description: "Find and evaluate top talent with our comprehensive platform",
          color: "text-green-600",
        }
      case "admin":
        return {
          icon: Shield,
          title: "Administrator",
          description: "Manage platform users, content, and system settings",
          color: "text-purple-600",
        }
    }
  }

  const roleInfo = getRoleInfo()
  const IconComponent = roleInfo.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <Card>
            <CardHeader className="text-center">
              <div className={`mx-auto mb-4 p-3 bg-muted rounded-full w-fit`}>
                <IconComponent className={`h-8 w-8 ${roleInfo.color}`} />
              </div>
              <CardTitle className="text-2xl">{roleInfo.title} Access</CardTitle>
              <CardDescription>{roleInfo.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Role Selection */}
              <div className="flex gap-2 mb-6">
                <Button
                  variant={userType === "user" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserType("user")}
                  className="flex-1"
                >
                  <Users className="h-4 w-4 mr-1" />
                  Candidate
                </Button>
                <Button
                  variant={userType === "company" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserType("company")}
                  className="flex-1"
                >
                  <Building2 className="h-4 w-4 mr-1" />
                  Company
                </Button>
                <Button
                  variant={userType === "admin" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserType("admin")}
                  className="flex-1"
                >
                  <Shield className="h-4 w-4 mr-1" />
                  Admin
                </Button>
              </div>

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" name="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
                      {isLoading
                        ? "Logging in..."
                        : `Login as ${userType === "user" ? "Candidate" : userType === "company" ? "Company" : "Admin"}`}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  {userType === "user" && (
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-firstname">First Name</Label>
                          <Input id="signup-firstname" name="firstName" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-lastname">Last Name</Label>
                          <Input id="signup-lastname" name="lastName" placeholder="Doe" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input id="signup-email" name="email" type="email" placeholder="john@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          name="password"
                          type="password"
                          placeholder="Create a strong password"
                          required
                        />
                      </div>
                      <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Create Candidate Account"}
                      </Button>
                    </form>
                  )}

                  {userType === "company" && (
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input id="company-name" name="companyName" placeholder="Acme Corp" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-email">Business Email</Label>
                        <Input id="company-email" name="email" type="email" placeholder="hr@acmecorp.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-password">Password</Label>
                        <Input
                          id="company-password"
                          name="password"
                          type="password"
                          placeholder="Create a strong password"
                          required
                        />
                      </div>
                      <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Create Company Account"}
                      </Button>
                    </form>
                  )}

                  {userType === "admin" && (
                    <div className="text-center py-8">
                      <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Admin accounts are created by invitation only.</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Contact your system administrator for access.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  )
}
