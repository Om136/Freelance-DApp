"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  DollarSign,
  Clock,
  Star,
  Globe,
  Send,
  BriefcaseBusiness,
  Building,
  Calendar,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

// Using the same job data from the dashboard for consistency
const jobs = [
  {
    id: "job-1",
    title: "Full Stack Web3 Developer",
    description:
      "Looking for an experienced developer to build a DeFi dashboard with wallet integration and real-time data visualization.",
    budget: "$3,000 - $5,000",
    duration: "2-3 weeks",
    skills: ["React", "Solidity", "Web3.js", "Node.js"],
    client: {
      name: "CryptoVentures",
      rating: 4.8,
      jobs: 12,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    postedDate: "2 days ago",
    proposals: 8,
    category: "Development",
    status: "active",
  },
  {
    id: "job-2",
    title: "Smart Contract Auditor",
    description:
      "Need a security expert to audit our NFT marketplace smart contracts before mainnet deployment.",
    budget: "$2,500 - $4,000",
    duration: "1-2 weeks",
    skills: ["Solidity", "Security", "Auditing", "ERC-721"],
    client: {
      name: "NFT Collective",
      rating: 4.6,
      jobs: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    postedDate: "5 days ago",
    proposals: 12,
    category: "Security",
    status: "active",
  },
  {
    id: "job-3",
    title: "Blockchain UI/UX Designer",
    description:
      "Design a modern, intuitive interface for our decentralized exchange platform with focus on user experience.",
    budget: "$1,800 - $3,200",
    duration: "2 weeks",
    skills: ["UI/UX", "Figma", "Web3", "Design Systems"],
    client: {
      name: "DeFi Labs",
      rating: 4.9,
      jobs: 8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    postedDate: "1 week ago",
    proposals: 15,
    category: "Design",
    status: "active",
  },
  {
    id: "job-4",
    title: "Tokenomics Consultant",
    description:
      "Seeking an expert to design and document our project's tokenomics model and distribution strategy.",
    budget: "$4,000 - $6,000",
    duration: "3-4 weeks",
    skills: ["Tokenomics", "Economics", "Crypto", "Whitepaper"],
    client: {
      name: "Token Innovations",
      rating: 4.7,
      jobs: 3,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    postedDate: "3 days ago",
    proposals: 6,
    category: "Consulting",
    status: "active",
  },
  {
    id: "job-5",
    title: "Solidity Developer for DeFi Protocol",
    description:
      "Implement a yield farming protocol with multiple pools and reward mechanisms on Ethereum.",
    budget: "$5,000 - $8,000",
    duration: "1 month",
    skills: ["Solidity", "DeFi", "Yield Farming", "ERC-20"],
    client: {
      name: "Yield Protocol",
      rating: 4.5,
      jobs: 7,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    postedDate: "1 day ago",
    proposals: 10,
    category: "Development",
    status: "active",
  },
];

export default function JobPage() {
  const { id } = useParams();
  const [proposal, setProposal] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  const job = jobs.find((j) => j.id === id);

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
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <div className="flex flex-col gap-4">
                  <Badge className="w-fit bg-emerald-500/10 text-emerald-400">
                    {job.category}
                  </Badge>
                  <h1 className="text-2xl font-bold">{job.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-emerald-500" />
                      <span>{job.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-emerald-500" />
                      <span>{job.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4 text-emerald-500" />
                      <span>Posted {job.postedDate}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h2 className="mb-3 text-lg font-semibold">
                    Project Description
                  </h2>
                  <p className="text-zinc-400">{job.description}</p>
                </div>

                <div>
                  <h2 className="mb-3 text-lg font-semibold">
                    Required Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
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
                    src={job.client.avatar}
                    alt={job.client.name}
                    width={48}
                    height={48}
                    className="rounded-full border border-zinc-700"
                  />
                  <div>
                    <p className="font-medium">{job.client.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-zinc-400">
                        {job.client.rating} ({job.client.jobs} jobs)
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
                {/* <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Your Bid Amount
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your bid"
                    className="border-zinc-800 bg-zinc-900 focus-visible:ring-emerald-500/50"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                </div> */}
                <div>
                  <label className="mb-2 block text-sm text-zinc-400">
                    Proposal Details
                  </label>
                  <Textarea
                    placeholder="Write your proposal..."
                    className="min-h-[200px] border-zinc-800 bg-zinc-900 focus-visible:ring-emerald-500/50"
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                  />
                </div>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
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
