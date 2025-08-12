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
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@thapar.edu",
    rollNumber: "101903003",
    isVerified: true,
    status: "suspended",
    joinDate: "2024-09-10",
    lastActive: "1 week ago",
    groupsCount: 0,
    paymentsCount: 5,
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice.brown@thapar.edu",
    rollNumber: "101903004",
    isVerified: true,
    status: "active",
    joinDate: "2024-11-01",
    lastActive: "30 minutes ago",
    groupsCount: 2,
    paymentsCount: 4,
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

export async function GET(request: NextRequest) {
  const user = verifyAdminToken(request)
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({
    users,
  })
}
