"use client"

import * as React from "react"
import { type Icon } from "@tabler/icons-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: React.ComponentType<any>
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { state } = useSidebar()
  
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <TooltipProvider>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  {state === "collapsed" && (
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </TooltipProvider>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
