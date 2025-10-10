"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, Line, LineChart } from "recharts"

interface ChartData {
  name: string
  value: number
}

interface OverviewChartsProps {
  spendingData: ChartData[]
  activeSubsData: ChartData[]
  upcomingPaymentsData: ChartData[]
}

export function OverviewCharts({ spendingData, activeSubsData, upcomingPaymentsData }: OverviewChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-[#1A1C2A] p-6">
        <CardHeader className="p-0 mb-4">
            <CardTitle className="text-gray-400 text-sm font-medium">Total Spending</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <p className="text-3xl font-bold">$245.50</p>
            <p className="text-green-500 text-sm">+10%</p>
            <div className="h-24 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendingData}><Bar dataKey="value" fill="#4A4AFF" /></BarChart>
              </ResponsiveContainer>
            </div>
        </CardContent>
      </Card>
      <Card className="bg-[#1A1C2A] p-6">
        <CardHeader className="p-0 mb-4">
            <CardTitle className="text-gray-400 text-sm font-medium">Active Subscriptions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <p className="text-3xl font-bold">5</p>
            <p className="text-red-500 text-sm">-5%</p>
            <div className="h-24 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activeSubsData}><Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} /></LineChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
      </Card>
      <Card className="bg-[#1A1C2A] p-6">
        <CardHeader className="p-0 mb-4">
            <CardTitle className="text-gray-400 text-sm font-medium">Upcoming Payments</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <p className="text-3xl font-bold">2</p>
            <p className="text-green-500 text-sm">+2%</p>
            <div className="h-24 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={upcomingPaymentsData}><Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} /></LineChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}