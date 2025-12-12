"use client"

import * as React from "react"
import {
  IconBuilding,
  IconCalendarTime,
  IconDashboard,
  IconFileReport,
  IconInnerShadowTop,
  IconSettings,
  IconSpeakerphone,
  IconUser,
  IconUserCheck,
  IconUsers,
} from "@tabler/icons-react"
import {
  ClipboardList,
  Calendar,
  PlaneTakeoff,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "John Doe",
    email: "john@company.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "A Company",
      url: "/company",
      icon: IconBuilding,
    },
    {
      title: "Designation",
      url: "/designation",
      icon: ClipboardList,
    },
    {
      title: "Role",
      url: "/role",
      icon: IconUserCheck,
    },
    {
      title: "Employee",
      url: "/employee",
      icon: IconUsers,
    },
    {
      title: "Announcement",
      url: "/announcement",
      icon: IconSpeakerphone,
    },
    {
      title: "Attendance",
      url: "/attendance",
      icon: Calendar,
    },
    {
      title: "Leave Management",
      url: "/leave-management",
      icon: PlaneTakeoff,
    },
    {
      title: "Interview",
      url: "/interview",
      icon: IconUser,
    },
  ],
  navSecondary: [
    {
      title: "Report Log",
      url: "/report-log",
      icon: IconFileReport,
    },
    {
      title: "Setting",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Profile",
      url: "#",
      icon: IconUser,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">HR Management</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
