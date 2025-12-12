"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { Employee } from "@/components/employee"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

// Sample data - in a real app, this would come from an API or database
const companies = [
  { id: 1, companyId: 'COM-001', name: 'TechCorp Solutions', description: 'Technology company', status: 'Active' as const },
  { id: 2, companyId: 'COM-002', name: 'Global Innovations Ltd', description: 'Consulting firm', status: 'Active' as const },
  { id: 3, companyId: 'COM-003', name: 'DataFlow Systems', description: 'Data analytics', status: 'Active' as const },
  { id: 4, companyId: 'COM-004', name: 'Legacy Corp', description: 'Manufacturing company', status: 'Inactive' as const },
  { id: 5, companyId: 'COM-005', name: 'StartupTech Inc', description: 'Startup technology', status: 'Active' as const },
  { id: 6, companyId: 'COM-006', name: 'Data Analytics Pro', description: 'Data analytics services', status: 'Active' as const },
]

const designations = [
  { id: 1, designationId: 'DES-001', title: 'Software Engineer', description: 'Develops software applications', companyId: 1, status: 'Active' as const },
  { id: 2, designationId: 'DES-002', title: 'Project Manager', description: 'Manages project timelines', companyId: 1, status: 'Active' as const },
  { id: 3, designationId: 'DES-003', title: 'Business Analyst', description: 'Analyzes business requirements', companyId: 2, status: 'Active' as const },
  { id: 4, designationId: 'DES-004', title: 'Data Scientist', description: 'Analyzes complex data sets', companyId: 2, status: 'Active' as const },
  { id: 5, designationId: 'DES-005', title: 'HR Manager', description: 'Manages human resources', companyId: 3, status: 'Active' as const },
  { id: 6, designationId: 'DES-006', title: 'DevOps Engineer', description: 'Manages deployment and infrastructure', companyId: 3, status: 'Active' as const },
  { id: 7, designationId: 'DES-007', title: 'Quality Assurance', description: 'Tests software quality', companyId: 1, status: 'Active' as const },
  { id: 8, designationId: 'DES-008', title: 'Data Analyst', description: 'Analyzes business data', companyId: 6, status: 'Active' as const },
]

export default function EmployeePage() {
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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 p-4 lg:p-6">
            <Employee companies={companies} designations={designations} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}