"use client"

import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function JobsLayout({
  children,
  posted,
  ongoing,
  completed,
}: {
  children: React.ReactNode
  posted: React.ReactNode
  ongoing: React.ReactNode
  completed: React.ReactNode
}) {
  const pathname = usePathname()
  const currentTab = pathname.includes('posted') ? 'posted' : 
                    pathname.includes('ongoing') ? 'ongoing' : 
                    pathname.includes('completed') ? 'completed' : 
                    'overview'

  return (
    <div className="w-full min-h-screen bg-[#0F0F13] text-zinc-200">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-800 bg-[#0F0F13]/80 px-6 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          <Separator orientation="vertical" className="h-6 bg-zinc-800" />
          <h1 className="text-xl font-semibold">My Jobs</h1>
        </div>
        <Link href="/newjob">
          <Button className="gap-2 bg-emerald-500 text-black hover:bg-emerald-600">
            <Plus className="h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </header>

      <main className="p-6">
        <Tabs defaultValue={currentTab} className="space-y-6">
          <TabsList className="bg-zinc-900/50 border-zinc-800">
            <Link href="/jobs">
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </Link>
            <Link href="/jobs/postedjobs">
              <TabsTrigger value="posted">All Jobs</TabsTrigger>
            </Link>
            <Link href="/jobs/ongoingjobs">
              <TabsTrigger value="ongoing">Ongoing Jobs</TabsTrigger>
            </Link>
            <Link href="/jobs/completed">
              <TabsTrigger value="completed">Completed Jobs</TabsTrigger>
            </Link>
          </TabsList>
          <TabsContent value="posted">{children}</TabsContent>
          <TabsContent value="ongoing">{children}</TabsContent>
          <TabsContent value="completed">{completed}</TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
