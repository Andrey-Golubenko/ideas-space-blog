'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'

import useGlobalStore from '~/store'
import { useDataCategories } from '~/hooks/useDataCategories'
import WithSidebar from '~/components/hoc/WithSidebar'

import SidebarMenuSection from '~/components/sidebars/SidebarMenuSection'

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

  return (
    <WithSidebar label="Categories">
      {!!displayedCategories?.length &&
        displayedCategories?.map((category) => {
          const isActive = params?.slug === category?.slug

          return (
            <SidebarMenuSection
              key={category?.id}
              item={category}
              isActive={isActive}
            />
          )
        })}
    </WithSidebar>
  )
}

export default CategoriesSidebar
