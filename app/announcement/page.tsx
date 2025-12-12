"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Announcement } from "@/components/announcement"

const companies = [
  { id: 1, companyId: "C001", name: "Tech Corp", description: "Technology company", status: "Active" as const },
  { id: 2, companyId: "C002", name: "Finance Ltd", description: "Financial services", status: "Active" as const },
  { id: 3, companyId: "C003", name: "Global Innovations Ltd.", description: "Innovation company", status: "Active" as const },
]

export default function AnnouncementPage() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-6">
          <Announcement companies={companies} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}