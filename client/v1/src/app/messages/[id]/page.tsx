"use client"

import { useState } from "react"
import {
  AlertCircle,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Calendar,
  Clock,
  Code2,
  Compass,
  CreditCard,
  DollarSign,
  FileCheck,
  Gavel,
  Handshake,
  Layers,
  Lock,
  MessageSquare,
  Paperclip,
  Send,
  Settings,
  Shield,
  Star,
  ThumbsDown,
  ThumbsUp,
  Wallet,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample contract data
const contract = {
  id: "contract-1",
  title: "Full Stack Web3 Developer",
  description: "Building a DeFi dashboard with wallet integration and real-time data visualization.",
  budget: "4,500 USDC",
  startDate: "May 15, 2025",
  deadline: "June 10, 2025",
  status: "in-progress",
  escrowAmount: "4,500 USDC",
  escrowReleased: "1,500 USDC",
  escrowPending: "3,000 USDC",
  contractAddress: "0x7a2...3f9b",
  phases: [
    {
      id: 1,
      title: "UI/UX Design & Wireframes",
      status: "completed",
      payment: "1,500 USDC",
      deadline: "May 22, 2025",
      deliverables: ["Wireframes", "Design System", "Component Library"],
    },
    {
      id: 2,
      title: "Frontend Implementation",
      status: "in-progress",
      payment: "1,500 USDC",
      deadline: "May 30, 2025",
      deliverables: ["Dashboard UI", "Wallet Integration", "Data Visualization"],
    },
    {
      id: 3,
      title: "Backend & Smart Contract Integration",
      status: "pending",
      payment: "1,500 USDC",
      deadline: "June 10, 2025",
      deliverables: ["API Integration", "Smart Contract Interaction", "Testing & Deployment"],
    },
  ],
  client: {
    id: "client-1",
    name: "CryptoVentures",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    completedJobs: 12,
    disputeRate: "2%",
    avgResponseTime: "2 hours",
    verificationLevel: "Tier 3",
    tokensHeld: "25,000 NXW",
  },
  freelancer: {
    id: "freelancer-1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    completedJobs: 28,
    successRate: "97%",
    onTimeDelivery: "95%",
    specialization: "Web3 Development",
    tokensStaked: "5,000 NXW",
    verificationLevel: "Tier 2",
  },
}

// Sample messages
const initialMessages = [
  {
    id: 1,
    sender: "client",
    text: "Hi Alex, I'm excited to start working with you on our DeFi dashboard project!",
    timestamp: "May 15, 10:23 AM",
    read: true,
  },
  {
    id: 2,
    sender: "freelancer",
    text: "Thanks for choosing me for this project! I've reviewed the requirements and I'm ready to get started. I'll begin with the wireframes as discussed.",
    timestamp: "May 15, 10:45 AM",
    read: true,
  },
  {
    id: 3,
    sender: "client",
    text: "Great! Just to confirm, we need the dashboard to show real-time token prices, wallet balances, and transaction history. The design should be modern and intuitive.",
    timestamp: "May 15, 11:02 AM",
    read: true,
  },
  {
    id: 4,
    sender: "freelancer",
    text: "Understood. I'll focus on creating a clean, modern interface with those key features. I'll also include dark mode support since most DeFi users prefer it.",
    timestamp: "May 15, 11:15 AM",
    read: true,
  },
//   {
//     id: 5,
//     sender: "system",
//     text: "Phase 1 milestone completed. 1,500 USDC released from escrow.",
//     timestamp: "May 22, 3:45 PM",
//     read: true,
//     type: "milestone",
//   },
//   {
//     id: 6,
//     sender: "client",
//     text: "The wireframes look fantastic! I especially like the portfolio visualization section. Can we add a feature to compare historical performance against major indices?",
//     timestamp: "May 23, 9:30 AM",
//     read: true,
//   },
//   {
//     id: 7,
//     sender: "freelancer",
//     text: "Absolutely, I can incorporate that comparison feature. It would fit well in the analytics section. I'll start implementing the frontend now based on the approved designs.",
//     timestamp: "May 23, 10:05 AM",
//     read: true,
//     attachment: {
//       name: "dashboard_preview_v1.png",
//       size: "2.4 MB",
//     },
//   },
//   {
//     id: 8,
//     sender: "client",
//     text: "This looks great! One small change - can we make the token balance cards a bit more prominent? They're the most important part for our users.",
//     timestamp: "May 25, 2:15 PM",
//     read: true,
//   },
//   {
//     id: 9,
//     sender: "freelancer",
//     text: "I've updated the token balance cards with more visual emphasis and added hover states with quick actions. Here's the latest version.",
//     timestamp: "May 26, 11:30 AM",
//     read: true,
//     attachment: {
//       name: "dashboard_preview_v2.png",
//       size: "2.7 MB",
//     },
//   },
//   {
//     id: 10,
//     sender: "client",
//     text: "Perfect! This is exactly what I had in mind. How's the progress on the wallet integration coming along?",
//     timestamp: "May 27, 9:45 AM",
//     read: false,
//   },
]

export default function MessagePage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [showDisputeDialog, setShowDisputeDialog] = useState(false)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [showContractDialog, setShowContractDialog] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(1)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const newMsg = {
      id: messages.length + 1,
      sender: "freelancer",
      text: newMessage,
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      read: true,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB")
        return
      }
      setSelectedFile(file)
      const newMsg = {
        id: messages.length + 1,
        sender: "freelancer",
        text: "Attached file: " + file.name,
        timestamp: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        read: true,
        attachment: {
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        },
      }
      setMessages([...messages, newMsg])
    }
  }

  const completedPhases = contract.phases.filter((phase) => phase.status === "completed").length
  const totalPhases = contract.phases.length
  const progressPercentage = (completedPhases / totalPhases) * 100

  return (
    <div className="min-h-screen bg-[#0F0F13] text-zinc-200">
      <SidebarProvider>
        <div className="flex h-screen">
          <Sidebar variant="floating" className="border-zinc-800">
            <SidebarHeader className="p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500 text-black">
                  <Layers className="h-5 w-5" />
                </div>
                <span className="text-lg font-semibold">NexusWork</span>
              </div>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/dashboard">
                          <Compass className="text-zinc-400" />
                          <span>Discover</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/dashboard">
                          <BriefcaseBusiness className="text-zinc-400" />
                          <span>Jobs</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <MessageSquare className="text-emerald-500" />
                        <span>Messages</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Wallet className="text-zinc-400" />
                        <span>Payments</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Calendar className="text-zinc-400" />
                        <span>Schedule</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator />
              <SidebarGroup>
                <SidebarGroupLabel>My Work</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Code2 className="text-zinc-400" />
                        <span>Active Contracts</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <CreditCard className="text-zinc-400" />
                        <span>Proposals</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4">
              <div className="flex items-center gap-3 rounded-lg bg-zinc-800/50 p-3">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="rounded-full border border-zinc-700"
                />
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">Alex Johnson</p>
                  <p className="truncate text-xs text-zinc-400">Web3 Developer</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>

          <div className="flex flex-1 flex-col">
            <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-800 bg-[#0F0F13]/80 px-4 sm:px-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <Image
                  src={contract.client.avatar || "/placeholder.svg"}
                  alt={contract.client.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 flex-shrink-0 rounded-full border border-zinc-700"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <h2 className="truncate font-medium">{contract.client.name}</h2>
                    <Badge variant="outline" className="flex-shrink-0 border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                      Client
                    </Badge>
                    <Badge variant="outline" className="hidden border-amber-500/30 bg-amber-500/10 text-amber-400 sm:flex">
                      Tier 3
                    </Badge>
                  </div>
                  <p className="truncate text-sm text-zinc-400">{contract.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden gap-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 sm:flex"
                    >
                      <FileCheck className="h-4 w-4" />
                      <span>Approve Phase</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-zinc-800 bg-zinc-900 text-zinc-200 sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Approve Phase Completion</DialogTitle>
                      <DialogDescription className="text-zinc-400">
                        This will release the escrow payment for the current phase and move the project to the next
                        phase.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                        <h4 className="mb-2 font-medium">Phase 2: Frontend Implementation</h4>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-zinc-400">Payment Amount:</span>
                          <span className="font-medium text-emerald-400">1,500 USDC</span>
                        </div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-zinc-400">Gas Fee (estimated):</span>
                          <span className="font-medium text-zinc-300">~0.002 ETH</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-400">Transaction Hash:</span>
                          <span className="font-mono text-xs text-zinc-300">0x7a2...3f9b</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-400">
                        <AlertCircle className="h-4 w-4" />
                        <p>This action cannot be reversed once confirmed on the blockchain.</p>
                      </div>
                    </div>
                    <DialogFooter className="flex-row gap-2 sm:justify-end">
                      <Button
                        variant="outline"
                        className="flex-1 border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 sm:flex-none"
                        onClick={() => setShowApprovalDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="flex-1 gap-2 bg-emerald-600 text-white hover:bg-emerald-700 sm:flex-none"
                        onClick={() => {
                          const newMsg = {
                            id: messages.length + 1,
                            sender: "system",
                            text: "Phase 2 milestone completed. 1,500 USDC released from escrow.",
                            timestamp: new Date().toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }),
                            read: true,
                            type: "milestone",
                          }
                          setMessages([...messages, newMsg])
                          setCurrentPhase(2)
                          setShowApprovalDialog(false)
                        }}
                      >
                        <Shield className="h-4 w-4" />
                        <span>Confirm & Sign</span>
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={showDisputeDialog} onOpenChange={setShowDisputeDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden gap-2 border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 sm:flex"
                    >
                      <Gavel className="h-4 w-4" />
                      <span>Raise Dispute</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-zinc-800 bg-zinc-900 text-zinc-200 sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Raise a Dispute</DialogTitle>
                      <DialogDescription className="text-zinc-400">
                        This will initiate a DAO-governed dispute resolution process. Community members will review the
                        case and vote on the outcome.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                        <h4 className="mb-2 font-medium">Dispute Details</h4>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-zinc-400">Contract Value:</span>
                          <span className="font-medium text-zinc-300">4,500 USDC</span>
                        </div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-zinc-400">Disputed Amount:</span>
                          <span className="font-medium text-red-400">1,500 USDC</span>
                        </div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-zinc-400">Dispute Fee:</span>
                          <span className="font-medium text-zinc-300">50 NXW Tokens</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-400">Estimated Resolution Time:</span>
                          <span className="font-medium text-zinc-300">3-5 days</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-400">
                        <AlertCircle className="h-4 w-4" />
                        <p>
                          Raising a dispute requires staking 50 NXW tokens. These tokens may be forfeited if the dispute
                          is found to be frivolous.
                        </p>
                      </div>
                    </div>
                    <DialogFooter className="flex-row gap-2 sm:justify-end">
                      <Button
                        variant="outline"
                        className="flex-1 border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 sm:flex-none"
                        onClick={() => setShowDisputeDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="flex-1 gap-2 bg-red-600 text-white hover:bg-red-700 sm:flex-none"
                        onClick={() => {
                          const newMsg = {
                            id: messages.length + 1,
                            sender: "system",
                            text: "Dispute raised for Phase 2. Case #D-2587 opened for DAO review.",
                            timestamp: new Date().toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }),
                            read: true,
                            type: "dispute",
                          }
                          setMessages([...messages, newMsg])
                          setShowDisputeDialog(false)
                        }}
                      >
                        <Gavel className="h-4 w-4" />
                        <span>Confirm & Stake</span>
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  size="icon"
                  className="flex border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 sm:hidden"
                  onClick={() => setShowApprovalDialog(true)}
                >
                  <FileCheck className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="flex border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 sm:hidden"
                  onClick={() => setShowDisputeDialog(true)}
                >
                  <Gavel className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <div className="grid flex-1 md:grid-cols-[1fr_350px]">
              <div className="flex flex-col">
                <ScrollArea className="flex-1">
                  <div className="p-2 sm:p-4">
                    <div className="mx-auto max-w-3xl space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "freelancer" ? "justify-end" : "justify-start"} ${
                            message.type === "milestone" || message.type === "dispute" ? "justify-center" : ""
                          }`}
                        >
                          {message.type === "milestone" || message.type === "dispute" ? (
                            <div
                              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs sm:px-4 sm:text-sm ${
                                message.type === "milestone"
                                  ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                  : "border border-red-500/20 bg-red-500/10 text-red-400"
                              }`}
                            >
                              {message.type === "milestone" ? (
                                <FileCheck className="h-4 w-4" />
                              ) : (
                                <Gavel className="h-4 w-4" />
                              )}
                              <span className="line-clamp-2">{message.text}</span>
                            </div>
                          ) : (
                            <div
                              className={`group relative max-w-[90%] rounded-lg p-3 sm:max-w-[80%] sm:p-4 ${
                                message.sender === "freelancer"
                                  ? "rounded-tr-none bg-emerald-500/10 text-zinc-200"
                                  : "rounded-tl-none bg-zinc-800 text-zinc-200"
                              }`}
                            >
                              {message.sender === "client" && (
                                <div className="absolute -left-8 top-0 hidden h-6 w-6 overflow-hidden rounded-full border border-zinc-700 group-hover:block sm:-left-10 sm:h-8 sm:w-8">
                                  <Image
                                    src={contract.client.avatar || "/placeholder.svg"}
                                    alt={contract.client.name}
                                    width={32}
                                    height={32}
                                  />
                                </div>
                              )}
                              {message.sender === "freelancer" && (
                                <div className="absolute -right-8 top-0 hidden h-6 w-6 overflow-hidden rounded-full border border-zinc-700 group-hover:block sm:-right-10 sm:h-8 sm:w-8">
                                  <Image
                                    src={contract.freelancer.avatar || "/placeholder.svg"}
                                    alt={contract.freelancer.name}
                                    width={32}
                                    height={32}
                                  />
                                </div>
                              )}
                              <div className="space-y-2">
                                <p className="whitespace-pre-wrap break-words text-sm sm:text-base">{message.text}</p>
                                {message.attachment && (
                                  <div className="mt-2 flex items-center gap-2 overflow-hidden rounded-md border border-zinc-700 bg-zinc-900 p-2">
                                    <Paperclip className="h-4 w-4 flex-shrink-0 text-zinc-400" />
                                    <span className="truncate text-xs sm:text-sm text-zinc-300">{message.attachment.name}</span>
                                    <span className="text-xs text-zinc-500">({message.attachment.size})</span>
                                  </div>
                                )}
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-zinc-500">{message.timestamp}</span>
                                  {message.sender === "client" && !message.read && (
                                    <span className="text-xs text-emerald-400">New</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>

                <div className="border-t border-zinc-800 bg-zinc-900/50 p-2 sm:p-4">
                  <div className="mx-auto max-w-3xl">
                    <div className="flex items-end gap-2">
                      <div className="relative flex-1">
                        <Input
                          placeholder="Type your message..."
                          className="min-h-[40px] sm:min-h-[50px] border-zinc-800 bg-zinc-800/50 pr-20 text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-emerald-500/50"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage()
                            }
                          }}
                        />
                        <div className="absolute bottom-0 right-0 top-0 flex h-full items-center gap-1 px-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <label className="cursor-pointer">
                                  <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileSelect}
                                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                                  />
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-zinc-400 hover:bg-transparent hover:text-emerald-400"
                                  >
                                    <Paperclip className="h-4 w-4" />
                                  </Button>
                                </label>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Attach File (Max 10MB)</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <Button
                        className="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] rounded-full bg-emerald-600 p-0 text-white hover:bg-emerald-700"
                        onClick={handleSendMessage}
                      >
                        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Dialog open={showContractDialog} onOpenChange={setShowContractDialog}>
                <DialogContent className="max-h-[90vh] border-zinc-800 bg-zinc-900 text-zinc-200 sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Contract Details</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="max-h-[70vh] pr-4">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">{contract.title}</h3>
                        <p className="mt-2 text-sm text-zinc-400">{contract.description}</p>
                      </div>
                      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <span className="text-sm text-zinc-400">Budget:</span>
                            <p className="text-sm font-medium text-emerald-400">{contract.budget}</p>
                          </div>
                          <div>
                            <span className="text-sm text-zinc-400">Timeline:</span>
                            <p className="text-sm text-zinc-300">
                              {contract.startDate} - {contract.deadline}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-zinc-400">Status:</span>
                            <p className="text-sm font-medium text-amber-400">{contract.status}</p>
                          </div>
                          <div>
                            <span className="text-sm text-zinc-400">Contract Address:</span>
                            <p className="text-sm font-mono text-zinc-300">{contract.contractAddress}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">Project Timeline</h4>
                        <div className="space-y-4">
                          {contract.phases.map((phase) => (
                            <div
                              key={phase.id}
                              className="relative rounded-lg border border-zinc-800 bg-zinc-950 p-4"
                            >
                              <h4 className="mb-2 font-medium">
                                Phase {phase.id}: {phase.title}
                              </h4>
                              <div className="mb-1 flex items-center gap-1 text-xs text-zinc-400">
                                <Clock className="h-3 w-3" />
                                <span>Deadline: {phase.deadline}</span>
                              </div>
                              <div className="mb-2 flex items-center gap-1 text-xs text-zinc-400">
                                <DollarSign className="h-3 w-3" />
                                <span>Payment: {phase.payment}</span>
                              </div>
                              <div className="space-y-1">
                                <div className="text-xs font-medium text-zinc-300">Deliverables:</div>
                                <ul className="ml-4 list-disc space-y-1 text-xs text-zinc-400">
                                  {phase.deliverables.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                        <h4 className="mb-4 font-medium">Terms & Conditions</h4>
                        <p className="text-sm text-zinc-400">
                          By engaging in this contract, both parties agree to the terms outlined in the NexusWork
                          platform. Any disputes will be resolved through the DAO-governed process.
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>

              <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
                <DialogContent className="max-h-[90vh] border-zinc-800 bg-zinc-900 text-zinc-200 sm:max-w-xl">
                  <DialogHeader>
                    <DialogTitle>Freelancer Profile</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="max-h-[70vh] pr-4">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Image
                          src={contract.freelancer.avatar}
                          alt={contract.freelancer.name}
                          width={80}
                          height={80}
                          className="rounded-full border-2 border-emerald-500"
                        />
                        <div>
                          <h3 className="text-xl font-medium">{contract.freelancer.name}</h3>
                          <p className="text-sm text-zinc-400">{contract.freelancer.specialization}</p>
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-md bg-zinc-800 p-2">
                          <div className="font-medium">{contract.freelancer.successRate}</div>
                          <div className="text-xs text-zinc-400">Success Rate</div>
                        </div>
                        <div className="rounded-md bg-zinc-800 p-2">
                          <div className="font-medium">{contract.freelancer.onTimeDelivery}</div>
                          <div className="text-xs text-zinc-400">On-time Delivery</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-4 font-medium">Portfolio</h4>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-md bg-zinc-800 p-2">
                            <p className="text-sm text-zinc-400">Portfolio Item 1</p>
                          </div>
                          <div className="rounded-md bg-zinc-800 p-2">
                            <p className="text-sm text-zinc-400">Portfolio Item 2</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-4 font-medium">Client Reviews</h4>
                        <div className="space-y-4">
                          <div className="rounded-md bg-zinc-800 p-2">
                            <p className="text-sm text-zinc-400">"Great work!"</p>
                          </div>
                          <div className="rounded-md bg-zinc-800 p-2">
                            <p className="text-sm text-zinc-400">"Very professional."</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>

              <div className="hidden border-l border-zinc-800 md:block">
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <Tabs defaultValue="contract">
                      <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
                        <TabsTrigger value="contract">Contract</TabsTrigger>
                        <TabsTrigger value="profiles">Profiles</TabsTrigger>
                      </TabsList>
                      <TabsContent value="contract" className="mt-4 space-y-4">
                        <Card className="border-zinc-800 bg-zinc-900/50">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <h3 className="truncate text-lg font-medium">{contract.title}</h3>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 flex-shrink-0 rounded-full text-emerald-400"
                                    >
                                      <Lock className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs">Secured by Smart Contract</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-400">Status:</span>
                                <Badge className="bg-amber-500/20 text-amber-400">In Progress</Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-400">Budget:</span>
                                <span className="font-medium text-emerald-400">{contract.budget}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-400">Timeline:</span>
                                <span className="text-zinc-300">
                                  {contract.startDate} - {contract.deadline}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-400">Contract Address:</span>
                                <span className="font-mono text-xs text-zinc-300">{contract.contractAddress}</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">Escrow Status</h4>
                                <span className="text-xs text-zinc-400">33% Released</span>
                              </div>
                              <Progress value={33} className="h-2 bg-zinc-800">
                                <div className="h-full bg-emerald-500" style={{ width: "33%" }} />
                              </Progress>
                              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                <div className="rounded-md bg-emerald-500/10 p-2 text-emerald-400">
                                  <div className="font-medium">{contract.escrowReleased}</div>
                                  <div className="text-zinc-400">Released</div>
                                </div>
                                <div className="rounded-md bg-amber-500/10 p-2 text-amber-400">
                                  <div className="font-medium">1,500 USDC</div>
                                  <div className="text-zinc-400">Current</div>
                                </div>
                                <div className="rounded-md bg-zinc-800 p-2">
                                  <div className="font-medium">1,500 USDC</div>
                                  <div className="text-zinc-400">Pending</div>
                                </div>
                              </div>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="phases" className="border-zinc-800">
                                <AccordionTrigger className="text-sm font-medium hover:text-emerald-400">
                                  Project Phases
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-3 pt-2">
                                    {contract.phases.map((phase) => (
                                      <div
                                        key={phase.id}
                                        className={`relative rounded-md border p-3 text-sm ${
                                          phase.status === "completed"
                                            ? "border-emerald-500/20 bg-emerald-500/5"
                                            : phase.status === "in-progress"
                                              ? "border-amber-500/20 bg-amber-500/5"
                                              : "border-zinc-800 bg-zinc-900"
                                        }`}
                                      >
                                        <div className="absolute right-3 top-3">
                                          {phase.status === "completed" ? (
                                            <Badge className="bg-emerald-500/20 text-emerald-400">Completed</Badge>
                                          ) : phase.status === "in-progress" ? (
                                            <Badge className="bg-amber-500/20 text-amber-400">In Progress</Badge>
                                          ) : (
                                            <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                                              Pending
                                            </Badge>
                                          )}
                                        </div>
                                        <h4 className="mb-2 font-medium">
                                          Phase {phase.id}: {phase.title}
                                        </h4>
                                        <div className="mb-1 flex items-center gap-1 text-xs text-zinc-400">
                                          <Clock className="h-3 w-3" />
                                          <span>Deadline: {phase.deadline}</span>
                                        </div>
                                        <div className="mb-2 flex items-center gap-1 text-xs text-zinc-400">
                                          <DollarSign className="h-3 w-3" />
                                          <span>Payment: {phase.payment}</span>
                                        </div>
                                        <div className="space-y-1">
                                          <div className="text-xs font-medium text-zinc-300">Deliverables:</div>
                                          <ul className="ml-4 list-disc space-y-1 text-xs text-zinc-400">
                                            {phase.deliverables.map((item, i) => (
                                              <li key={i}>{item}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>

                            <div className="flex items-center justify-between">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                                onClick={() => setShowContractDialog(true)}
                              >
                                <ArrowRight className="h-4 w-4" />
                                <span>View Full Contract</span>
                              </Button>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full text-red-400 hover:bg-red-500/10 hover:text-red-400"
                                >
                                  <ThumbsDown className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-400"
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="profiles" className="mt-4 space-y-4">
                        <Card className="border-zinc-800 bg-zinc-900/50">
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                              <Image
                                src={contract.client.avatar || "/placeholder.svg"}
                                alt={contract.client.name}
                                width={40}
                                height={40}
                                className="rounded-full border border-zinc-700"
                              />
                              <div>
                                <h3 className="font-medium">{contract.client.name}</h3>
                                <div className="flex items-center gap-1 text-xs text-zinc-400">
                                  <Badge
                                    variant="outline"
                                    className="border-amber-500/30 bg-amber-500/10 text-amber-400"
                                  >
                                    Tier 3
                                  </Badge>
                                  <span>•</span>
                                  <span>Client</span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                <span className="font-medium">{contract.client.rating}</span>
                                <span className="text-sm text-zinc-400">({contract.client.completedJobs} jobs)</span>
                              </div>
                              <Badge
                                variant="outline"
                                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                              >
                                <Shield className="mr-1 h-3 w-3" />
                                Verified
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-center text-sm">
                              <div className="rounded-md bg-zinc-800 p-2">
                                <div className="font-medium">{contract.client.disputeRate}</div>
                                <div className="text-xs text-zinc-400">Dispute Rate</div>
                              </div>
                              <div className="rounded-md bg-zinc-800 p-2">
                                <div className="font-medium">{contract.client.avgResponseTime}</div>
                                <div className="text-xs text-zinc-400">Avg. Response</div>
                              </div>
                            </div>

                            <div className="rounded-md bg-zinc-800 p-3">
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm font-medium">Token Balance</span>
                                <Badge className="bg-purple-500/20 text-purple-400">NXW</Badge>
                              </div>
                              <div className="text-lg font-medium text-purple-400">{contract.client.tokensHeld}</div>
                              <div className="mt-1 text-xs text-zinc-400">
                                Used for governance voting and platform fees
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-zinc-800 bg-zinc-900/50">
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                              <Image
                                src={contract.freelancer.avatar || "/placeholder.svg"}
                                alt={contract.freelancer.name}
                                width={40}
                                height={40}
                                className="rounded-full border border-zinc-700"
                              />
                              <div>
                                <h3 className="font-medium">{contract.freelancer.name}</h3>
                                <div className="flex items-center gap-1 text-xs text-zinc-400">
                                  <Badge
                                    variant="outline"
                                    className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                  >
                                    Tier 2
                                  </Badge>
                                  <span>•</span>
                                  <span>Freelancer</span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                <span className="font-medium">{contract.freelancer.rating}</span>
                                <span className="text-sm text-zinc-400">
                                  ({contract.freelancer.completedJobs} jobs)
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                              >
                                <Award className="mr-1 h-3 w-3" />
                                Top Rated
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-center text-sm">
                              <div className="rounded-md bg-zinc-800 p-2">
                                <div className="font-medium">{contract.freelancer.successRate}</div>
                                <div className="text-xs text-zinc-400">Success Rate</div>
                              </div>
                              <div className="rounded-md bg-zinc-800 p-2">
                                <div className="font-medium">{contract.freelancer.onTimeDelivery}</div>
                                <div className="text-xs text-zinc-400">On-time Delivery</div>
                              </div>
                            </div>

                            <div className="rounded-md bg-zinc-800 p-3">
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm font-medium">Tokens Staked</span>
                                <Badge className="bg-purple-500/20 text-purple-400">NXW</Badge>
                              </div>
                              <div className="text-lg font-medium text-purple-400">
                                {contract.freelancer.tokensStaked}
                              </div>
                              <div className="mt-1 text-xs text-zinc-400">
                                Staked as reputation collateral for this contract
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-zinc-400">Specialization:</span>
                              <Badge className="bg-zinc-800 text-zinc-300">{contract.freelancer.specialization}</Badge>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-center border-t border-zinc-800 pt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                              onClick={() => setShowProfileDialog(true)}
                            >
                              <Handshake className="h-4 w-4" />
                              <span>View Public Profile</span>
                            </Button>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
