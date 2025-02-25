'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import { usePage } from '~/hooks/usePage'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu
} from '~/components/ui/sidebar'
import SidebarHeaderSection from '~/components/hoc/WithSidebar/SidebarHeaderSection'
import { cn } from '~/libs/utils'

interface IWithSidebarProps {
  children: Readonly<React.ReactNode>
  label: string
}

const WithSidebar = ({ children, label }: IWithSidebarProps) => {
  const [autoAnimateRef] = useAutoAnimate()

  const { isAdminPage, isCategoriesPage } = usePage()

  return (
    <Sidebar
      collapsible="icon"
      className="!absolute h-full overflow-hidden !border-0"
    >
      <SidebarHeaderSection
        sidebarType={{
          isAdmin: isAdminPage,
          isCategory: isCategoriesPage
        }}
      />

      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup className={cn(isCategoriesPage && 'px-4 py-6')}>
          <SidebarGroupLabel className="mb-4 text-base">
            {label}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu
              ref={autoAnimateRef}
              className={cn(isCategoriesPage && 'gap-3')}
            >
              {children}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default WithSidebar
