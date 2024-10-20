'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ChevronRightIcon } from '@radix-ui/react-icons'

import useStore from '~/store'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '~/components/ui/sidebar'
import Link from 'next/link'
import { PATHS } from '~/utils/constants/constants'
import SidebarImage from './SidebarImage'

const CategorySidebar = () => {
  const [categories, getAllCategories] = useStore((state) => {
    return [state.categories, state.getAllCategories]
  })

  useEffect(() => {
    if (!categories?.length) {
      getAllCategories()
    }
  }, [])

  const params = useParams()

  const [autoAnimateRef] = useAutoAnimate()

  return (
    <Sidebar className="!absolute h-full !border-0">
      <SidebarContent>
        <SidebarGroup className="px-4 py-6">
          <SidebarGroupLabel className="mb-4 text-base">
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {!!categories?.length &&
                categories?.map((category) => {
                  const isActive = params?.slug === category?.slug

                  return (
                    <SidebarMenuItem key={category?.id}>
                      <SidebarMenuButton
                        asChild
                        className="h-max"
                      >
                        <Link
                          href={`${PATHS.categories}/${category?.slug}`}
                          className={`gap-3 text-base ${isActive ? 'bg-[rgb(244,244,244)] !text-black ' : ''}`}
                        >
                          <SidebarImage
                            imageUrl={category?.imageUrl as string}
                            ref={autoAnimateRef}
                          />

                          <span>{category?.name}</span>

                          <ChevronRightIcon className=" bg ml-auto !h-[20px] !w-[20px]" />
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default CategorySidebar
