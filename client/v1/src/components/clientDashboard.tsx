"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpDown,
  ChevronDown,
  Filter,
  Search,
  User2,
  Star,
  Code2,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Define the Freelancer interface
interface Freelancer {
  id?: string; // Added as optional since it might not be in the backend data
  name: string;
  description: string;
  experience: string;
  tags: string[];
  rating: number;
  title?: string;
  hourlyRate?: string;
  completedJobs?: number;
  avatar?: string;
  category?: string;
  available?: boolean;
}

interface ClientDashboardProps {
  freelancersData: Freelancer[];
  error: string | null;
}

// Sample freelancer data as fallback
const sampleFreelancers = [
  {
    id: "freelancer-1",
    name: "Alex Johnson",
    title: "Senior Blockchain Developer",
    description:
      "Specialized in DeFi protocols and smart contract development with 5+ years of experience.",
    hourlyRate: "$80-120",
    skills: ["Solidity", "React", "Node.js", "Web3.js"],
    rating: 4.9,
    completedJobs: 45,
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Development",
    available: true,
  },
  {
    id: "freelancer-2",
    name: "Sarah Chen",
    title: "UI/UX Designer",
    description:
      "Creative designer with expertise in blockchain and Web3 applications.",
    hourlyRate: "$60-90",
    skills: ["Figma", "UI/UX", "Web Design", "Branding"],
    rating: 4.7,
    completedJobs: 32,
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Design",
    available: true,
  },
  {
    id: "freelancer-3",
    name: "Mike Peters",
    title: "Smart Contract Auditor",
    description:
      "Security expert specializing in smart contract audits and penetration testing.",
    hourlyRate: "$100-150",
    skills: ["Security", "Solidity", "Auditing", "MetaMask"],
    rating: 4.8,
    completedJobs: 28,
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Security",
    available: false,
  },
  {
    id: "freelancer-4",
    name: "Emma Wilson",
    title: "DeFi Protocol Developer",
    description:
      "Expert in building decentralized finance protocols and yield farming platforms.",
    hourlyRate: "$90-130",
    skills: ["DeFi", "Solidity", "Web3.js", "React"],
    rating: 4.8,
    completedJobs: 38,
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Development",
    available: true,
  },
  {
    id: "freelancer-5",
    name: "David Kumar",
    title: "Blockchain Architect",
    description:
      "Specialized in designing scalable blockchain solutions and tokenomics.",
    hourlyRate: "$110-160",
    skills: ["Architecture", "Ethereum", "Polygon", "BSC"],
    rating: 4.9,
    completedJobs: 52,
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Development",
    available: true,
  },
  {
    id: "freelancer-6",
    name: "Lisa Chang",
    title: "Web3 Product Designer",
    description:
      "Creating intuitive interfaces for blockchain applications and DApps.",
    hourlyRate: "$70-100",
    skills: ["Product Design", "Figma", "Web3", "UI/UX"],
    rating: 4.7,
    completedJobs: 25,
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Design",
    available: true,
  },
];

export default function ClientDashboard({
  freelancersData,
  error,
}: ClientDashboardProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);

  // Set freelancers data when component mounts or when freelancersData changes
  useEffect(() => {
    if (freelancersData && freelancersData.length > 0) {
      // Map backend data to the format expected by the component
      const formattedFreelancers = freelancersData.map((freelancer, index) => ({
        ...freelancer,  
        id: `freelancer-${index + 1}`, // Generate an ID if not provided
        title: `${freelancer.experience} Developer`, // Generate a title based on experience
        hourlyRate: "$50-100", // Default hourly rate
        avatar: "/placeholder.svg?height=40&width=40", // Default avatar
        category:
          freelancer.tags && freelancer.tags.length > 0
            ? freelancer.tags[0]
            : "Development", // Use first tag as category
        available: true, // Default to available
        completedJobs: Math.floor(Math.random() * 50) + 1, // Random number of completed jobs
      }));

      setFreelancers(formattedFreelancers);
    } else {
      // Use sample data if no data is provided
      setFreelancers([]);
    }
  }, [freelancersData]);

  const filteredFreelancers = freelancers.filter((freelancer) => {
    const matchesSearch =
      freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      (freelancer.category &&
        freelancer.category.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  // Extract unique categories from freelancers for the tabs
  const categories = [
    "all",
    ...new Set(freelancers.map((f) => f.category || "Development")),
  ];

  return (
    <div className="flex flex-col w-full h-full bg-[#0F0F13] text-zinc-200">
      <div className="flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-800 bg-[#0F0F13]/80 px-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Available Freelancers</h1>
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            >
              {freelancers.length} Professionals
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                type="search"
                placeholder="Search freelancers..."
                className="w-[250px] rounded-full border-zinc-800 bg-zinc-900 pl-10 text-sm focus-visible:ring-emerald-500/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={() => router.push("/client-profile")}
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
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Tabs
              defaultValue="all"
              className="w-full sm:w-auto"
              onValueChange={setSelectedCategory}
            >
              <TabsList className="bg-zinc-900">
                {categories.slice(0, 4).map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category === "all" ? "All Freelancers" : category}
                  </TabsTrigger>
                ))}
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
                  <DropdownMenuItem>Highest Rated</DropdownMenuItem>
                  <DropdownMenuItem>Most Experience</DropdownMenuItem>
                  <DropdownMenuItem>Available Now</DropdownMenuItem>
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

          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredFreelancers.map((freelancer) => (
              <Link
                href={`/freelancer/${freelancer.id}`}
                key={freelancer.id}
                className="group"
              >
                <Card className="h-full overflow-hidden border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900">
                  <CardHeader className="pb-0 px-3 pt-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge className="mb-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
                          {freelancer.category || "Development"}
                        </Badge>
                        <h3 className="text-base font-semibold leading-tight group-hover:text-emerald-400">
                          {freelancer.title ||
                            `${freelancer.experience} Developer`}
                        </h3>
                      </div>
                      <Badge
                        variant="outline"
                        className={`border-zinc-700 ${
                          freelancer.available !== false
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {freelancer.available !== false
                          ? "Available"
                          : "Unavailable"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-1 px-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Image
                        src={
                          freelancer.avatar ||
                          "/placeholder.svg?height=40&width=40"
                        }
                        alt={freelancer.name}
                        width={32}
                        height={32}
                        className="rounded-full border border-zinc-700"
                      />
                      <div>
                        <p className="font-medium text-sm">{freelancer.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs text-zinc-400">
                            {freelancer.rating} ({freelancer.completedJobs || 0}{" "}
                            jobs)
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mb-1 line-clamp-2 text-xs text-zinc-400">
                      {freelancer.description}
                    </p>
                    <div className="mb-1 flex flex-wrap gap-1">
                      {(freelancer.tags || []).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs px-1.5 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-zinc-400">
                      <Code2 className="h-3 w-3 text-emerald-500" />
                      <span className="text-xs">
                        {freelancer.hourlyRate || "$50-100"}/hr
                      </span>
                    </div>
                  </CardContent>
                  <Separator className="bg-zinc-800" />
                  <CardFooter className="pt-1 px-3 pb-2">
                    <Button className="w-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 h-7 text-sm">
                      View Profile
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {filteredFreelancers.length === 0 && !error && (
            <div className="mt-12 flex flex-col items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 p-12 text-center">
              <Users className="mb-4 h-12 w-12 text-zinc-700" />
              <h3 className="mb-2 text-xl font-medium">No freelancers found</h3>
              <p className="mb-6 text-zinc-400">
                Try adjusting your search or filters to find what you&#39;re
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
  );
}
