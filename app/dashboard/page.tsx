"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, CreditCard, TrendingUp, Plus, Calendar, DollarSign, Activity, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Mock data - in production, fetch from API
  const stats = {
    totalSubscriptions: 5,
    activeGroups: 3,
    monthlySavings: 850,
    pendingRequests: 2,
  }

  const recentActivity = [
    {
      id: 1,
      type: "joined",
      service: "Netflix Premium",
      amount: 199,
      date: "2 hours ago",
      status: "active",
    },
    {
      id: 2,
      type: "request",
      service: "Spotify Family",
      amount: 119,
      date: "1 day ago",
      status: "pending",
    },
    {
      id: 3,
      type: "created",
      service: "Adobe Creative Cloud",
      amount: 1675,
      date: "3 days ago",
      status: "active",
    },
  ]

  const upcomingPayments = [
    {
      id: 1,
      service: "Netflix Premium",
      amount: 199,
      dueDate: "Dec 15, 2024",
      status: "due",
    },
    {
      id: 2,
      service: "Spotify Family",
      amount: 119,
      dueDate: "Dec 20, 2024",
      status: "upcoming",
    },
  ]

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
              <p className="text-gray-600">Here's what's happening with your subscriptions</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <Link href="/dashboard/subscriptions/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subscription
                </Button>
              </Link>
              <Link href="/dashboard/groups/browse">
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Browse Groups
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSubscriptions}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeGroups}</div>
                <p className="text-xs text-muted-foreground">Sharing with 12 people</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{stats.monthlySavings}</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingRequests}</div>
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest subscription activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activity.status === "active"
                              ? "bg-green-500"
                              : activity.status === "pending"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-sm">
                            {activity.type === "joined" && "Joined group for "}
                            {activity.type === "request" && "Requested to join "}
                            {activity.type === "created" && "Created group for "}
                            {activity.service}
                          </p>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">₹{activity.amount}</p>
                        <Badge variant={activity.status === "active" ? "default" : "secondary"} className="text-xs">
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/activity">
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Activity
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Payments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Payments
                </CardTitle>
                <CardDescription>Your next subscription payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="font-medium text-sm">{payment.service}</p>
                          <p className="text-xs text-gray-500">Due: {payment.dueDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">₹{payment.amount}</p>
                        <Badge variant={payment.status === "due" ? "destructive" : "secondary"} className="text-xs">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/payments">
                    <Button variant="outline" className="w-full bg-transparent">
                      Manage Payments
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to get you started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/dashboard/subscriptions/new">
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                  >
                    <Plus className="h-6 w-6" />
                    <span className="font-medium">Add New Subscription</span>
                    <span className="text-xs text-gray-500">Share your subscriptions</span>
                  </Button>
                </Link>

                <Link href="/dashboard/groups/browse">
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                  >
                    <Users className="h-6 w-6" />
                    <span className="font-medium">Browse Groups</span>
                    <span className="text-xs text-gray-500">Join existing groups</span>
                  </Button>
                </Link>

                <Link href="/dashboard/profile">
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                  >
                    <CheckCircle className="h-6 w-6" />
                    <span className="font-medium">Complete Profile</span>
                    <span className="text-xs text-gray-500">Verify your account</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
