import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock users data - in production, use PostgreSQL
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@thapar.edu",
    rollNumber: "101903001",
    isVerified: true,
    status: "active",
    joinDate: "2024-10-15",
    lastActive: "2 hours ago",
    groupsCount: 3,
    paymentsCount: 8,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@thapar.edu",
    rollNumber: "101903002",
    isVerified: false,
    status: "pending",
    joinDate: "2024-11-20",
    lastActive: "1 day ago",
    groupsCount: 1,
    paymentsCount: 2,
  },
]

function verifyAdminToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    return decoded
  } catch (error) {
    return null
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = verifyAdminToken(request)
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const userId = Number.parseInt(params.id)
    const { action } = await request.json()

    const userIndex = users.findIndex((user) => user.id === userId)
    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    switch (action) {
      case "verify":
        users[userIndex].isVerified = true
        users[userIndex].status = "active"
        break
      case "suspend":
        users[userIndex].status = "suspended"
        break
      case "activate":
        users[userIndex].status = "active"
        break
      default:
        return NextResponse.json({ message: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({
      message: `User ${action}d successfully`,
      user: users[userIndex],
    })
  } catch (error) {
    console.error("Admin user action error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
