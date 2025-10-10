"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { OverviewCharts } from "@/components/dashboard/overview-charts"

// Mock data from the original file, adapted for the new UI
const spendingData = [
  { name: 'Jan', value: 100 }, { name: 'Feb', value: 150 }, { name: 'Mar', value: 120 },
  { name: 'Apr', value: 200 }, { name: 'May', value: 180 }, { name: 'Jun', value: 250 },
]
const activeSubsData = [
    { name: 'Jan', value: 3 }, { name: 'Feb', value: 4 }, { name: 'Mar', value: 3 },
    { name: 'Apr', value: 5 }, { name: 'May', value: 4 }, { name: 'Jun', value: 5 },
]
const upcomingPaymentsData = [
    { name: 'Jul 1', value: 20 }, { name: 'Jul 8', value: 15 }, { name: 'Jul 15', value: 30 },
    { name: 'Jul 22', value: 25 }, { name: 'Jul 29', value: 40 },
]

const subscriptions = [
    { name: "Music Streaming", category: "Entertainment", nextPayment: "July 15, 2024", amount: "$12.99", status: "Active" },
    { name: "Video Streaming", category: "Entertainment", nextPayment: "July 20, 2024", amount: "$19.99", status: "Active" },
    { name: "Cloud Storage", category: "Productivity", nextPayment: "August 5, 2024", amount: "$9.99", status: "Active" },
]

const groups = [
    { name: "Family Plan", subscription: "Video Streaming", members: 4, capacity: 75, status: "Active" },
    { name: "Friends Circle", subscription: "Music Streaming", members: 2, capacity: 50, status: "Active" },
]

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">Overview</h2>
            <OverviewCharts
              spendingData={spendingData}
              activeSubsData={activeSubsData}
              upcomingPaymentsData={upcomingPaymentsData}
            />
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Subscriptions</h2>
            <Card className="bg-[#1A1C2A] p-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-3">Subscription</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Next Payment</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub, index) => (
                    <tr key={index}>
                      <td className="p-3">{sub.name}</td>
                      <td className="p-3">{sub.category}</td>
                      <td className="p-3">{sub.nextPayment}</td>
                      <td className="p-3">{sub.amount}</td>
                      <td className="p-3"><span className="text-green-500">{sub.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Groups</h2>
            <Card className="bg-[#1A1C2A] p-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-3">Group Name</th>
                    <th className="p-3">Subscription</th>
                    <th className="p-3">Members</th>
                    <th className="p-3">Capacity</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((group, index) => (
                    <tr key={index}>
                      <td className="p-3">{group.name}</td>
                      <td className="p-3">{group.subscription}</td>
                      <td className="p-3">{group.members}</td>
                      <td className="p-3"><Progress value={group.capacity} className="w-24 bg-gray-600" /></td>
                      <td className="p-3"><span className="text-green-500">{group.status}</span></td>
                    </tr>
                   ))}
                </tbody>
              </table>
            </Card>
          </section>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}