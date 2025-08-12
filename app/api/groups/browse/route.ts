import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock database - in production, use PostgreSQL
const shareGroups: any[] = [
  {
    id: 1,
    subscriptionId: 1,
    subscriptionName: "Netflix Premium",
    ownerId: 1,
    ownerName: "John Doe",
    totalSlots: 4,
    availableSlots: 2,
    pricePerSlot: 199,
    nextBilling: "Dec 15, 2024",
    billingCycle: "monthly",
    createdAt: "2024-11-01T00:00:00Z",
  },
  {
    id: 2,
    subscriptionId: 2,
    subscriptionName: "Spotify Family",
    ownerId: 2,
    ownerName: "Alice Brown",
    totalSlots: 6,
    availableSlots: 3,
    pricePerSlot: 30,
    nextBilling: "Dec 20, 2024",
    billingCycle: "monthly",
    createdAt: "2024-11-05T00:00:00Z",
  },
  {
    id: 3,
    subscriptionId: 3,
    subscriptionName: "Adobe Creative Cloud",
    ownerId: 3,
    ownerName: "Mike Wilson",
    totalSlots: 3,
    availableSlots: 1,
    pricePerSlot: 600,
    nextBilling: "Jan 10, 2025",
    billingCycle: "monthly",
    createdAt: "2024-11-10T00:00:00Z",
  },
]

const groupMembers: any[] = [
  {
    id: 1,
    groupId: 1,
    userId: 2,
    status: "pending",
  },
]

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  // Filter out groups owned by the current user
  const availableGroups = shareGroups
    .filter((group) => group.ownerId !== user.userId)
    .map((group) => {
      // Check if user has already requested to join this group
      const hasRequested = groupMembers.some((member) => member.groupId === group.id && member.userId === user.userId)

      return {
        ...group,
        hasRequested,
      }
    })

  return NextResponse.json({
    groups: availableGroups,
  })
}
