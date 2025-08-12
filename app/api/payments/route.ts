import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock database - in production, use PostgreSQL
const payments: any[] = [
  {
    id: 1,
    userId: 1,
    groupId: 1,
    groupName: "Netflix Premium",
    amount: 199,
    status: "completed",
    paymentDate: "2024-11-15T10:30:00Z",
    razorpayOrderId: "order_test123",
    razorpayPaymentId: "pay_test456",
    nextDueDate: "2024-12-15",
  },
  {
    id: 2,
    userId: 1,
    groupId: 2,
    groupName: "Spotify Family",
    amount: 30,
    status: "completed",
    paymentDate: "2024-11-10T14:20:00Z",
    razorpayOrderId: "order_test789",
    razorpayPaymentId: "pay_test101",
    nextDueDate: "2024-12-10",
  },
]

const pendingPayments: any[] = [
  {
    id: 1,
    userId: 1,
    groupId: 3,
    groupName: "Adobe Creative Cloud",
    amount: 600,
    dueDate: "2024-12-20",
    status: "approved",
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

  // Get user's payments
  const userPayments = payments
    .filter((payment) => payment.userId === user.userId)
    .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())

  // Get user's pending payments
  const userPendingPayments = pendingPayments
    .filter((payment) => payment.userId === user.userId)
    .map((payment) => ({
      ...payment,
      dueDate: new Date(payment.dueDate).toLocaleDateString(),
    }))

  return NextResponse.json({
    payments: userPayments,
    pendingPayments: userPendingPayments,
  })
}
