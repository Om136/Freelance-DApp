"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpDown,
  BriefcaseBusiness,
  ChevronDown,
  Clock,
  DollarSign,
  Filter,
  Globe,
  Search,
  User2,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Job {
  id: string; // Added id property
  title: string;
  description: string;
  budget: number;
  status: string;
  created_at: string;
  tag: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/profile-set");
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1", // Added unique id
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
  ]);
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/jobs"); // Replace with your API endpoint
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    }
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag =
      selectedTag === "all" || job.tag.toLowerCase() === selectedTag.toLowerCase();

    return matchesSearch && matchesTag;
  });

  return (
    <div className="flex flex-col w-full h-full bg-[#0F0F13] text-zinc-200">
      <div className="flex-1">
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
              onValueChange={setSelectedTag}
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
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                onClick={handleClick}
              >
                <User2 className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
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
              </Link>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="mt-12 flex flex-col items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 p-12 text-center">
              <BriefcaseBusiness className="mb-4 h-12 w-12 text-zinc-700" />
              <h3 className="mb-2 text-xl font-medium">No jobs found</h3>
              <p className="mb-6 text-zinc-400">
                Try adjusting your search or filters to find what you&apos;re looking
                for.
              </p>
              <Button
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
