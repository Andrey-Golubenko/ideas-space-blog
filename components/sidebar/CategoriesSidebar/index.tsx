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
import SidebarItemSection from '~/components/sidebar/SidebarItemSection'
import SidebarHeaderSection from '~/components/sidebar/SidebarHeaderSection'

const CategoriesSidebar = () => {
  const [categories, getAllCategories] = useStore((state) => {
    return [state.categories, state.getAllCategories]
  })

  useEffect(() => {
    getAllCategories()
  }, [])

  const params = useParams()

  const [autoAnimateRef] = useAutoAnimate()

  return (
    <Sidebar
      collapsible="icon"
      className="!absolute h-full overflow-hidden !border-0"
    >
      <SidebarHeaderSection
        sidebarType={{ isAdmin: false, isCategory: true }}
      />

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
                    <SidebarItemSection
                      key={category?.id}
                      item={category}
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
