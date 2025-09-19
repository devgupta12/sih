"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Shield,
  Users,
  Building2,
  BarChart3,
  Settings,
  MoreHorizontal,
  UserCheck,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Plus,
  Download,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "company" | "admin"
  status: "active" | "inactive" | "suspended"
  joinDate: string
  lastActive: string
  avatar?: string
}

interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalCompanies: number
  totalAssessments: number
  systemUptime: string
  avgResponseTime: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "user",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    avatar: "/professional-headshot.png",
  },
  {
    id: "2",
    name: "TechCorp Inc.",
    email: "hr@techcorp.com",
    role: "company",
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    role: "user",
    status: "inactive",
    joinDate: "2024-01-20",
    lastActive: "1 week ago",
    avatar: "/professional-headshot.png",
  },
  {
    id: "4",
    name: "InnovateLabs",
    email: "talent@innovatelabs.com",
    role: "company",
    status: "active",
    joinDate: "2024-01-05",
    lastActive: "3 hours ago",
  },
  {
    id: "5",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    role: "user",
    status: "suspended",
    joinDate: "2024-01-25",
    lastActive: "2 days ago",
    avatar: "/professional-headshot.png",
  },
]

const mockStats: SystemStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalCompanies: 156,
  totalAssessments: 3421,
  systemUptime: "99.9%",
  avgResponseTime: "120ms",
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "user":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "company":
        return "bg-green-100 text-green-800 border-green-200"
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "user":
        return <Users className="h-4 w-4" />
      case "company":
        return <Building2 className="h-4 w-4" />
      case "admin":
        return <Shield className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="max-w-md mx-auto">
            <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-primary mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You need administrator privileges to access this dashboard.</p>
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
              <div className="p-3 bg-purple-500/10 rounded-full">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
                <p className="text-muted-foreground">System management and analytics</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Administrator</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* System Stats */}
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Users</p>
                        <p className="text-2xl font-bold text-primary">{mockStats.totalUsers.toLocaleString()}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Users</p>
                        <p className="text-2xl font-bold text-green-600">{mockStats.activeUsers.toLocaleString()}</p>
                      </div>
                      <UserCheck className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Companies</p>
                        <p className="text-2xl font-bold text-purple-600">{mockStats.totalCompanies}</p>
                      </div>
                      <Building2 className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Assessments</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {mockStats.totalAssessments.toLocaleString()}
                        </p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Uptime</p>
                        <p className="text-2xl font-bold text-green-600">{mockStats.systemUptime}</p>
                      </div>
                      <Activity className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Response</p>
                        <p className="text-2xl font-bold text-blue-600">{mockStats.avgResponseTime}</p>
                      </div>
                      <Clock className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-secondary" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div className="flex-1">
                          <p className="font-medium text-green-900">New user registration</p>
                          <p className="text-sm text-green-700">sarah.johnson@email.com joined</p>
                        </div>
                        <span className="text-xs text-green-600">2 min ago</span>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        <div className="flex-1">
                          <p className="font-medium text-blue-900">Company verification</p>
                          <p className="text-sm text-blue-700">TechCorp Inc. verified</p>
                        </div>
                        <span className="text-xs text-blue-600">1 hour ago</span>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <div className="flex-1">
                          <p className="font-medium text-yellow-900">System maintenance</p>
                          <p className="text-sm text-yellow-700">Scheduled for tonight</p>
                        </div>
                        <span className="text-xs text-yellow-600">3 hours ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-secondary" />
                      Growth Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">User Growth</p>
                          <p className="text-sm text-muted-foreground">This month</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-green-600">
                            <TrendingUp className="h-4 w-4" />
                            <span className="font-bold">+12.5%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">Assessment Completion</p>
                          <p className="text-sm text-muted-foreground">This week</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-green-600">
                            <TrendingUp className="h-4 w-4" />
                            <span className="font-bold">+8.3%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">Company Signups</p>
                          <p className="text-sm text-muted-foreground">This month</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-red-600">
                            <TrendingDown className="h-4 w-4" />
                            <span className="font-bold">-2.1%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              {/* User Management Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-primary">User Management</h2>
                  <p className="text-muted-foreground">Manage user accounts and permissions</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>

              {/* Search and Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="user">Users</SelectItem>
                        <SelectItem value="company">Companies</SelectItem>
                        <SelectItem value="admin">Admins</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Users List */}
              <Card>
                <CardHeader>
                  <CardTitle>Users ({filteredUsers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-primary">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground">
                                  Joined {user.joinDate} • Last active {user.lastActive}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={`text-xs ${getRoleColor(user.role)}`}>
                                <span className="flex items-center gap-1">
                                  {getRoleIcon(user.role)}
                                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </span>
                              </Badge>
                              <Badge className={`text-xs ${getStatusColor(user.status)}`}>
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">Analytics Dashboard</h2>
                <p className="text-muted-foreground">Platform usage and performance metrics</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Engagement</CardTitle>
                    <CardDescription>Daily active users over the past month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                      <p className="text-muted-foreground">Chart visualization would go here</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Performance</CardTitle>
                    <CardDescription>Average scores by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Technical Skills</span>
                        <span className="font-bold text-blue-600">87%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Communication</span>
                        <span className="font-bold text-green-600">82%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Problem Solving</span>
                        <span className="font-bold text-purple-600">89%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Platform Usage</CardTitle>
                    <CardDescription>Feature adoption rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Skill Testing</span>
                        <span className="font-bold text-blue-600">94%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Job Search</span>
                        <span className="font-bold text-green-600">78%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Resume Analysis</span>
                        <span className="font-bold text-purple-600">65%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Performance</CardTitle>
                    <CardDescription>Real-time system metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">CPU Usage</span>
                        <span className="font-bold text-green-600">23%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Memory Usage</span>
                        <span className="font-bold text-yellow-600">67%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Database Load</span>
                        <span className="font-bold text-blue-600">45%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">Content Management</h2>
                <p className="text-muted-foreground">Manage assessments, questions, and platform content</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Assessment Questions</CardTitle>
                    <CardDescription>Manage skill test questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Questions</span>
                        <span className="font-bold">1,247</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pending Review</span>
                        <span className="font-bold text-yellow-600">23</span>
                      </div>
                      <Button className="w-full" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Manage Questions
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Job Listings</CardTitle>
                    <CardDescription>Moderate job postings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Active Listings</span>
                        <span className="font-bold">892</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Flagged</span>
                        <span className="font-bold text-red-600">5</span>
                      </div>
                      <Button className="w-full" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Review Listings
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">User Reports</CardTitle>
                    <CardDescription>Handle user-reported content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Open Reports</span>
                        <span className="font-bold text-red-600">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Resolved Today</span>
                        <span className="font-bold text-green-600">8</span>
                      </div>
                      <Button className="w-full" size="sm">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Review Reports
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">System Settings</h2>
                <p className="text-muted-foreground">Configure platform settings and preferences</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Configuration</CardTitle>
                    <CardDescription>General platform settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">Enable maintenance mode for updates</p>
                      </div>
                      <Switch id="maintenance-mode" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="user-registration">User Registration</Label>
                        <p className="text-sm text-muted-foreground">Allow new user registrations</p>
                      </div>
                      <Switch id="user-registration" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send system email notifications</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Security and authentication settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor">Require 2FA for Admins</Label>
                        <p className="text-sm text-muted-foreground">Enforce two-factor authentication</p>
                      </div>
                      <Switch id="two-factor" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="session-timeout">Auto Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
                      </div>
                      <Switch id="session-timeout" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="audit-logging">Audit Logging</Label>
                        <p className="text-sm text-muted-foreground">Log all administrative actions</p>
                      </div>
                      <Switch id="audit-logging" defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                    <CardDescription>Data backup and export settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-transparent" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export User Data
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Analytics
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Backup Settings
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Information</CardTitle>
                    <CardDescription>Current system status and version info</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Platform Version</span>
                      <span className="font-bold">v2.1.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Version</span>
                      <span className="font-bold">PostgreSQL 15.2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last Backup</span>
                      <span className="font-bold text-green-600">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System Status</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Healthy
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
