import Link from 'next/link'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { type Categories } from '@prisma/client'

import {
  SidebarMenuButton,
  SidebarMenuItem
} from '~/components/ui/sidebar'
import SidebarImage from '~/components/sidebars/SidebarImage'
import { PATHS } from '~/utils/constants'
import { type TAdminSidebarItem } from '~/types'

interface ISidebarItemProps {
  item: Categories | TAdminSidebarItem
  isActive: boolean
}

const SidebarItemSection = ({ item, isActive }: ISidebarItemProps) => {
  const isCategory = item && 'id' in item

  const itemLink = isCategory
    ? `${PATHS.categories}/${item?.slug}`
    : item?.path

  const itemImage = isCategory ? (
    <SidebarImage imageUrl={item?.imageUrl as string} />
  ) : (
    item?.icon && <item.icon />
  )

  const itemTitle = isCategory ? item?.name : item?.title

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className="size-10 h-max group-data-[collapsible=icon]:mb-4"
        tooltip={itemTitle}
        size={`${isCategory ? 'lg' : 'default'}`}
      >
        <Link
          href={itemLink}
          className={`w-full gap-3 overflow-hidden text-base group-data-[collapsible=icon]:${isCategory ? '!size-10' : '!size-8'} ${isActive ? 'bg-[rgb(244,244,244)] !text-black ' : ''}`}
        >
          {itemImage}

          <span>{itemTitle}</span>

          <ChevronRightIcon className="bg !sizes-[20px] ml-auto" />
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default SidebarItemSection
