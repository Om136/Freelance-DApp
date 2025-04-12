"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import {
  ArrowUpDown,
  BriefcaseBusiness,
  Calendar,
  ChevronDown,
  Clock,
  Code2,
  Compass,
  CreditCard,
  DollarSign,
  Filter,
  Globe,
  Layers,
  MessageSquare,
  Search,
  Settings,
  Star,
  User2,
  Wallet,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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

// Sample job data
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
    description: "Need a security expert to audit our NFT marketplace smart contracts before mainnet deployment.",
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
    description: "Seeking an expert to design and document our project's tokenomics model and distribution strategy.",
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
    description: "Implement a yield farming protocol with multiple pools and reward mechanisms on Ethereum.",
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
]



export default function DashboardPage() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/profile-set"); // replace with your route
  };
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || job.category.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#0F0F13] text-zinc-200">
      <SidebarProvider>
        <div className="flex h-screen overflow-hidden">
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
                      <SidebarMenuButton>
                        <Compass className="text-zinc-400" />
                        <span>Discover</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <BriefcaseBusiness className="text-emerald-500" />
                        <span>Jobs</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <MessageSquare className="text-zinc-400" />
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
                  <p className="truncate text-xs text-zinc-400">
                    Web3 Developer
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-400"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>

          <div className="flex-1 overflow-auto">
            <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-800 bg-[#0F0F13]/80 px-6 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Available Jobs</h1>
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                >
                  {jobs.length} Opportunities
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <Input
                    type="search"
                    placeholder="Search jobs..."
                    className="w-[250px] rounded-full border-zinc-800 bg-zinc-900 pl-10 text-sm focus-visible:ring-emerald-500/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleClick}
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-full border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                >
                  <User2 className="h-4 w-4" />
                  <span>Profile</span>
                </Button>
              </div>
            </header>

            <main className="p-6">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Tabs
                  defaultValue="all"
                  className="w-full sm:w-auto"
                  onValueChange={setSelectedCategory}
                >
                  <TabsList className="bg-zinc-900">
                    <TabsTrigger value="all">All Jobs</TabsTrigger>
                    <TabsTrigger value="Development">Development</TabsTrigger>
                    <TabsTrigger value="Design">Design</TabsTrigger>
                    <TabsTrigger value="Security">Security</TabsTrigger>
                    <TabsTrigger value="Consulting">Consulting</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                      >
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-zinc-900 border-zinc-800"
                    >
                      <DropdownMenuItem>Highest Budget</DropdownMenuItem>
                      <DropdownMenuItem>Newest First</DropdownMenuItem>
                      <DropdownMenuItem>Lowest Proposals</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Sort</span>
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job) => (
                  <Link href={`/job/${job.id}`} key={job.id} className="group">
                    <Card className="h-full overflow-hidden border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-md hover:shadow-emerald-500/5">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <Badge className="mb-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
                              {job.category}
                            </Badge>
                            <h3 className="text-lg font-semibold leading-tight group-hover:text-emerald-400">
                              {job.title}
                            </h3>
                          </div>
                          <Badge
                            variant="outline"
                            className="border-zinc-700 bg-zinc-800 text-zinc-400"
                          >
                            {job.proposals} proposals
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
                          {job.description}
                        </p>
                        <div className="mb-4 flex flex-wrap gap-1">
                          {job.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1 text-zinc-400">
                            <DollarSign className="h-4 w-4 text-emerald-500" />
                            <span>{job.budget}</span>
                          </div>
                          <div className="flex items-center gap-1 text-zinc-400">
                            <Clock className="h-4 w-4 text-emerald-500" />
                            <span>{job.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                      <Separator className="bg-zinc-800" />
                      <CardFooter className="pt-4">
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Image
                              src={job.client.avatar || "/placeholder.svg"}
                              alt={job.client.name}
                              width={28}
                              height={28}
                              className="rounded-full border border-zinc-700"
                            />
                            <div>
                              <p className="text-xs font-medium">
                                {job.client.name}
                              </p>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <span className="text-xs text-zinc-400">
                                  {job.client.rating} ({job.client.jobs} jobs)
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-zinc-500">
                            <Globe className="h-3 w-3" />
                            <span>{job.postedDate}</span>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>

              {filteredJobs.length === 0 && (
                <div className="mt-12 flex flex-col items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 p-12 text-center">
                  <BriefcaseBusiness className="mb-4 h-12 w-12 text-zinc-700" />
                  <h3 className="mb-2 text-xl font-medium">No jobs found</h3>
                  <p className="mb-6 text-zinc-400">
                    Try adjusting your search or filters to find what you're
                    looking for.
                  </p>
                  <Button
                    variant="outline"
                    className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
