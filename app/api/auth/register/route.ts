import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Mock database - in production, use PostgreSQL
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { name, email, rollNumber, password } = await request.json()

    // Validate required fields
    if (!name || !email || !rollNumber || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Validate @thapar.edu email
    if (!email.endsWith("@thapar.edu")) {
      return NextResponse.json({ message: "Please use your official @thapar.edu email address" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      rollNumber,
      passwordHash,
      isVerified: false,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    // Generate verification token
    const verificationToken = jwt.sign({ userId: newUser.id, email }, process.env.JWT_SECRET || "fallback-secret", {
      expiresIn: "24h",
    })

    // In production, send email with verification link
    console.log(`Verification link: ${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`)

    return NextResponse.json(
      {
        message: "Registration successful. Please check your email for verification link.",
        userId: newUser.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
