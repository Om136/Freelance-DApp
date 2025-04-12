"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, BarChart2, Calendar, Clock, MessageSquare, Paperclip, Send } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

interface OngoingJob {
  id: string
  title: string
  freelancer: {
    name: string
    avatar: string
  }
  startDate: string
  deadline: string
  budget: number
  progress: number
  status: "In Progress" | "Under Review" | "Revision"
  description: string
  milestones: {
    id: string
    title: string
    deadline: string
    status: "Completed" | "In Progress" | "Pending"
    deliverables?: string[]
  }[]
  activities: {
    id: string
    type: "update" | "milestone" | "message"
    content: string
    timestamp: string
  }[]
}

export default function OngoingJobDetailsPage() {
  const params = useParams()
  const [job, setJob] = useState<OngoingJob | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  // Mock data
  const mockJob: OngoingJob = {
    id: params.jobId as string,
    title: "NFT Marketplace Development",
    freelancer: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png"
    },
    startDate: "2024-01-10",
    deadline: "2024-02-10",
    budget: 5000,
    progress: 75,
    status: "In Progress",
    description: "Development of a full-featured NFT marketplace with minting capabilities...",
    milestones: [
      {
        id: "1",
        title: "Smart Contract Development",
        deadline: "2024-01-20",
        status: "Completed",
        deliverables: ["Contract Code", "Test Cases", "Audit Report"]
      },
      {
        id: "2",
        title: "Frontend Integration",
        deadline: "2024-01-30",
        status: "In Progress",
        deliverables: ["UI Components", "Web3 Integration"]
      },
      {
        id: "3",
        title: "Testing & Deployment",
        deadline: "2024-02-10",
        status: "Pending"
      }
    ],
    activities: [
      {
        id: "1",
        type: "milestone",
        content: "Completed Smart Contract Development milestone",
        timestamp: "2024-01-20"
      },
      {
        id: "2",
        type: "update",
        content: "Frontend integration is 60% complete",
        timestamp: "2024-01-25"
      },
      {
        id: "3",
        type: "message",
        content: "Need clarification on the minting process",
        timestamp: "2024-01-26"
      }
    ]
  }

  useEffect(() => {
    const fetchJob = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setJob(mockJob)
      setLoading(false)
    }
    fetchJob()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!job) {
    return <div className="flex items-center justify-center h-screen">Job not found</div>
  }

  return (
    <div className="w-full min-h-screen bg-[#0F0F13] text-zinc-200">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-800 bg-[#0F0F13]/80 px-6 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Link href="/ongoingjobs" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Ongoing Jobs</span>
          </Link>
          <Separator orientation="vertical" className="h-6 bg-zinc-800" />
          <h1 className="text-xl font-semibold">{job.title}</h1>
        </div>
      </header>

      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Badge 
                      variant="outline"
                      className={
                        job.status === "In Progress" ? "bg-blue-500/10 text-blue-500" :
                        job.status === "Under Review" ? "bg-yellow-500/10 text-yellow-500" :
                        "bg-purple-500/10 text-purple-500"
                      }
                    >
                      {job.status}
                    </Badge>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-zinc-400" />
                        <span>Started: {new Date(job.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-zinc-400" />
                        <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-500">${job.budget}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Overall Progress</span>
                    <span className="font-medium">{job.progress}%</span>
                  </div>
                  <Progress value={job.progress} className="bg-zinc-800" />
                </div>
                <p className="text-zinc-400">{job.description}</p>
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <h2 className="text-xl font-semibold">Milestones & Deliverables</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="border border-zinc-800 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{milestone.title}</h3>
                        <p className="text-sm text-zinc-400">
                          Due: {new Date(milestone.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge 
                        variant="outline"
                        className={
                          milestone.status === "Completed" ? "bg-emerald-500/10 text-emerald-500" :
                          milestone.status === "In Progress" ? "bg-blue-500/10 text-blue-500" :
                          "bg-zinc-500/10 text-zinc-500"
                        }
                      >
                        {milestone.status}
                      </Badge>
                    </div>
                    {milestone.deliverables && (
                      <div className="space-y-2">
                        <p className="text-sm text-zinc-400">Deliverables:</p>
                        <div className="flex gap-2 flex-wrap">
                          {milestone.deliverables.map((item) => (
                            <Badge key={item} variant="secondary">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Activity Timeline */}
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <h2 className="text-xl font-semibold">Recent Activity</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {job.activities.map((activity) => (
                    <div key={activity.id} className="flex gap-4">
                      <div className="mt-1">
                        {activity.type === "milestone" && <BarChart2 className="h-4 w-4 text-emerald-500" />}
                        {activity.type === "update" && <MessageSquare className="h-4 w-4 text-blue-500" />}
                        {activity.type === "message" && <MessageSquare className="h-4 w-4 text-purple-500" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">{activity.content}</p>
                        <p className="text-xs text-zinc-400">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Communication */}
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <h2 className="text-xl font-semibold">Communication</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button variant="outline" className="gap-2">
                    <Paperclip className="h-4 w-4" />
                    Add Files
                  </Button>
                  <Button className="gap-2 bg-emerald-500 text-black hover:bg-emerald-600">
                    Schedule Call
                  </Button>
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border-zinc-800 bg-zinc-900 focus-visible:ring-emerald-500/50"
                  />
                  <Button className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
