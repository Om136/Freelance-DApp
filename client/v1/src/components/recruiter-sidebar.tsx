"use client"

import { 
  BriefcaseBusiness, 
  Calendar, 
  Code2, 
  Compass, 
  Layers, 
  MessageSquare, 
  PlusCircle, 
  Settings, 
  User2, 
  Wallet 
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
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
  SidebarSeparator,
} from "@/components/ui/sidebar"

const AppSidebar = ({ userType = "freelancer", activePage = "" }) => {
  const isRecruiter = userType === "recruiter"

  return (
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
                <SidebarMenuButton isActive={activePage === "discover"}>
                  <Compass className={activePage === "discover" ? "text-emerald-500" : "text-zinc-400"} />
                  <span>Discover</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activePage === "jobs"}>
                  <BriefcaseBusiness className={activePage === "jobs" ? "text-emerald-500" : "text-zinc-400"} />
                  <span>Jobs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activePage === "messages"}>
                  <MessageSquare className={activePage === "messages" ? "text-emerald-500" : "text-zinc-400"} />
                  <span>Messages</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activePage === "payments"}>
                  <Wallet className={activePage === "payments" ? "text-emerald-500" : "text-zinc-400"} />
                  <span>Payments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activePage === "schedule"}>
                  <Calendar className={activePage === "schedule" ? "text-emerald-500" : "text-zinc-400"} />
                  <span>Schedule</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        
        {isRecruiter ? (
          <SidebarGroup>
            <Button variant="default" className="bg-emerald-500 hover:bg-emerald-600 w-full mb-2">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Post a Job
                </Button>
            <SidebarGroupLabel>Recruiter Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={activePage === "my-listings"}>
                    <BriefcaseBusiness className={activePage === "my-listings" ? "text-emerald-500" : "text-zinc-400"} />
                    <span>My Listings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={activePage === "applicants"}>
                    <User2 className={activePage === "applicants" ? "text-emerald-500" : "text-zinc-400"} />
                    <span>Applicants</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <SidebarGroup>
            <SidebarGroupLabel>My Work</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={activePage === "active-contracts"}>
                    <Code2 className={activePage === "active-contracts" ? "text-emerald-500" : "text-zinc-400"} />
                    <span>Active Contracts</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={activePage === "proposals"}>
                    <PlusCircle className={activePage === "proposals" ? "text-emerald-500" : "text-zinc-400"} />
                    <span>Proposals</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
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
            <p className="truncate text-sm font-medium">
              {isRecruiter ? "Crypto Ventures" : "Alex Johnson"}
            </p>
            <p className="truncate text-xs text-zinc-400">
              {isRecruiter ? "Recruiter" : "Web3 Developer"}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar