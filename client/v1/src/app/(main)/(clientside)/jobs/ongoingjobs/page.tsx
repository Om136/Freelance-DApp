"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Clock, Calendar, BarChart2 } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface OngoingJob {
  id: string
  title: string
  freelancer: string
  startDate: string
  deadline: string
  budget: number
  progress: number
  status: "In Progress" | "Under Review" | "Revision"
}

export default function OngoingJobsPage() {
  const [jobs, setJobs] = useState<OngoingJob[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for ongoing jobs
  const mockJobs: OngoingJob[] = [
    {
      id: "1",
      title: "NFT Marketplace Development",
      freelancer: "John Doe",
      startDate: "2024-01-10",
      deadline: "2024-02-10",
      budget: 5000,
      progress: 75,
      status: "In Progress"
    },
    {
      id: "2",
      title: "Smart Contract Integration",
      freelancer: "Jane Smith",
      startDate: "2024-01-15",
      deadline: "2024-02-15",
      budget: 3000,
      progress: 40,
      status: "Under Review"
    },
    {
      id: "3",
      title: "DeFi Dashboard Design",
      freelancer: "Mike Johnson",
      startDate: "2024-01-20",
      deadline: "2024-02-05",
      budget: 2000,
      progress: 90,
      status: "Revision"
    }
  ]

  useEffect(() => {
    const fetchJobs = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setJobs(mockJobs)
      setLoading(false)
    }
    fetchJobs()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="w-full min-h-screen bg-[#0F0F13] text-zinc-200">
      
      <main className="p-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <Link href={`/ongoingjobs/${job.id}`} key={job.id}>
              <Card className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80 transition-all cursor-pointer">
                <CardHeader className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{job.title}</h3>
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
                  </div>
                  <p className="text-sm text-zinc-400">Assigned to: {job.freelancer}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Progress</span>
                      <span className="font-medium">{job.progress}%</span>
                    </div>
                    <Progress value={job.progress} className="bg-zinc-800" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-zinc-400" />
                      <span>{new Date(job.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-zinc-400" />
                      <span>{new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-emerald-500 font-medium">${job.budget}</span>
                    <Button variant="ghost" className="gap-2">
                      <BarChart2 className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
