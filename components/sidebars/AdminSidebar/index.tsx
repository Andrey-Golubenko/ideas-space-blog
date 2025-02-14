'use client'

import { usePathname } from 'next/navigation'

import SidebarMenuSection from '~/components/sidebars/SidebarMenuSection'
import WithSidebar from '~/components/hoc/WithSidebar'
import { adminDashboard } from '~/utils/constants/data'

const AdminSidebar = () => {
  const pathname = usePathname()

  return (
    <WithSidebar label="Overview">
      {!!adminDashboard?.length &&
        adminDashboard?.map((item) => {
          const isActive = pathname === item?.path

          return (
            <SidebarMenuSection
              key={item?.title}
              item={item}
              isActive={isActive}
            />
          )
        })}
    </WithSidebar>
  )
}

export default AdminSidebar
