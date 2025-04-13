"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, DollarSign, Clock, Star, Globe, Send } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: string;
  created_at: string;
  tag: string;
}

export default function JobPage() {
  const { id } = useParams();
  const initialJobs = [
    {
      id: "1",
      title: "Sample Job",
      description: "This is a sample job description.",
      budget: 1000,
      status: "open",
      created_at: new Date().toISOString(),
      tag: "Development",
    },
    {
      id: "2",
      title: "UI/UX Designer",
      description: "Design a user-friendly interface for a mobile app.",
      budget: 2000,
      status: "open",
      created_at: new Date().toISOString(),
      tag: "Design",
    },
    {
      id: "3",
      title: "Blockchain Security Auditor",
      description: "Audit smart contracts for vulnerabilities.",
      budget: 3000,
      status: "open",
      created_at: new Date().toISOString(),
      tag: "Security",
    },
    {
      id: "4",
      title: "Crypto Consultant",
      description: "Provide insights on tokenomics and market strategies.",
      budget: 1500,
      status: "open",
      created_at: new Date().toISOString(),
      tag: "Consulting",
    },
  ];

  const [job, setJob] = useState(() => initialJobs.find(j => j.id === id) || null);
  const [proposal, setProposal] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/jobs");
        const jobs = await response.json();
        const foundJob = jobs.find((j: Job) => j.id === id);
        if (foundJob) {
          setJob(foundJob);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    }
    fetchJobs();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const accessToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          cv: proposal,
          budget: parseFloat(bidAmount),
          jobId: id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit proposal');
      }

      // Reset form
      setProposal('');
      setBidAmount('');
      
      // Optionally add success message or redirect
      alert('Proposal submitted successfully!');

    } catch (error) {
      console.error('Error submitting proposal:', error);
      alert('Failed to submit proposal. Please try again.');
    }
  };

  if (!job) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0F0F13] text-zinc-200">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Job not found</h2>
          <Link
            href="/dashboard"
            className="text-emerald-400 hover:text-emerald-300"
          >
            Return to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F13] text-zinc-200">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b border-zinc-800 bg-[#0F0F13]/80 px-6 backdrop-blur-sm">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Jobs</span>
        </Link>
      </header>

      <main className="container mx-auto max-w-6xl p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="h-full overflow-hidden border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-md hover:shadow-emerald-500/5">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
                      {job.tag}
                    </Badge>
                    <h3 className="text-lg font-semibold leading-tight group-hover:text-emerald-400">
                      {job.title}
                    </h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
                  {job.description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-zinc-400">
                    <DollarSign className="h-4 w-4 text-emerald-500" />
                    <span>${job.budget}</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <Clock className="h-4 w-4 text-emerald-500" />
                    <span>{new Date(job.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
              <Separator className="bg-zinc-800" />
              <CardFooter className="pt-4">
                <div className="flex w-full items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">Unknown Client</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <Globe className="h-3 w-3" />
                    <span>{job.status}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Card */}
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <h2 className="text-lg font-semibold">About the Client</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Unknown Client"
                    width={48}
                    height={48}
                    className="rounded-full border border-zinc-700"
                  />
                  <div>
                    <p className="font-medium">Unknown Client</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-zinc-400">
                        0 (0 jobs)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Proposal Card */}
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <h2 className="text-lg font-semibold">Submit a Proposal</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Proposal Description
                  </label>
                  <Textarea
                    placeholder="Describe how you can help with this project..."
                    className="min-h-[120px] resize-none rounded-md border-zinc-800 bg-zinc-900 text-sm text-zinc-200 focus-visible:ring-emerald-500/50"
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Your Bid Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="Enter your bid"
                      className="w-full rounded-md border border-zinc-800 bg-zinc-900 py-2 pl-8 pr-4 text-sm text-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/50"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  className="w-full bg-emerald-500 hover:bg-emerald-600" 
                  onClick={handleSubmit}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit Proposal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
