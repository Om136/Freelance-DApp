"use client"
import type React from "react"
import { useState } from "react"
import { Check, Eye, EyeOff, Github, Layers, Loader2, Briefcase, Code } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

const API_URL = {
  login: 'http://localhost:8080/login',
  signup: 'http://localhost:8080/signUp'
}

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [role, setRole] = useState("freelancer")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate email and password
    if (!email) {
      setEmailError("Email is required")
      setIsLoading(false)
      return
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email")
      setIsLoading(false)
      return
    }

    if (!password) {
      setPasswordError("Password is required")
      setIsLoading(false)
      return
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(API_URL.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Handle successful login
      window.location.href = "/dashboard"
    } catch (error) {
      console.error('Login error:', error)
      setEmailError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate fields
    if (!name || !email || !password) {
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(API_URL.signup, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed')
      }

      // Handle successful signup
      window.location.reload()
    } catch (error) {
      console.error('Signup error:', error)
      setEmailError("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRoleChange = (newRole: string) => {
    setRole(newRole)
  }

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-[#0F0F13] md:flex-row">
      {/* Left side - Illustration */}
      <div className="relative hidden h-screen w-full bg-zinc-900 md:block md:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-zinc-900 to-zinc-900" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1080')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="relative flex h-full flex-col items-center justify-center p-12">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-500 text-black">
              <Layers className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-white">NexusWork</span>
          </div>
          <div className="max-w-md text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white">
              Decentralized Freelancing for the Web3 Era
            </h1>
            <p className="mb-8 text-lg text-zinc-300">
              Connect, collaborate, and get paid securely with blockchain-powered contracts and automatic escrow.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-left text-zinc-300">Blockchain-verified reputation system</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-left text-zinc-300">Automatic escrow release with multi-phase contracts</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-left text-zinc-300">DAO-governed dispute resolution</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 flex items-center gap-2 text-sm text-zinc-500">
          <span>© 2025 NexusWork</span>
          <span className="h-1 w-1 rounded-full bg-zinc-700" />
          <Link href="#" className="hover:text-zinc-300">
            Privacy
          </Link>
          <span className="h-1 w-1 rounded-full bg-zinc-700" />
          <Link href="#" className="hover:text-zinc-300">
            Terms
          </Link>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex h-screen w-full md:w-1/2">
        <div className="flex w-full flex-col p-6 md:p-12">
          <div className="mb-8 flex items-center gap-3 md:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500 text-black">
              <Layers className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-white">NexusWork</span>
          </div>

          <Tabs defaultValue="login" className="flex h-full w-full flex-col">
            <TabsList className="mb-6 grid h-12 w-full grid-cols-2 bg-zinc-800/50 p-1 ">
              <TabsTrigger 
                value="login" 
                className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <TabsContent value="login" className="mt-0 h-full lg:p-6 lg:px-16">
                <Card className="border-zinc-800 bg-zinc-900/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-zinc-100">Welcome back</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Enter your credentials to access your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-300">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          className={`border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-emerald-500/50 ${
                            emailError ? "border-red-500" : ""
                          }`}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="text-xs text-red-500">{emailError}</p>}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-zinc-300">
                            Password
                          </Label>
                          <Link href="#" className="text-xs text-zinc-400 hover:text-emerald-400">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className={`border-zinc-700 bg-zinc-800 pr-10 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-emerald-500/50 ${
                              passwordError ? "border-red-500" : ""
                            }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 text-zinc-400 hover:text-zinc-100"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          className="border-zinc-700 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-zinc-900"
                        />
                        <label
                          htmlFor="remember"
                          className="text-sm font-medium leading-none text-zinc-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember me for 30 days
                        </label>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          "Sign in"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="signup" className="mt-0 h-full lg:p-6 lg:px-16">
                <Card className="border-zinc-800 bg-zinc-900/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-zinc-100">Create an account</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Join the decentralized freelancing revolution
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-zinc-300">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          className="border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-emerald-500/50"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-zinc-300">
                          Email
                        </Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="name@example.com"
                          className="border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-emerald-500/50"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-zinc-300">Account Type</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <label 
                            className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                              role === 'recruiter' 
                                ? 'border-emerald-500 bg-emerald-900/20' 
                                : 'border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800'
                            }`}
                          >
                            <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600">
                              <Briefcase className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-medium text-zinc-200">Recruiter</span>
                            <span className="text-xs text-zinc-400 mt-1">Hire talent</span>
                            <input 
                              type="radio" 
                              name="role" 
                              value="recruiter" 
                              checked={role === 'recruiter'} 
                              onChange={(e) => handleRoleChange(e.target.value)} 
                              className="sr-only"
                            />
                          </label>
                          <label 
                            className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                              role === 'freelancer' 
                                ? 'border-emerald-500 bg-emerald-900/20' 
                                : 'border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800'
                            }`}
                          >
                            <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600">
                              <Code className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-medium text-zinc-200">Freelancer</span>
                            <span className="text-xs text-zinc-400 mt-1">Offer services</span>
                            <input 
                              type="radio" 
                              name="role" 
                              value="freelancer" 
                              checked={role === 'freelancer'} 
                              onChange={(e) => handleRoleChange(e.target.value)} 
                              className="sr-only"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-zinc-300">
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            className="border-zinc-700 bg-zinc-800 pr-10 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-emerald-500/50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 text-zinc-400 hover:text-zinc-100"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <p className="text-xs text-zinc-500">Must be at least 8 characters</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
                            className="border-zinc-700 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-zinc-900"
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none text-zinc-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the{" "}
                            <Link href="#" className="text-emerald-400 hover:underline">
                              terms of service
                            </Link>{" "}
                            and{" "}
                            <Link href="#" className="text-emerald-400 hover:underline">
                              privacy policy
                            </Link>
                          </label>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          "Create account"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>

          <div className="mt-6 text-center text-sm text-zinc-500 md:hidden">
            <p>© 2025 NexusWork. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
