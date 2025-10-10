"use client"

import { Bar, BarChart, ResponsiveContainer, Line, LineChart } from "recharts"
import { Card } from "@/components/ui/card"
import { Package, BarChart2, Users } from "lucide-react"

const spendingData = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 150 },
  { name: 'Mar', value: 120 },
  { name: 'Apr', value: 200 },
  { name: 'May', value: 180 },
  { name: 'Jun', value: 250 },
]

const activeSubsData = [
    { name: 'Jan', value: 3 },
    { name: 'Feb', value: 4 },
    { name: 'Mar', value: 3 },
    { name: 'Apr', value: 5 },
    { name: 'May', value: 4 },
    { name: 'Jun', value: 5 },
]

const upcomingPaymentsData = [
    { name: 'Jul 1', value: 20 },
    { name: 'Jul 8', value: 15 },
    { name: 'Jul 15', value: 30 },
    { name: 'Jul 22', value: 25 },
    { name: 'Jul 29', value: 40 },
]

export function Charts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Spending */}
      <Card className="bg-[#1A1C2A] p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400">Total Spending</p>
            <p className="text-3xl font-bold">$245.50</p>
            <p className="text-green-500 text-sm">+10%</p>
          </div>
          <BarChart2 size={24} className="text-gray-500" />
        </div>
        <div className="h-24 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spendingData}>
              <Bar dataKey="value" fill="#4A4AFF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      {/* Active Subscriptions */}
      <Card className="bg-[#1A1C2A] p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400">Active Subscriptions</p>
            <p className="text-3xl font-bold">5</p>
            <p className="text-red-500 text-sm">-5%</p>
          </div>
          <Package size={24} className="text-gray-500" />
        </div>
         <div className="h-24 mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeSubsData}>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </Card>
      {/* Upcoming Payments */}
      <Card className="bg-[#1A1C2A] p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400">Upcoming Payments</p>
            <p className="text-3xl font-bold">2</p>
            <p className="text-green-500 text-sm">+2%</p>
          </div>
          <Users size={24} className="text-gray-500" />
        </div>
        <div className="h-24 mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={upcomingPaymentsData}>
                     <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}