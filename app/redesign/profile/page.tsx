import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Home, Package, Users, Bell, Settings, User, CreditCard, Shield } from "lucide-react"

export default function ProfileSettingsPage() {
  return (
    <div className="flex min-h-screen bg-[#0D0F1E] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1C2A] p-6 flex flex-col">
        <div className="text-2xl font-bold mb-12">Sentinel 360</div>
        <nav className="flex flex-col gap-4">
          <a href="/redesign/dashboard" className="flex items-center gap-3 p-2 text-gray-400 hover:bg-[#2A2D3A] rounded-lg">
            <Home size={20} />
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-2 text-gray-400 hover:bg-[#2A2D3A] rounded-lg">
            <Package size={20} />
            <span>My Subscriptions</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-2 text-gray-400 hover:bg-[#2A2D3A] rounded-lg">
            <Users size={20} />
            <span>Groups</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-2 text-gray-400 hover:bg-[#2A2D3A] rounded-lg">
            <User size={20} />
            <span>Invite Friends</span>
          </a>
          <a href="/redesign/profile" className="flex items-center gap-3 p-2 bg-[#4A4AFF] rounded-lg">
            <Settings size={20} />
            <span>Profile & Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Profile & Settings</h1>

        <div className="space-y-8">
          {/* Personal Information */}
          <Card className="bg-[#1A1C2A] p-6">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input placeholder="Your Name" className="bg-[#2A2D3A] border-none" />
              <Input type="email" placeholder="your.email@example.com" className="bg-[#2A2D3A] border-none" />
              <Input type="tel" placeholder="Phone Number (+1 (555) 123-4567)" className="bg-[#2A2D3A] border-none" />
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
      </main>
    </div>
  )
}