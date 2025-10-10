import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

function IconPlaceholder() {
  return (
    <svg
      className="w-10 h-10 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-4 10V7m-6 10V7m-6 10V7M3 7l9-4 9 4M3 7h18"
      />
    </svg>
  )
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0D0F1E] text-white">
      <header className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold">Sentinel 360</div>
        <nav className="hidden md:flex gap-8 items-center">
          <a href="#" className="hover:text-gray-300">How it works</a>
          <a href="#" className="hover:text-gray-300">Pricing</a>
          <a href="#" className="hover:text-gray-300">Blog</a>
        </nav>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-[#4A4AFF] hover:bg-[#4A4AFF]/90">Sign up</Button>
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <section className="text-center py-20">
          <h1 className="text-5xl font-bold mb-4">Share Subscriptions, Save <br /> Effortlessly</h1>
          <p className="text-lg text-gray-400 mb-8">
            Sentinel 360 is the most secure and simple way to share subscription <br />
            costs with friends and family. Enjoy your favorite services for up to 70% less.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button className="bg-[#4A4AFF] hover:bg-[#4A4AFF]/90">Get started for free</Button>
            </Link>
            <Button variant="outline" className="text-white border-white">Learn more</Button>
          </div>
        </section>

        <section className="py-20 text-center">
          <h2 className="text-4xl font-bold mb-4">How Sentinel 360 Works</h2>
          <p className="text-lg text-gray-400 mb-12">
            Sharing subscriptions is as easy as 1-2-3. Create a group, invite members, and start saving.
          </p>
          <div className="grid md:grid-cols-3 gap-8 px-8">
            <Card className="bg-[#1A1C2A] p-8 rounded-lg">
              <div className="w-full h-32 bg-[#2A2D3A] rounded-md mb-4 flex items-center justify-center">
                <IconPlaceholder />
              </div>
              <h3 className="text-xl font-bold mb-2">Create a Group</h3>
              <p className="text-gray-400">Choose the subscription you want to share. Set the number of members and the price per slot.</p>
            </Card>
            <Card className="bg-[#1A1C2A] p-8 rounded-lg">
              <div className="w-full h-32 bg-[#2A2D3A] rounded-md mb-4 flex items-center justify-center">
                <IconPlaceholder />
              </div>
              <h3 className="text-xl font-bold mb-2">Invite Friends</h3>
              <p className="text-gray-400">Send a unique link to your friends and family. They can join your group with just a few clicks.</p>
            </Card>
            <Card className="bg-[#1A1C2A] p-8 rounded-lg">
              <div className="w-full h-32 bg-[#2A2D3A] rounded-md mb-4 flex items-center justify-center">
                <IconPlaceholder />
              </div>
              <h3 className="text-xl font-bold mb-2">Start Saving</h3>
              <p className="text-gray-400">Once your group is full, everyone starts saving. Payments are handled automatically and securely.</p>
            </Card>
          </div>
        </section>

        <section className="text-center py-20">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-lg text-gray-400 mb-8">
            Sign up for Sentinel 360 today and join thousands of users who are cutting their subscription costs.
          </p>
          <Link href="/register">
            <Button className="bg-[#4A4AFF] hover:bg-[#4A4AFF]/90">Sign Up Now</Button>
          </Link>
        </section>
      </main>

      <footer className="text-center py-6 border-t border-gray-800">
        <div className="flex justify-center gap-8 mb-4">
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
        </div>
        <p className="text-gray-500">© 2024 Sentinel 360. All rights reserved.</p>
      </footer>
    </div>
  )
}