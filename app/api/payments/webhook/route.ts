import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Mock database - in production, use PostgreSQL
const payments: any[] = []
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

const groupMembers: any[] = []
const shareGroups: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-razorpay-signature")

    if (!signature) {
      return NextResponse.json({ message: "Missing signature" }, { status: 400 })
    }

    // Verify webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "test_webhook_secret"
    const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(body).digest("hex")

    if (signature !== expectedSignature) {
      console.error("Invalid webhook signature")
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)

    // Handle payment.captured event
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity
      const orderId = payment.order_id
      const paymentId = payment.id
      const amount = payment.amount / 100 // Convert from paise to rupees

      // Extract user and group info from order notes (in production)
      // For now, using mock data
      const userId = 1
      const groupId = 3
      const pendingPaymentId = 1

      // Create payment record
      const newPayment = {
        id: payments.length + 1,
        userId: userId,
        groupId: groupId,
        groupName: "Adobe Creative Cloud", // From pending payment
        amount: amount,
        status: "completed",
        paymentDate: new Date().toISOString(),
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
        nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // Next month
      }

      payments.push(newPayment)

      // Remove from pending payments
      const pendingIndex = pendingPayments.findIndex((p) => p.id === pendingPaymentId)
      if (pendingIndex !== -1) {
        pendingPayments.splice(pendingIndex, 1)
      }

      // Update group member status to active
      const memberIndex = groupMembers.findIndex((member) => member.userId === userId && member.groupId === groupId)
      if (memberIndex !== -1) {
        groupMembers[memberIndex].status = "active"
      }

      // Decrease available slots in group
      const groupIndex = shareGroups.findIndex((group) => group.id === groupId)
      if (groupIndex !== -1 && shareGroups[groupIndex].availableSlots > 0) {
        shareGroups[groupIndex].availableSlots -= 1
      }

      console.log("Payment processed successfully:", newPayment)
    }

    return NextResponse.json({ status: "ok" }, { status: 200 })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json({ message: "Webhook processing failed" }, { status: 500 })
  }
}
