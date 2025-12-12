import { AppSidebar } from "@/components/app-sidebar"
import { ReportLog } from "@/components/report-log"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

const companies = [
  {
    id: 1,
    companyId: 'COMP-001',
    name: 'Tech Solutions Inc.',
    description: 'Leading technology solutions provider',
    status: 'Active' as const,
  },
  {
    id: 2,
    companyId: 'COMP-002',
    name: 'Global Innovations Ltd.',
    description: 'Innovation and research company',
    status: 'Active' as const,
  },
  {
    id: 3,
    companyId: 'COMP-003',
    name: 'Digital Ventures',
    description: 'Digital transformation specialists',
    status: 'Active' as const,
  },
];

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <ReportLog companies={companies} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}