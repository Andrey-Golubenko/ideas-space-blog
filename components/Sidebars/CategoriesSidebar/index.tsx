'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import useStore from '~/store'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu
} from '~/components/ui/sidebar'
import CategoriesSidebarHeader from '~/components/Sidebars/CategoriesSidebar/CategoriesSidebarHeader'
import CategoriesSidebarItem from '~/components/Sidebars/CategoriesSidebar/CategoriesSidebarItem'

const CategoriesSidebar = () => {
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
    <Sidebar
      collapsible="icon"
      className="!absolute h-full overflow-hidden !border-0"
    >
      <CategoriesSidebarHeader />

      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup className="px-4 py-6">
          <SidebarGroupLabel className="mb-4 text-base">
            Categories
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu ref={autoAnimateRef}>
              {!!categories?.length &&
                categories?.map((category) => {
                  const isActive = params?.slug === category?.slug

                  return (
                    <CategoriesSidebarItem
                      key={category?.id}
                      category={category}
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

export default CategoriesSidebar
