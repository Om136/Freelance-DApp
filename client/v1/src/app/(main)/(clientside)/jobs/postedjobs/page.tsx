"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Edit, Eye, Trash2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Job {
  id: string
  title: string
  category: string
  budget: number
  status: string
  createdAt: string
}

export default function PostedJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const mockJobs: Job[] = [
    {
      id: "1",
      title: "Smart Contract Developer",
      category: "Development",
      budget: 5000,
      status: "Active",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      title: "UI/UX Designer for DeFi Platform",
      category: "Design",
      budget: 3000,
      status: "Active",
      createdAt: "2024-01-16"
    },
    {
      id: "3",
      title: "Blockchain Security Audit",
      category: "Security",
      budget: 8000,
      status: "Completed",
      createdAt: "2024-01-10"
    },
    {
      id: "4",
      title: "NFT Marketplace Developer",
      category: "Development",
      budget: 6000,
      status: "Active",
      createdAt: "2024-01-17"
    }
  ];

  useEffect(() => {
    // Simulate API call with mock data
    const fetchJobs = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setJobs(mockJobs);
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const handleDelete = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return

    try {
      const response = await fetch(`http://localhost:8080/user/recruiter/job/${jobId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete job')
      
      setJobs(jobs.filter(job => job.id !== jobId))
    } catch (err) {
      alert('Failed to delete job')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="w-full min-h-screen bg-[#0F0F13] text-zinc-200">
      <div className="w-full">
        <main className="p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <Card key={job.id} className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80 transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <Badge variant="outline" className="mt-2">
                      {job.category}
                    </Badge>
                  </div>
                  <Badge 
                    variant={job.status === 'Active' ? 'default' : 'secondary'}
                    className={job.status === 'Active' ? 'bg-emerald-500' : ''}
                  >
                    {job.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Budget</span>
                      <span className="font-medium">${job.budget}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Posted Date</span>
                      <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(job.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Link href={`/editjob/${job.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-zinc-400 hover:text-zinc-200"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <Link href={`/postedjobs/${job.id}`}>
                    <Button 
                      variant="default" 
                      className="gap-2 bg-emerald-500 text-black hover:bg-emerald-600"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
