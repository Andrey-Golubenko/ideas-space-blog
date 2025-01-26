'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import useGlobalStore from '~/store'
import { useDataCategories } from '~/hooks/useDataCategories'
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

const CategoriesSidebar = () => {
  const [categories] = useGlobalStore((state) => {
    return [state.categories, state.categoriesCount, state.isLoading]
  })

  const noItems = typeof categories === 'string'
  const displayedCategories = noItems ? [] : categories

  const dataCategoriesProps = useMemo(() => {
    return {
      page: 1,
      limit: 12
    }
  }, [])

  useDataCategories(dataCategoriesProps)

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
              {!!displayedCategories?.length &&
                displayedCategories?.map((category) => {
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
