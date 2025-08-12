import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import crypto from "crypto"

// Mock database - in production, use PostgreSQL
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

export async function POST(request: NextRequest) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { pendingPaymentId } = await request.json()

    if (!pendingPaymentId) {
      return NextResponse.json({ message: "Pending payment ID is required" }, { status: 400 })
    }

    // Find the pending payment
    const pendingPayment = pendingPayments.find(
      (payment) => payment.id === pendingPaymentId && payment.userId === user.userId,
    )

    if (!pendingPayment) {
      return NextResponse.json({ message: "Pending payment not found" }, { status: 404 })
    }

    // In production, create actual Razorpay order
    const razorpayOrderId = `order_${crypto.randomBytes(10).toString("hex")}`
    const amount = pendingPayment.amount * 100 // Convert to paise

    // Mock Razorpay order creation
    const orderData = {
      orderId: razorpayOrderId,
      amount: amount,
      currency: "INR",
      groupName: pendingPayment.groupName,
      userName: user.name,
      userEmail: user.email,
    }

    // In production, you would call Razorpay API:
    /*
    const Razorpay = require('razorpay');
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount,
      currency: 'INR',
      receipt: `receipt_${pendingPaymentId}`,
      notes: {
        userId: user.userId,
        groupId: pendingPayment.groupId,
        pendingPaymentId: pendingPaymentId,
      },
    });
    */

    return NextResponse.json(orderData, { status: 200 })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ message: "Failed to create payment order" }, { status: 500 })
  }
}
