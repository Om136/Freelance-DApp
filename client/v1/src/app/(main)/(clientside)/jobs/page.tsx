import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function JobsPage() {
  return (
    <div className="grid gap-4">
      <Link href="/jobs/posted" className="block">
        <Card className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80 transition-all cursor-pointer">
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">Posted Jobs</h3>
              <p className="text-sm text-zinc-400">View and manage your posted job listings</p>
            </div>
            <Button variant="ghost" className="gap-2">View All</Button>
          </CardContent>
        </Card>
      </Link>

      <Link href="/jobs/ongoing" className="block">
        <Card className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80 transition-all cursor-pointer">
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">Ongoing Jobs</h3>
              <p className="text-sm text-zinc-400">Track your active projects and collaborations</p>
            </div>
            <Button variant="ghost" className="gap-2">View All</Button>
          </CardContent>
        </Card>
      </Link>

      <Link href="/jobs/completed" className="block">
        <Card className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80 transition-all cursor-pointer">
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">Completed Jobs</h3>
              <p className="text-sm text-zinc-400">Review your completed projects and history</p>
            </div>
            <Button variant="ghost" className="gap-2">View All</Button>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
