"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, AlertCircle, Users, DollarSign } from "lucide-react"
import Link from "next/link"

interface Subscription {
  id: number
  serviceName: string
  totalCost: number
  billingCycle: "monthly" | "yearly"
}

export default function CreateGroupPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)
  const [formData, setFormData] = useState({
    subscriptionId: "",
    totalSlots: "4",
    pricePerSlot: "",
  })
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedId = searchParams.get("subscription")

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  useEffect(() => {
    if (preselectedId && subscriptions.length > 0) {
      const subscription = subscriptions.find((sub) => sub.id === Number.parseInt(preselectedId))
      if (subscription) {
        handleSubscriptionSelect(subscription.id.toString())
      }
    }
  }, [preselectedId, subscriptions])

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("/api/subscriptions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        // Filter out subscriptions that are already being shared
        const availableSubscriptions = data.subscriptions.filter((sub: any) => !sub.isShared)
        setSubscriptions(availableSubscriptions)
      }
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscriptionSelect = (subscriptionId: string) => {
    const subscription = subscriptions.find((sub) => sub.id === Number.parseInt(subscriptionId))
    if (subscription) {
      setSelectedSubscription(subscription)
      const suggestedPrice = Math.ceil(subscription.totalCost / Number.parseInt(formData.totalSlots))
      setFormData((prev) => ({
        ...prev,
        subscriptionId,
        pricePerSlot: suggestedPrice.toString(),
      }))
    }
  }

  const handleSlotsChange = (slots: string) => {
    setFormData((prev) => ({ ...prev, totalSlots: slots }))
    if (selectedSubscription && slots) {
      const suggestedPrice = Math.ceil(selectedSubscription.totalCost / Number.parseInt(slots))
      setFormData((prev) => ({ ...prev, pricePerSlot: suggestedPrice.toString() }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setCreating(true)

    if (!formData.subscriptionId || !formData.totalSlots || !formData.pricePerSlot) {
      setError("Please fill in all required fields")
      setCreating(false)
      return
    }

    const totalSlots = Number.parseInt(formData.totalSlots)
    const pricePerSlot = Number.parseFloat(formData.pricePerSlot)

    if (totalSlots < 2 || totalSlots > 10) {
      setError("Total slots must be between 2 and 10")
      setCreating(false)
      return
    }

    if (pricePerSlot <= 0) {
      setError("Price per slot must be greater than 0")
      setCreating(false)
      return
    }

    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          subscriptionId: Number.parseInt(formData.subscriptionId),
          totalSlots,
          pricePerSlot,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to create group")
      }

      router.push("/dashboard/groups")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create group")
    } finally {
      setCreating(false)
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
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard/groups">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Sharing Group</h1>
              <p className="text-gray-600">Share your subscription with other students</p>
            </div>
          </div>

          {subscriptions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No subscriptions available</h3>
                <p className="text-gray-600 text-center mb-6">
                  You need to add subscriptions before creating sharing groups.
                </p>
                <Link href="/dashboard/subscriptions/new">
                  <Button>Add Subscription</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Group Details</CardTitle>
                <CardDescription>Configure your sharing group settings</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="subscription">Select Subscription *</Label>
                    <Select value={formData.subscriptionId} onValueChange={handleSubscriptionSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a subscription to share" />
                      </SelectTrigger>
                      <SelectContent>
                        {subscriptions.map((subscription) => (
                          <SelectItem key={subscription.id} value={subscription.id.toString()}>
                            {subscription.serviceName} - ₹{subscription.totalCost}/{subscription.billingCycle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedSubscription && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Selected Subscription</h4>
                      <div className="text-sm text-blue-800">
                        <p>
                          <strong>{selectedSubscription.serviceName}</strong>
                        </p>
                        <p>
                          Total Cost: ₹{selectedSubscription.totalCost} per {selectedSubscription.billingCycle}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="totalSlots">Total Slots (including you) *</Label>
                      <Select value={formData.totalSlots} onValueChange={handleSlotsChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} people
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">How many people will share this subscription?</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pricePerSlot">Price per Slot (₹) *</Label>
                      <Input
                        id="pricePerSlot"
                        type="number"
                        placeholder="0"
                        value={formData.pricePerSlot}
                        onChange={(e) => setFormData((prev) => ({ ...prev, pricePerSlot: e.target.value }))}
                        required
                      />
                      <p className="text-xs text-gray-500">How much each member will pay</p>
                    </div>
                  </div>

                  {selectedSubscription && formData.totalSlots && formData.pricePerSlot && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Cost Breakdown
                      </h4>
                      <div className="text-sm text-green-800 space-y-1">
                        <p>
                          Total subscription cost: ₹{selectedSubscription.totalCost} per{" "}
                          {selectedSubscription.billingCycle}
                        </p>
                        <p>
                          Each member pays: ₹{formData.pricePerSlot} per {selectedSubscription.billingCycle}
                        </p>
                        <p>
                          Total collected: ₹
                          {Number.parseFloat(formData.pricePerSlot) * Number.parseInt(formData.totalSlots)} per{" "}
                          {selectedSubscription.billingCycle}
                        </p>
                        <p className="font-medium">
                          Your profit: ₹
                          {Number.parseFloat(formData.pricePerSlot) * Number.parseInt(formData.totalSlots) -
                            selectedSubscription.totalCost}{" "}
                          per {selectedSubscription.billingCycle}
                        </p>
                      </div>
                    </div>
                  )}

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Link href="/dashboard/groups" className="flex-1">
                      <Button type="button" variant="outline" className="w-full bg-transparent">
                        Cancel
                      </Button>
                    </Link>
                    <Button type="submit" className="flex-1" disabled={creating}>
                      {creating ? "Creating..." : "Create Group"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
