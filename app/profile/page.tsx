"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { CreditCard } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function ProfileSettingsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Profile & Settings</h1>

      <div className="space-y-8">
        {/* Personal Information */}
        <Card className="bg-[#1A1C2A] p-6">
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input placeholder="Your Name" className="bg-[#2A2D3A] border-none text-white" />
            <Input type="email" placeholder="your.email@example.com" className="bg-[#2A2D3A] border-none text-white" />
            <Input type="tel" placeholder="Phone Number (+1 (555) 123-4567)" className="bg-[#2A2D3A] border-none text-white" />
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="bg-[#1A1C2A] p-6">
          <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#2A2D3A] p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <CreditCard />
                <div>
                  <p>Visa ending in 4242</p>
                  <p className="text-sm text-gray-400">Expires 08/25</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
            <Button variant="outline" className="text-white border-white">Add Payment Method</Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="bg-[#1A1C2A] p-6">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label htmlFor="sub-reminders">Subscription Reminders</label>
              <Switch id="sub-reminders" defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="group-updates">Group Updates</label>
              <Switch id="group-updates" defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="promo-offers">Promotional Offers</label>
              <Switch id="promo-offers" />
            </div>
          </div>
        </Card>

        {/* Privacy */}
        <Card className="bg-[#1A1C2A] p-6">
          <h2 className="text-xl font-bold mb-4">Privacy</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label htmlFor="share-profile">Share Profile Information</label>
              <Switch id="share-profile" defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="activity-tracking">Activity Tracking</label>
              <Switch id="activity-tracking" />
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <Button className="bg-[#4A4AFF] hover:bg-[#4A4AFF]/90">Save Changes</Button>
      </div>
    </DashboardLayout>
  )
}