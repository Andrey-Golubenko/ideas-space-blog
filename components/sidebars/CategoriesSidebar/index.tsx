'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'

import useGlobalStore from '~/store'
import { useDataCategories } from '~/hooks/useDataCategories'
import WithSidebar from '~/components/hoc/WithSidebar'

import SidebarMenuSection from '~/components/sidebars/SidebarMenuSection'
import CategoriesSkeleton from '~/components/sidebars/CategoriesSidebar/CategoriesSkeleton'
import { DEFAULT_CATEGORIES_PER_PAGE } from '~/utils/constants'

const CategoriesSidebar = () => {
  const { categories } = useGlobalStore((state) => {
    return { categories: state.categories }
  })

  const noItems = typeof categories === 'string'

  const displayedCategories = noItems ? [] : categories

  const dataCategoriesProps = useMemo(() => {
    return {
      page: 1,
      limit: DEFAULT_CATEGORIES_PER_PAGE
    }
  }, [])

  useDataCategories(dataCategoriesProps)

  const params = useParams()

  return (
    <WithSidebar label="Categories">
      {displayedCategories?.length > 0 ? (
        displayedCategories?.map((category) => {
          const isActive = params?.slug === category?.slug

          return (
            <SidebarMenuSection
              key={category?.id}
              item={category}
              isActive={isActive}
            />
          )
        })
      ) : (
        <CategoriesSkeleton />
      )}
    </WithSidebar>
  )
}

export default CategoriesSidebar
