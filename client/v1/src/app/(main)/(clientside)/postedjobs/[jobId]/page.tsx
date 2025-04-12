"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Calendar, DollarSign, Users } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface JobDetails {
  id: string
  title: string
  description: string
  category: string
  budget: number
  status: string
  createdAt: string
  skills: string[]
}

interface Applicant {
  id: string
  name: string
  email: string
  experience: string
  appliedDate: string
  status: string
}

export default function JobDetailsPage() {
  const params = useParams()
  const [job, setJob] = useState<JobDetails | null>(null)
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data
  const mockJob: JobDetails = {
    id: params.jobId as string,
    title: "Smart Contract Developer",
    description: "We are looking for an experienced Smart Contract Developer to join our team. The ideal candidate will have strong experience in Solidity and blockchain development.",
    category: "Development",
    budget: 5000,
    status: "Active",
    createdAt: "2024-01-15",
    skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js"]
  }

  const mockApplicants: Applicant[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      experience: "5 years",
      appliedDate: "2024-01-16",
      status: "Under Review"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      experience: "3 years",
      appliedDate: "2024-01-17",
      status: "Shortlisted"
    }
  ]

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setJob(mockJob)
      setApplicants(mockApplicants)
      setLoading(false)
    }
    fetchData()
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
          <Link href="/postedjobs" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Jobs</span>
          </Link>
          <Separator orientation="vertical" className="h-6 bg-zinc-800" />
          <h1 className="text-xl font-semibold">Job Details</h1>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Job Details Card */}
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{job.title}</h2>
                <div className="flex gap-2">
                  <Badge variant="outline">{job.category}</Badge>
                  <Badge variant="default" className="bg-emerald-500">{job.status}</Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-emerald-500">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-xl font-bold">${job.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-zinc-400">{job.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applicants Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Applicants</h2>
            </div>
            <Badge variant="outline">{applicants.length} Total</Badge>
          </div>

          <Card className="border-zinc-800 bg-zinc-900/50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell>{applicant.name}</TableCell>
                    <TableCell>{applicant.email}</TableCell>
                    <TableCell>{applicant.experience}</TableCell>
                    <TableCell>{new Date(applicant.appliedDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{applicant.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-emerald-500 hover:text-emerald-400"
                      >
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  )
}
