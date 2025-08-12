"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"

const popularServices = [
  { name: "Netflix", defaultCost: 649, cycle: "monthly" },
  { name: "Amazon Prime", defaultCost: 1499, cycle: "yearly" },
  { name: "Spotify", defaultCost: 119, cycle: "monthly" },
  { name: "YouTube Premium", defaultCost: 129, cycle: "monthly" },
  { name: "Disney+ Hotstar", defaultCost: 1499, cycle: "yearly" },
  { name: "Adobe Creative Cloud", defaultCost: 1675, cycle: "monthly" },
  { name: "Microsoft 365", defaultCost: 4199, cycle: "yearly" },
  { name: "Canva Pro", defaultCost: 3999, cycle: "yearly" },
]

export default function NewSubscriptionPage() {
  const [formData, setFormData] = useState({
    serviceName: "",
    totalCost: "",
    billingCycle: "monthly" as "monthly" | "yearly",
    nextBilling: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleServiceSelect = (serviceName: string) => {
    const service = popularServices.find((s) => s.name === serviceName)
    if (service) {
      setFormData((prev) => ({
        ...prev,
        serviceName,
        totalCost: service.defaultCost.toString(),
        billingCycle: service.cycle as "monthly" | "yearly",
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        serviceName,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!formData.serviceName || !formData.totalCost || !formData.nextBilling) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          serviceName: formData.serviceName,
          totalCost: Number.parseFloat(formData.totalCost),
          billingCycle: formData.billingCycle,
          nextBilling: formData.nextBilling,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to create subscription")
      }

      router.push("/dashboard/subscriptions")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create subscription")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard/subscriptions">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Subscription</h1>
              <p className="text-gray-600">Add a subscription you want to manage or share</p>
            </div>
          </div>

          {/* Popular Services */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Services</CardTitle>
              <CardDescription>Quick add from popular subscription services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {popularServices.map((service) => (
                  <Button
                    key={service.name}
                    variant="outline"
                    className="h-auto p-3 flex flex-col items-center gap-1 bg-transparent"
                    onClick={() => handleServiceSelect(service.name)}
                  >
                    <span className="font-medium text-sm">{service.name}</span>
                    <span className="text-xs text-gray-500">₹{service.defaultCost}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>Enter the details of your subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceName">Service Name *</Label>
                  <Input
                    id="serviceName"
                    placeholder="e.g., Netflix, Spotify, Adobe Creative Cloud"
                    value={formData.serviceName}
                    onChange={(e) => handleChange("serviceName", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalCost">Total Cost (₹) *</Label>
                    <Input
                      id="totalCost"
                      type="number"
                      placeholder="649"
                      value={formData.totalCost}
                      onChange={(e) => handleChange("totalCost", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingCycle">Billing Cycle *</Label>
                    <Select
                      value={formData.billingCycle}
                      onValueChange={(value) => handleChange("billingCycle", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nextBilling">Next Billing Date *</Label>
                  <Input
                    id="nextBilling"
                    type="date"
                    value={formData.nextBilling}
                    onChange={(e) => handleChange("nextBilling", e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-3 pt-4">
                  <Link href="/dashboard/subscriptions" className="flex-1">
                    <Button type="button" variant="outline" className="w-full bg-transparent">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? "Adding..." : "Add Subscription"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
