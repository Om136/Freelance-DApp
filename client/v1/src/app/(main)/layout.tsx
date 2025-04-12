"use client";

import AppSidebar from "@/components/recruiter-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role="freelancer"; // This should be dynamically set based on user role
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen bg-zinc-900 text-white">
          <SidebarProvider>
            <div className="flex w-full">
              {role === "freelancer" ? (
                <AppSidebar userType="freelancer" activePage="discover" />
              ) : (
                <AppSidebar userType="recruiter" activePage="jobs" />
              )}
              <main className="flex-1">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
