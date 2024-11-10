'use client'

import { usePathname } from 'next/navigation'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu
} from '~/components/ui/sidebar'
import AdminSidebarHeader from '~/components/Sidebars/AdminSidebar/AdminSidebarHeader'
import AdminSidebarItem from '~/components/Sidebars/AdminSidebar/AdminSidebarItem'
import { adminDashboard } from '~/utils/constants/data'

const AdminSidebar = () => {
  const [autoAnimateRef] = useAutoAnimate()

  const pathname = usePathname()

  return (
    <Sidebar
      collapsible="icon"
      className="!absolute h-full overflow-hidden !border-0"
    >
      <AdminSidebarHeader />

      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup className="py-6">
          <SidebarGroupLabel className="mb-4 text-base">
            Overview
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu ref={autoAnimateRef}>
              {!!adminDashboard?.length &&
                adminDashboard?.map((item) => {
                  const isActive = pathname === item?.path

                  return (
                    <AdminSidebarItem
                      key={item?.title}
                      dashboardItem={item}
                      isActive={isActive}
                    />
                  )
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AdminSidebar
