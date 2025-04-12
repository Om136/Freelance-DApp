"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Send,
  Star,
  Code2,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Temporarily using the same freelancer data
const freelancer = {
  id: "freelancer-1",
  name: "Alex Johnson",
  title: "Senior Blockchain Developer",
  description:
    "Specialized in DeFi protocols and smart contract development with 5+ years of experience.",
  hourlyRate: "$80-120",
  skills: ["Solidity", "React", "Node.js", "Web3.js"],
  rating: 4.9,
  completedJobs: 45,
  avatar: "/placeholder.svg?height=128&width=128",
  category: "Development",
  available: true,
  location: "San Francisco, CA",
  joinedDate: "January 2021",
  email: "alex.johnson@example.com",
};

export default function FreelancerProfile({ params }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages([...messages, { text: message, sender: "client" }]);
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-[#0F0F13] text-zinc-200">
      {/* Left Profile Section */}
      <div className="flex-1 overflow-auto p-6 border-r border-zinc-800 scrollbar-hide">
        <div className="mb-6">
          <Link
            href="/client-dashboard"
            className="inline-flex items-center text-zinc-400 hover:text-zinc-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="flex items-start gap-6 mb-8">
          <Image
            src={freelancer.avatar}
            alt={freelancer.name}
            width={128}
            height={128}
            className="rounded-lg border border-zinc-800"
          />
          <div>
            <h1 className="text-2xl font-bold mb-2">{freelancer.name}</h1>
            <h2 className="text-xl text-emerald-400 mb-2">
              {freelancer.title}
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <span className="text-zinc-400">
                {freelancer.rating} ({freelancer.completedJobs} jobs completed)
              </span>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-zinc-400">
                <MapPin className="h-4 w-4" />
                <span>{freelancer.location}</span>
              </div>
              <div className="flex items-center gap-1 text-zinc-400">
                <Calendar className="h-4 w-4" />
                <span>Member since {freelancer.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-zinc-400">{freelancer.description}</p>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Hourly Rate</h3>
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-emerald-500" />
                <span className="text-xl font-semibold">
                  {freelancer.hourlyRate}/hr
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Chat Section */}
      <div className="w-[400px] flex flex-col h-full border-l border-zinc-800">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold">Chat with {freelancer.name}</h2>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4 scrollbar-hide">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "client" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === "client"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-zinc-800 text-zinc-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-800">
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-zinc-900 border-zinc-800"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
