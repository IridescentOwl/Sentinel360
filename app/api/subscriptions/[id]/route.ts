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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const subscriptionId = Number.parseInt(params.id)
  const subscription = subscriptions.find((sub) => sub.id === subscriptionId && sub.ownerId === user.userId)

  if (!subscription) {
    return NextResponse.json({ message: "Subscription not found" }, { status: 404 })
  }

  return NextResponse.json({ subscription })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const subscriptionId = Number.parseInt(params.id)
    const subscriptionIndex = subscriptions.findIndex((sub) => sub.id === subscriptionId && sub.ownerId === user.userId)

    if (subscriptionIndex === -1) {
      return NextResponse.json({ message: "Subscription not found" }, { status: 404 })
    }

    const { serviceName, totalCost, billingCycle, nextBilling } = await request.json()

    if (!serviceName || !totalCost || !billingCycle || !nextBilling) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    subscriptions[subscriptionIndex] = {
      ...subscriptions[subscriptionIndex],
      serviceName,
      totalCost,
      billingCycle,
      nextBilling,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      message: "Subscription updated successfully",
      subscription: subscriptions[subscriptionIndex],
    })
  } catch (error) {
    console.error("Update subscription error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const subscriptionId = Number.parseInt(params.id)
  const subscriptionIndex = subscriptions.findIndex((sub) => sub.id === subscriptionId && sub.ownerId === user.userId)

  if (subscriptionIndex === -1) {
    return NextResponse.json({ message: "Subscription not found" }, { status: 404 })
  }

  // Check if subscription is being shared
  if (subscriptions[subscriptionIndex].isShared) {
    return NextResponse.json(
      { message: "Cannot delete a subscription that is being shared. Remove all members first." },
      { status: 400 },
    )
  }

  subscriptions.splice(subscriptionIndex, 1)

  return NextResponse.json({ message: "Subscription deleted successfully" })
}
