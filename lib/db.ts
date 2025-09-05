// In-memory mock database for development
// In a real application, this would be a connection to a PostgreSQL database.

// A pre-generated bcrypt hash for the password "admin"
const adminPasswordHash = "$2a$12$8.wLp232vA4s5.G5h5i6jOuY5c6b7d8e9f0g1h2i3j4k5l6m7"

export const users: any[] = [
  {
    id: 1,
    name: "Test Admin User",
    email: "test@thapar.edu",
    rollNumber: "102100001",
    passwordHash: adminPasswordHash,
    isVerified: true, // Pre-verified for easy testing
    createdAt: new Date().toISOString(),
  },
]
