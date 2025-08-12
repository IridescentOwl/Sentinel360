import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock database - in production, use PostgreSQL
const groupMembers: any[] = [
  {
    id: 1,
    groupId: 1,
    userId: 2,
    userName: "Jane Smith",
    userEmail: "jane.smith@thapar.edu",
    status: "pending",
    createdAt: "2024-11-10T00:00:00Z",
  },
]

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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const requestId = Number.parseInt(params.id)
    const { action } = await request.json()

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 })
    }

    const memberRequestIndex = groupMembers.findIndex((member) => member.id === requestId)
    if (memberRequestIndex === -1) {
      return NextResponse.json({ message: "Request not found" }, { status: 404 })
    }

    const memberRequest = groupMembers[memberRequestIndex]

    // Check if the current user owns the group
    const group = shareGroups.find((g) => g.id === memberRequest.groupId)
    if (!group || group.ownerId !== user.userId) {
      return NextResponse.json({ message: "You don't have permission to manage this request" }, { status: 403 })
    }

    if (action === "approve") {
      // Check if group has available slots
      if (group.availableSlots <= 0) {
        return NextResponse.json({ message: "Group is full" }, { status: 400 })
      }

      // Update member status to active
      groupMembers[memberRequestIndex].status = "active"

      // Decrease available slots
      group.availableSlots -= 1
    } else {
      // Reject the request
      groupMembers[memberRequestIndex].status = "rejected"
    }

    return NextResponse.json({
      message: `Request ${action}d successfully`,
      member: groupMembers[memberRequestIndex],
    })
  } catch (error) {
    console.error("Handle request error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
