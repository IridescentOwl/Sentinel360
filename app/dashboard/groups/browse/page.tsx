"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Users, DollarSign, Calendar, Clock } from "lucide-react"
import Link from "next/link"

interface AvailableGroup {
  id: number
  subscriptionName: string
  ownerName: string
  totalSlots: number
  availableSlots: number
  pricePerSlot: number
  nextBilling: string
  billingCycle: "monthly" | "yearly"
  hasRequested: boolean
}

export default function BrowseGroupsPage() {
  const [groups, setGroups] = useState<AvailableGroup[]>([])
  const [filteredGroups, setFilteredGroups] = useState<AvailableGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("price")
  const [filterBy, setFilterBy] = useState("all")

  useEffect(() => {
    fetchAvailableGroups()
  }, [])

  useEffect(() => {
    filterAndSortGroups()
  }, [groups, searchTerm, sortBy, filterBy])

  const fetchAvailableGroups = async () => {
    try {
      const response = await fetch("/api/groups/browse", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setGroups(data.groups)
      }
    } catch (error) {
      console.error("Failed to fetch groups:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortGroups = () => {
    let filtered = groups.filter((group) => group.subscriptionName.toLowerCase().includes(searchTerm.toLowerCase()))

    // Apply filter
    if (filterBy === "available") {
      filtered = filtered.filter((group) => group.availableSlots > 0)
    } else if (filterBy === "monthly") {
      filtered = filtered.filter((group) => group.billingCycle === "monthly")
    } else if (filterBy === "yearly") {
      filtered = filtered.filter((group) => group.billingCycle === "yearly")
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.pricePerSlot - b.pricePerSlot
        case "slots":
          return b.availableSlots - a.availableSlots
        case "name":
          return a.subscriptionName.localeCompare(b.subscriptionName)
        default:
          return 0
      }
    })

    setFilteredGroups(filtered)
  }

  const handleJoinRequest = async (groupId: number) => {
    try {
      const response = await fetch("/api/groups/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ groupId }),
      })

      if (response.ok) {
        // Update the group to show request sent
        setGroups(groups.map((group) => (group.id === groupId ? { ...group, hasRequested: true } : group)))
      }
    } catch (error) {
      console.error("Failed to send join request:", error)
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
          <div className="flex items-center gap-4">
            <Link href="/dashboard/groups">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Browse Groups</h1>
              <p className="text-gray-600">Find and join subscription sharing groups</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search subscriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price (Low to High)</SelectItem>
                <SelectItem value="slots">Available Slots</SelectItem>
                <SelectItem value="name">Service Name</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                <SelectItem value="available">Available Only</SelectItem>
                <SelectItem value="monthly">Monthly Billing</SelectItem>
                <SelectItem value="yearly">Yearly Billing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results */}
          <div className="text-sm text-gray-600">
            Showing {filteredGroups.length} of {groups.length} groups
          </div>

          {/* Groups Grid */}
          {filteredGroups.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
                <p className="text-gray-600 text-center">
                  {searchTerm ? "Try adjusting your search or filters." : "No groups are available to join right now."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{group.subscriptionName}</CardTitle>
                        <CardDescription>Owned by {group.ownerName}</CardDescription>
                      </div>
                      <Badge variant={group.availableSlots > 0 ? "default" : "secondary"}>
                        {group.availableSlots > 0 ? "Available" : "Full"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Price per slot</span>
                        </div>
                        <span className="font-semibold text-lg">₹{group.pricePerSlot}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Available slots</span>
                        </div>
                        <span className="font-semibold">
                          {group.availableSlots}/{group.totalSlots}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Next billing</span>
                        </div>
                        <span className="text-sm">{group.nextBilling}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Billing cycle</span>
                        </div>
                        <Badge variant="outline">{group.billingCycle}</Badge>
                      </div>

                      {group.hasRequested ? (
                        <Button disabled className="w-full">
                          Request Sent
                        </Button>
                      ) : group.availableSlots > 0 ? (
                        <Button onClick={() => handleJoinRequest(group.id)} className="w-full">
                          Request to Join
                        </Button>
                      ) : (
                        <Button disabled className="w-full">
                          Group Full
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
