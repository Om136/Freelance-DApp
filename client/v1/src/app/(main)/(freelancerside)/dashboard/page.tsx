"use client";

import { useEffect, useState } from "react";
import FreelanceDashboard from "@/components/freelanceDashboard";
import ClientDashboard from "@/components/clientDashboard";

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const userRole = localStorage.getItem("role");
    setRole("freelancer"); // This should be dynamically set based on user role
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {role === "freelancer" && <FreelanceDashboard />}
      {role === "client" && <ClientDashboard />}
      {!role && <div>Please login to view dashboard</div>}
    </>
  );
}
