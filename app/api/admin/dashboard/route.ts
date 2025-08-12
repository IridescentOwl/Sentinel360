import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock admin data - in production, use PostgreSQL with proper admin role checking
const adminStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalGroups: 156,
  activeGroups: 134,
  totalRevenue: 125000,
  monthlyRevenue: 18500,
  pendingVerifications: 23,
  reportedIssues: 7,
}

const recentActivity = [
  {
    id: 1,
    type: "user_registered",
    description: "New user registered: john.doe@thapar.edu",
    timestamp: "2 minutes ago",
    status: "success",
  },
  {
    id: 2,
    type: "payment_completed",
    description: "Payment completed for Netflix Premium group",
    timestamp: "15 minutes ago",
    status: "success",
  },
  {
    id: 3,
    type: "group_created",
    description: "New sharing group created: Adobe Creative Cloud",
    timestamp: "1 hour ago",
    status: "success",
  },
  {
    id: 4,
    type: "issue_reported",
    description: "User reported payment issue in Spotify group",
    timestamp: "2 hours ago",
    status: "warning",
  },
  {
    id: 5,
    type: "user_registered",
    description: "New user registered: jane.smith@thapar.edu",
    timestamp: "3 hours ago",
    status: "success",
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
    // In production, check if user has admin role
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

  // In production, verify admin role
  // if (user.role !== 'admin') {
  //   return NextResponse.json({ message: "Forbidden" }, { status: 403 })
  // }

  return NextResponse.json({
    stats: adminStats,
    recentActivity,
  })
}
