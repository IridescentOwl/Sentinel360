"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Plus, Clock, CheckCircle, XCircle, Eye } from "lucide-react"
import Link from "next/link"

interface Group {
  id: number
  subscriptionName: string
  totalSlots: number
  availableSlots: number
  pricePerSlot: number
  isOwner: boolean
  status: "active" | "pending" | "full"
  members: number
  nextBilling: string
}

interface MemberRequest {
  id: number
  groupId: number
  groupName: string
  userName: string
  userEmail: string
  requestDate: string
  status: "pending" | "approved" | "rejected"
}

export default function GroupsPage() {
  const [myGroups, setMyGroups] = useState<Group[]>([])
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([])
  const [pendingRequests, setPendingRequests] = useState<MemberRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    try {
      const response = await fetch("/api/groups", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setMyGroups(data.ownedGroups)
        setJoinedGroups(data.joinedGroups)
        setPendingRequests(data.pendingRequests)
      }
    } catch (error) {
      console.error("Failed to fetch groups:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRequestAction = async (requestId: number, action: "approve" | "reject") => {
    try {
      const response = await fetch(`/api/groups/requests/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ action }),
      })

      if (response.ok) {
        fetchGroups() // Refresh data
      }
    } catch (error) {
      console.error("Failed to handle request:", error)
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Groups</h1>
              <p className="text-gray-600">Manage your sharing groups and memberships</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <Link href="/dashboard/groups/browse">
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Browse Groups
                </Button>
              </Link>
              <Link href="/dashboard/subscriptions">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Group
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Groups I Own</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{myGroups.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Groups I Joined</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{joinedGroups.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingRequests.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{myGroups.reduce((total, group) => total + group.members, 0)}</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="owned" className="space-y-6">
            <TabsList>
              <TabsTrigger value="owned">Groups I Own ({myGroups.length})</TabsTrigger>
              <TabsTrigger value="joined">Groups I Joined ({joinedGroups.length})</TabsTrigger>
              <TabsTrigger value="requests">Pending Requests ({pendingRequests.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="owned" className="space-y-4">
              {myGroups.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No groups created yet</h3>
                    <p className="text-gray-600 text-center mb-6">
                      Create your first sharing group from your subscriptions.
                    </p>
                    <Link href="/dashboard/subscriptions">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Group
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myGroups.map((group) => (
                    <Card key={group.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{group.subscriptionName}</CardTitle>
                            <CardDescription>Next billing: {group.nextBilling}</CardDescription>
                          </div>
                          <Badge
                            variant={
                              group.status === "active"
                                ? "default"
                                : group.status === "full"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {group.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Price per slot</span>
                            <span className="font-semibold">₹{group.pricePerSlot}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Members</span>
                            <span className="font-semibold">
                              {group.members}/{group.totalSlots}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Available slots</span>
                            <span className="font-semibold text-green-600">{group.availableSlots}</span>
                          </div>

                          <Link href={`/dashboard/groups/${group.id}`}>
                            <Button className="w-full">Manage Group</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="joined" className="space-y-4">
              {joinedGroups.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <CheckCircle className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No groups joined yet</h3>
                    <p className="text-gray-600 text-center mb-6">Browse available groups and join to start saving.</p>
                    <Link href="/dashboard/groups/browse">
                      <Button>
                        <Eye className="h-4 w-4 mr-2" />
                        Browse Groups
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {joinedGroups.map((group) => (
                    <Card key={group.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{group.subscriptionName}</CardTitle>
                            <CardDescription>Next billing: {group.nextBilling}</CardDescription>
                          </div>
                          <Badge variant="default">Member</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Your share</span>
                            <span className="font-semibold">₹{group.pricePerSlot}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Total members</span>
                            <span className="font-semibold">{group.members}</span>
                          </div>

                          <Link href={`/dashboard/groups/${group.id}`}>
                            <Button variant="outline" className="w-full bg-transparent">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="requests" className="space-y-4">
              {pendingRequests.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Clock className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No pending requests</h3>
                    <p className="text-gray-600 text-center">All requests have been handled.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{request.userName}</h3>
                            <p className="text-sm text-gray-600">{request.userEmail}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              Wants to join "{request.groupName}" • {request.requestDate}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleRequestAction(request.id, "approve")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRequestAction(request.id, "reject")}
                              className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
