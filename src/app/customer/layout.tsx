'use client'

import { CustomerSidebar } from "@/components/customer/sidebar";
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <Sidebar>
                <CustomerSidebar />
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
