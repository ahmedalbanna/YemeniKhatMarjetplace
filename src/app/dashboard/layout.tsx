'use client'

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
        <Sidebar>
            <DashboardSidebar/>
        </Sidebar>
        <SidebarInset>
             <div className="p-4 sm:p-6 lg:p-8">
                 <div className="mb-4">
                     <SidebarTrigger />
                 </div>
                {children}
             </div>
        </SidebarInset>
    </SidebarProvider>
  )
}
