"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react"

interface PaymentButtonProps {
  groupId: number
  groupName: string
  amount: number
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function PaymentButton({ groupId, groupName, amount, onSuccess, onError }: PaymentButtonProps) {
  const [processing, setProcessing] = useState(false)

  const handlePayment = async () => {
    setProcessing(true)

    try {
      // Create Razorpay order
      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ groupId }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create payment order")
      }

      const orderData = await orderResponse.json()

      // Initialize Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "Sentinel 360",
        description: `Payment for ${groupName}`,
        order_id: orderData.orderId,
        handler: (response: any) => {
          console.log("Payment successful:", response)
          onSuccess?.()
        },
        prefill: {
          name: orderData.userName,
          email: orderData.userEmail,
        },
        theme: {
          color: "#4F46E5",
        },
        modal: {
          ondismiss: () => {
            setProcessing(false)
          },
        },
      }

      // @ts-ignore - Razorpay is loaded via script
      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", (response: any) => {
        console.error("Payment failed:", response.error)
        onError?.(response.error.description || "Payment failed")
      })
      rzp.open()
    } catch (error) {
      console.error("Payment initiation failed:", error)
      onError?.(error instanceof Error ? error.message : "Payment initiation failed")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <Button onClick={handlePayment} disabled={processing} className="bg-green-600 hover:bg-green-700">
      <CreditCard className="h-4 w-4 mr-2" />
      {processing ? "Processing..." : `Pay ₹${amount}`}
    </Button>
  )
}
