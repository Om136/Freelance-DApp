"use client"

import { useState } from "react"
import {
  ArrowLeft,
  DollarSign,
  HelpCircle,
  Info,
  PlusCircle,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"

// Import our custom sidebar component
// import AppSidebar from "@/components/AppSidebar"

export default function PostJobPage() {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [budget, setbudget] = useState<string>("")
  // const [maxBudget, setMaxBudget] = useState<string>("")
  // const [duration, setDuration] = useState<string>("")
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState<string>("")

  const addSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      const response = await fetch('http://localhost:8080/user/recruiter/addJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          tags:category,
          budget: Number(budget),
          skills
        })
      });

      if (!response.ok) {
        throw new Error('Failed to post job');
      }

      const data = await response.json();
      alert("Job posted successfully!");
      // Optionally redirect or clear form
    } catch (error) {
      console.error('Error posting job:', error);
      alert("Failed to post job. Please try again.");
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#0F0F13] text-zinc-200">
      <div className="w-full">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-800 bg-[#0F0F13]/80 px-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
            <Separator orientation="vertical" className="h-6 bg-zinc-800" />
            <h1 className="text-xl font-semibold">Post a New Job</h1>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-full border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Posting Guide</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="w-80 bg-zinc-900 border-zinc-800 p-4">
                <p className="text-sm">
                  Create a detailed job listing to attract the best Web3 talent. Be specific about requirements and include a fair budget range.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </header>

        <main className="mx-auto max-w-4xl p-6">
          <form onSubmit={handleSubmit}>
            <Card className="mb-6 border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <h2 className="text-lg font-medium">Job Details</h2>
                <p className="text-sm text-zinc-400">
                  Provide comprehensive information about the job to attract qualified freelancers
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-zinc-300">
                    Job Title <span className="text-emerald-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Smart Contract Developer for DeFi Project"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="border-zinc-800 bg-zinc-900 focus-visible:ring-emerald-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-zinc-300">
                    Job Description <span className="text-emerald-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the project, objectives, and specific requirements..."
                    rows={6}
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="border-zinc-800 bg-zinc-900 focus-visible:ring-emerald-500/50"
                  />
                  <p className="text-xs text-zinc-500">
                    Include details about the project, required deliverables, and any specific technologies or standards.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-zinc-300">
                    Category <span className="text-emerald-500">*</span>
                  </Label>
                  <Select required value={category} onValueChange={setCategory}>
                    <SelectTrigger className="border-zinc-800 bg-zinc-900 focus-visible:ring-emerald-500/50">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="border-zinc-800 bg-zinc-900">
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Consulting">Consulting</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-zinc-300">
                      Budget <span className="text-emerald-500">*</span>
                    </Label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          type="number"
                          placeholder="Min"
                          required
                          value={budget}
                          onChange={e => setbudget(e.target.value)}
                          className="pl-9 border-zinc-800 bg-zinc-900 focus-visible:ring-emerald-500/50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                className="gap-2 border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              >
                <span>Save as Draft</span>
                <Save className="h-4 w-4" />
              </Button>
              
              <div className="space-x-2">
                <Button 
                  type="button" 
                  variant="outline"
                  className="gap-2 border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Cancel</span>
                </Button>
                
                <Button 
                  type="submit"
                  className="gap-2 bg-emerald-500 text-black hover:bg-emerald-600"
                >
                  <span>Post Job</span>
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}