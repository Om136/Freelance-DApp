"use client";

import { useEffect, useState } from "react";
import FreelanceDashboard from "@/components/freelanceDashboard";
import ClientDashboard from "@/components/clientDashboard";

// Define the Freelancer interface based on the backend data structure
interface Freelancer {
  name: string;
  description: string;
  experience: string;
  tags: string[];
  rating: number;
}

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const userRole = localStorage.getItem("role");
    setRole("client"); // This should be dynamically set based on user role

    // Fetch freelancers data from the backend
    if (role === "client") {
      fetchFreelancers();
    }

    setLoading(false);
  }, [role]);

  // Function to fetch freelancers from the backend API
  const fetchFreelancers = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/user/recruiter/getAllFreelancers"
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setFreelancers(data);
    } catch (err) {
      console.error("Failed to fetch freelancers:", err);
      setError("Failed to load freelancers. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      {role === "freelancer" && <FreelanceDashboard />}
      {role === "client" && (
        <ClientDashboard freelancersData={freelancers} error={error} />
      )}
      {!role && (
        <div className="flex justify-center items-center h-screen">
          Please login to view dashboard
        </div>
      )}
    </>
  );
}
