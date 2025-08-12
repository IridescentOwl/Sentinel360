import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock database - in production, use PostgreSQL
const subscriptions: any[] = [
  {
    id: 1,
    ownerId: 1,
    serviceName: "Netflix Premium",
    totalCost: 649,
    billingCycle: "monthly",
    nextBilling: "2024-12-15",
    isShared: true,
    groupMembers: 4,
    createdAt: "2024-11-01T00:00:00Z",
  },
  {
    id: 2,
    ownerId: 1,
    serviceName: "Spotify Family",
    totalCost: 179,
    billingCycle: "monthly",
    nextBilling: "2024-12-20",
    isShared: false,
    createdAt: "2024-11-05T00:00:00Z",
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

  const userSubscriptions = subscriptions.filter((sub) => sub.ownerId === user.userId)

  return NextResponse.json({
    subscriptions: userSubscriptions,
  })
}

export async function POST(request: NextRequest) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { serviceName, totalCost, billingCycle, nextBilling } = await request.json()

    if (!serviceName || !totalCost || !billingCycle || !nextBilling) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    const newSubscription = {
      id: subscriptions.length + 1,
      ownerId: user.userId,
      serviceName,
      totalCost,
      billingCycle,
      nextBilling,
      isShared: false,
      createdAt: new Date().toISOString(),
    }

    subscriptions.push(newSubscription)

    return NextResponse.json(
      {
        message: "Subscription created successfully",
        subscription: newSubscription,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create subscription error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
