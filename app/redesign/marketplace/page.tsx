import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SubscriptionCard from "@/components/redesign/SubscriptionCard"
import { Bell, Search } from "lucide-react"

const subscriptions = [
  { name: "StreamVerse Premium", members: 4, totalSlots: 5, price: 5 },
  { name: "Creative Suite Pro", members: 2, totalSlots: 3, price: 15 },
  { name: "GameHub Elite", members: 1, totalSlots: 4, price: 10 },
  { name: "EduLearn Plus", members: 3, totalSlots: 4, price: 8 },
  { name: "FitLife Premium", members: 2, totalSlots: 3, price: 12 },
  { name: "MusicStream Pro", members: 3, totalSlots: 5, price: 7 },
  { name: "SecureNet Pro", members: 1, totalSlots: 2, price: 20 },
  { name: "CloudDrive Pro", members: 2, totalSlots: 3, price: 10 },
]

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-[#0D0F1E] text-white">
      <header className="flex justify-between items-center p-6 border-b border-gray-800">
        <div className="flex items-center gap-8">
          <div className="text-2xl font-bold">Sentinel 360</div>
          <nav className="hidden md:flex gap-6">
            <a href="/redesign" className="text-gray-400 hover:text-white">Home</a>
            <a href="#" className="text-gray-400 hover:text-white">My Shares</a>
            <a href="/redesign/marketplace" className="text-white">Marketplace</a>
            <a href="#" className="text-gray-400 hover:text-white">Help</a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search groups..."
              className="bg-[#1A1C2A] border-none pl-10 w-64"
            />
          </div>
          <Button variant="ghost" size="icon">
            <Bell size={20} />
          </Button>
          <div className="w-10 h-10 rounded-full bg-gray-600"></div>
        </div>
      </header>

      <main className="p-8">
        <h1 className="text-4xl font-bold mb-2">Marketplace</h1>
        <p className="text-lg text-gray-400 mb-8">
          Explore available subscription groups and find the perfect fit for your needs.
        </p>

        <div className="flex gap-4 mb-8">
          <Button className="bg-[#4A4AFF] hover:bg-[#4A4AFF]/90">All Categories</Button>
          <Button variant="outline" className="text-white border-white">Streaming</Button>
          <Button variant="outline" className="text-white border-white">Software</Button>
          <Button variant="outline" className="text-white border-white">Gaming</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subscriptions.map((sub, index) => (
            <SubscriptionCard
              key={index}
              name={sub.name}
              members={sub.members}
              totalSlots={sub.totalSlots}
              price={sub.price}
            />
          ))}
        </div>
      </main>
    </div>
  )
}