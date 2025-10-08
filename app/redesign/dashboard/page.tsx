import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bell, Home, Settings, Users, Plus, Package, BarChart2 } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Line, LineChart, Tooltip } from "recharts"

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


export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#0D0F1E] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1C2A] p-6 flex flex-col">
        <div className="text-2xl font-bold mb-12">Sentinel 360</div>
        <nav className="flex flex-col gap-4">
          <a href="#" className="flex items-center gap-3 p-2 bg-[#4A4AFF] rounded-lg">
            <Home size={20} />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-2 text-gray-400 hover:bg-[#2A2D3A] rounded-lg">
            <Package size={20} />
            <span>Subscriptions</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-2 text-gray-400 hover:bg-[#2A2D3A] rounded-lg">
            <Users size={20} />
            <span>Groups</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-2 text-gray-400 hover:bg-[#2A2D3A] rounded-lg">
            <Bell size={20} />
            <span>Notifications</span>
          </a>
          <a href="#" className="flex items-center gap-3 p-2 text-gray-400 hover:bg-[#2A2D3A] rounded-lg">
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </nav>
        <div className="mt-auto">
          <a href="#" className="flex items-center gap-3 p-2 text-gray-400 hover:bg-[#2A2D3A] rounded-lg">
            <Plus size={20} />
            <span>Invite friends</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-6 border-b border-gray-800">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-400">Welcome back, Alex</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-600"></div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <section>
            <h2 className="text-xl font-bold mb-4">Overview</h2>
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
          </section>

          <section className="mt-8">
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
                  <tr>
                    <td className="p-3">Music Streaming</td>
                    <td className="p-3">Entertainment</td>
                    <td className="p-3">July 15, 2024</td>
                    <td className="p-3">$12.99</td>
                    <td className="p-3"><span className="text-green-500">Active</span></td>
                  </tr>
                  <tr>
                    <td className="p-3">Video Streaming</td>
                    <td className="p-3">Entertainment</td>
                    <td className="p-3">July 20, 2024</td>
                    <td className="p-3">$19.99</td>
                    <td className="p-3"><span className="text-green-500">Active</span></td>
                  </tr>
                  <tr>
                    <td className="p-3">Cloud Storage</td>
                    <td className="p-3">Productivity</td>
                    <td className="p-3">August 5, 2024</td>
                    <td className="p-3">$9.99</td>
                    <td className="p-3"><span className="text-green-500">Active</span></td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </section>

          <section className="mt-8">
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
                  <tr>
                    <td className="p-3">Family Plan</td>
                    <td className="p-3">Video Streaming</td>
                    <td className="p-3">4</td>
                    <td className="p-3"><Progress value={75} className="w-24 bg-gray-600" /></td>
                    <td className="p-3"><span className="text-green-500">Active</span></td>
                  </tr>
                  <tr>
                    <td className="p-3">Friends Circle</td>
                    <td className="p-3">Music Streaming</td>
                    <td className="p-3">2</td>
                    <td className="p-3"><Progress value={50} className="w-24 bg-gray-600" /></td>
                    <td className="p-3"><span className="text-green-500">Active</span></td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}