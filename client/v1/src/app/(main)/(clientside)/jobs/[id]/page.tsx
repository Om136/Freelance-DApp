"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Building2, MapPin, Clock, Calendar, Briefcase } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface JobDetail {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: number
  postedDate: string
  deadline: string
  status: "Open" | "Closed" | "In Progress"
  description: string
  requirements: string[]
  responsibilities: string[]
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<JobDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setJob({
          id: params.id,
          title: "Senior Blockchain Developer",
          company: "CryptoTech Solutions",
          location: "Remote",
          type: "Full-time",
          salary: 120000,
          postedDate: "2024-01-15",
          deadline: "2024-02-15",
          status: "Open",
          description: "We are seeking an experienced Blockchain Developer to join our team...",
          requirements: [
            "5+ years of experience in blockchain development",
            "Strong knowledge of Solidity and Smart Contracts",
            "Experience with Web3.js and Ethereum ecosystem",
            "Understanding of cryptography and security principles"
          ],
          responsibilities: [
            "Design and implement blockchain solutions",
            "Develop and deploy smart contracts",
            "Integrate blockchain with existing systems",
            "Perform code reviews and maintain documentation"
          ]
        })
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [params.id])

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
          <Link href="/jobs" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Jobs</span>
          </Link>
          <Separator orientation="vertical" className="h-6 bg-zinc-800" />
          <h1 className="text-xl font-semibold">{job.title}</h1>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold">{job.title}</h2>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Building2 className="h-4 w-4" />
                      <span>{job.company}</span>
                    </div>
                  </div>
                  <Badge 
                    variant="outline"
                    className={
                      job.status === "Open" ? "bg-emerald-500/10 text-emerald-500" :
                      job.status === "Closed" ? "bg-red-500/10 text-red-500" :
                      "bg-blue-500/10 text-blue-500"
                    }
                  >
                    {job.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-zinc-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-zinc-400" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-zinc-400" />
                    <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-zinc-400" />
                    <span>Deadline {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-emerald-500">
                    ${job.salary.toLocaleString()}
                  </span>
                  <span className="text-zinc-400">/year</span>
                </div>
              </div>

              <Separator className="bg-zinc-800" />

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Description</h3>
                <p className="text-zinc-400 leading-relaxed">{job.description}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-zinc-400">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Responsibilities</h3>
                <ul className="list-disc list-inside space-y-2 text-zinc-400">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>

              {job.status === "Open" && (
                <Button className="w-full bg-emerald-500 text-black hover:bg-emerald-600">
                  Apply Now
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
