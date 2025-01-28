'use client'

import { usePathname } from 'next/navigation'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { UserRole } from '@prisma/client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu
} from '~/components/ui/sidebar'
import SidebarItemSection from '~/components/sidebars/SidebarItemSection'
import SidebarHeaderSection from '~/components/sidebars/SidebarHeaderSection'
import WithRole from '~/components/hoc/WithRole'
import { adminDashboard } from '~/utils/constants/data'

const AdminSidebar = () => {
  const [autoAnimateRef] = useAutoAnimate()

  const pathname = usePathname()

  return (
    <Sidebar
      collapsible="icon"
      className="!absolute h-full overflow-hidden !border-0"
    >
      <SidebarHeaderSection
        sidebarType={{ isAdmin: true, isCategory: false }}
      />

      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup className="py-6">
          <SidebarGroupLabel className="mb-4 text-base">
            Overview
          </SidebarGroupLabel>

          <WithRole allowedRole={UserRole.ADMIN}>
            <SidebarGroupContent>
              <SidebarMenu ref={autoAnimateRef}>
                {!!adminDashboard?.length &&
                  adminDashboard?.map((item) => {
                    const isActive = pathname === item?.path

                    return (
                      <SidebarItemSection
                        key={item?.title}
                        item={item}
                        isActive={isActive}
                      />
                    )
                  })}
              </SidebarMenu>
            </SidebarGroupContent>
          </WithRole>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AdminSidebar
