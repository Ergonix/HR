import { AppSidebar } from "@/components/app-sidebar"
import { StatsCards } from "@/components/stats-cards"
import { AttendanceChart } from "@/components/attendance-chart"
import { DepartmentChart } from "@/components/department-chart"
import { EmployeeTable } from "@/components/employee-table"
import { LeaveRequests } from "@/components/leave-requests"
import { RecentActivities } from "@/components/recent-activities"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

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
                <StatsCards />
              </div>
              
              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AttendanceChart />
                  <DepartmentChart />
                </div>
              </div>
              
              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2">
                    <EmployeeTable />
                  </div>
                  <LeaveRequests />
                </div>
              </div>
              
              <div className="px-4 lg:px-6">
                <RecentActivities />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
