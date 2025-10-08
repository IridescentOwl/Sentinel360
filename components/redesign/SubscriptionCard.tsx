import { Card } from "@/components/ui/card"

interface SubscriptionCardProps {
  name: string
  members: number
  totalSlots: number
  price: number
}

export default function SubscriptionCard({ name, members, totalSlots, price }: SubscriptionCardProps) {
  return (
    <Card className="bg-[#1A1C2A] p-4 rounded-lg text-white">
      <div className="w-full h-32 bg-[#2A2D3A] rounded-md mb-4 flex items-center justify-center">
        {/* Placeholder for image */}
        <IconPlaceholder />
      </div>
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-400">{`${members}/${totalSlots} members, $${price}/month`}</p>
    </Card>
  )
}

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