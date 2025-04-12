"use client";

import AppSidebar from "@/components/recruiter-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen flex-col bg-zinc-900 text-white">
        <SidebarProvider>
          <AppSidebar userType="recruiter" activePage="jobs" />
          <div className="flex flex-1">{children}</div>
        </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
