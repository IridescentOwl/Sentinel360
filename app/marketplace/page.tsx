"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

function IconPlaceholder() {
  return (
    <svg
      className="w-10 h-10 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-4 10V7m-6 10V7m-6 10V7M3 7l9-4 9 4M3 7h18"
      />
    </svg>
  )
}

function SubscriptionCard({ name, members, totalSlots, price }: { name: string, members: number, totalSlots: number, price: number }) {
  return (
    <Card className="bg-[#1A1C2A] p-4 rounded-lg text-white">
      <div className="w-full h-32 bg-[#2A2D3A] rounded-md mb-4 flex items-center justify-center">
        <IconPlaceholder />
      </div>
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-400">{`${members}/${totalSlots} members, $${price}/month`}</p>
    </Card>
  )
}

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
    <DashboardLayout>
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
    </DashboardLayout>
  )
}