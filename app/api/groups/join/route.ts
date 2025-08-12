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

export async function POST(request: NextRequest) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { groupId } = await request.json()

    if (!groupId) {
      return NextResponse.json({ message: "Group ID is required" }, { status: 400 })
    }

    // Check if user has already requested to join this group
    const existingRequest = groupMembers.find((member) => member.groupId === groupId && member.userId === user.userId)

    if (existingRequest) {
      return NextResponse.json({ message: "You have already requested to join this group" }, { status: 400 })
    }

    const newRequest = {
      id: groupMembers.length + 1,
      groupId,
      userId: user.userId,
      userName: user.name,
      userEmail: user.email,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    groupMembers.push(newRequest)

    return NextResponse.json(
      {
        message: "Join request sent successfully",
        request: newRequest,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Join request error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
