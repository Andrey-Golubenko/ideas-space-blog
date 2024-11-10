import Link from 'next/link'
import { ChevronRightIcon } from '@radix-ui/react-icons'

import {
  SidebarMenuButton,
  SidebarMenuItem
} from '~/components/ui/sidebar'
import { IAdminSidebarItem } from '~/types/types'

interface IAdminSidebarItemProps {
  dashboardItem: IAdminSidebarItem
  isActive: boolean
}

const AdminSidebarItem = ({
  dashboardItem,
  isActive
}: IAdminSidebarItemProps) => {
  const { title, icon: Icon, path } = dashboardItem

  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton
        asChild
        className="size-10 h-max group-data-[collapsible=icon]:mb-4"
        tooltip={title}
      >
        <Link
          href={`${path}`}
          className={`w-full gap-3 overflow-hidden text-base group-data-[collapsible=icon]:!size-8 ${isActive ? 'bg-[rgb(237,237,237)] !text-black ' : ''}`}
        >
          <Icon />

          <span>{title}</span>

          <ChevronRightIcon className="bg ml-auto !h-[20px] !w-[20px]" />
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default AdminSidebarItem
