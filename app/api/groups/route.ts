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
    nextBilling: "2024-12-15",
    billingCycle: "monthly",
    createdAt: "2024-11-01T00:00:00Z",
  },
]

const groupMembers: any[] = [
  {
    id: 1,
    groupId: 1,
    userId: 2,
    userName: "Jane Smith",
    userEmail: "jane.smith@thapar.edu",
    status: "active",
    createdAt: "2024-11-05T00:00:00Z",
  },
  {
    id: 2,
    groupId: 1,
    userId: 3,
    userName: "Bob Johnson",
    userEmail: "bob.johnson@thapar.edu",
    status: "pending",
    createdAt: "2024-11-10T00:00:00Z",
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

  // Get groups owned by user
  const ownedGroups = shareGroups
    .filter((group) => group.ownerId === user.userId)
    .map((group) => ({
      ...group,
      isOwner: true,
      status: group.availableSlots > 0 ? "active" : "full",
      members: group.totalSlots - group.availableSlots,
    }))

  // Get groups user has joined
  const userMemberships = groupMembers.filter((member) => member.userId === user.userId && member.status === "active")
  const joinedGroups = userMemberships.map((membership) => {
    const group = shareGroups.find((g) => g.id === membership.groupId)
    return {
      ...group,
      isOwner: false,
      status: "active",
      members: group.totalSlots - group.availableSlots,
    }
  })

  // Get pending requests for user's groups
  const pendingRequests = groupMembers
    .filter((member) => {
      const group = shareGroups.find((g) => g.id === member.groupId)
      return group?.ownerId === user.userId && member.status === "pending"
    })
    .map((member) => {
      const group = shareGroups.find((g) => g.id === member.groupId)
      return {
        id: member.id,
        groupId: member.groupId,
        groupName: group?.subscriptionName,
        userName: member.userName,
        userEmail: member.userEmail,
        requestDate: new Date(member.createdAt).toLocaleDateString(),
        status: member.status,
      }
    })

  return NextResponse.json({
    ownedGroups,
    joinedGroups,
    pendingRequests,
  })
}

export async function POST(request: NextRequest) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { subscriptionId, totalSlots, pricePerSlot } = await request.json()

    if (!subscriptionId || !totalSlots || !pricePerSlot) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Check if subscription exists and is owned by user
    // In production, fetch from subscriptions table
    const subscription = {
      id: subscriptionId,
      serviceName: "Netflix Premium", // Mock data
      ownerId: user.userId,
    }

    if (!subscription || subscription.ownerId !== user.userId) {
      return NextResponse.json({ message: "Subscription not found or not owned by you" }, { status: 404 })
    }

    const newGroup = {
      id: shareGroups.length + 1,
      subscriptionId,
      subscriptionName: subscription.serviceName,
      ownerId: user.userId,
      ownerName: user.name,
      totalSlots,
      availableSlots: totalSlots - 1, // Owner takes one slot
      pricePerSlot,
      nextBilling: "2024-12-15", // Mock data
      billingCycle: "monthly", // Mock data
      createdAt: new Date().toISOString(),
    }

    shareGroups.push(newGroup)

    return NextResponse.json(
      {
        message: "Group created successfully",
        group: newGroup,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create group error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
