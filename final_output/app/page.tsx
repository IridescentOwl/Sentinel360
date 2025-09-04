import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Users, CreditCard, ArrowRight, Star, ShieldCheck, Zap, UsersRound, Wallet, Quote } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Sentinel 360</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Features
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Testimonials
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Pricing
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              Share Subscriptions, <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Amplify Savings.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Sentinel 360 is the exclusive platform for Thapar students to securely manage and share subscription costs.
              Join a trusted community and save on services you love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-300 transition-all">
                  Start Sharing Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="shadow-sm">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <div className="p-8 bg-white/50 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/30">
                <div className="p-8 bg-white/80 rounded-2xl shadow-lg">
                    <Zap className="h-24 w-24 text-indigo-500 mx-auto" />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Share your favorite subscriptions
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center text-gray-500 font-semibold">
                <span>Netflix</span>
                <span>Spotify</span>
                <span>Adobe CC</span>
                <span>Prime Video</span>
                <span>YouTube Premium</span>
                <span>Disney+</span>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Sentinel 360 is a No-Brainer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage group subscriptions seamlessly and securely.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-indigo-100 rounded-full mb-4">
                    <ShieldCheck className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle>Verified & Secure</CardTitle>
                <CardDescription>Only for Thapar students. Your data and payments are always protected.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-indigo-100 rounded-full mb-4">
                    <UsersRound className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle>Effortless Groups</CardTitle>
                <CardDescription>Create or join sharing groups in seconds. Manage members with ease.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-indigo-100 rounded-full mb-4">
                    <Wallet className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle>Automated Payments</CardTitle>
                <CardDescription>Integrated with Razorpay for secure, automated payment splitting.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loved by Students Like You</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-gray-200 shadow-md">
              <CardContent className="pt-6">
                <div className="flex text-yellow-400 mb-2">
                  <Star /><Star /><Star /><Star /><Star />
                </div>
                <p className="mb-4">"Sentinel 360 made sharing my Adobe CC subscription so easy. Saved a ton of money and the process was super smooth."</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Rohan Sharma</p>
                    <p className="text-sm text-gray-500">Computer Engineering</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200 shadow-md">
              <CardContent className="pt-6">
                <div className="flex text-yellow-400 mb-2">
                  <Star /><Star /><Star /><Star /><Star />
                </div>
                <p className="mb-4">"Finally, a secure way to split the cost of Netflix and Spotify. The verification process gives me peace of mind."</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>PK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Priya K.</p>
                    <p className="text-sm text-gray-500">Biotechnology</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200 shadow-md">
              <CardContent className="pt-6">
                <div className="flex text-yellow-400 mb-2">
                  <Star /><Star /><Star /><Star /><Star />
                </div>
                <p className="mb-4">"The dashboard is so intuitive. I can see all my shared subscriptions and payments in one place. Highly recommended!"</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Ankit Singh</p>
                    <p className="text-sm text-gray-500">Mechanical Engineering</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Unlock Your Savings?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Create your account in minutes and join the smartest way to manage subscriptions at Thapar.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-colors">
              Create Your Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 Sentinel 360. Exclusively for Thapar University.</p>
        </div>
      </footer>
    </div>
  )
}
