import Link from 'next/link'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Categories } from '@prisma/client'

import {
  SidebarMenuButton,
  SidebarMenuItem
} from '~/components/ui/sidebar'
import SidebarImage from '~/components/Sidebars/SidebarImage'
import { PATHS } from '~/utils/constants/constants'

interface ICategoriesSidebarItemProps {
  category: Categories
  isActive: boolean
}

const CategoriesSidebarItem = ({
  category,
  isActive
}: ICategoriesSidebarItemProps) => {
  return (
    <SidebarMenuItem key={category?.id}>
      <SidebarMenuButton
        asChild
        className="size-10 h-max group-data-[collapsible=icon]:mb-4"
        tooltip={category?.name}
        size="lg"
      >
        <Link
          href={`${PATHS.categories}/${category?.slug}`}
          className={`w-full gap-3 overflow-hidden text-base group-data-[collapsible=icon]:!size-10 ${isActive ? 'bg-[rgb(244,244,244)] !text-black ' : ''}`}
        >
          <SidebarImage imageUrl={category?.imageUrl as string} />

          <span>{category?.name}</span>

          <ChevronRightIcon className="bg ml-auto !h-[20px] !w-[20px]" />
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default CategoriesSidebarItem
