'use client'

import { useMemo } from 'react'

import useGlobalStore from '~/store'
import { useCategoriesFilters } from '~/hooks/useCategoriesFilters'
import { useDataCategories } from '~/hooks/useDataCategories'
import CategoriesFiltersBox from '~/components/categories/CategoriesFiltersBox'
import CategoriesList from '~/components/categories/CategoriesList'
import { type Categories } from '@prisma/client'

const CategoriesPageView = () => {
  const { categories, categoriesCount, isLoading } = useGlobalStore(
    (state) => {
      return {
        categories: state.categories,
        categoriesCount: state.categoriesCount,
        isLoading: state.isLoading
      }
    }
  )

  const noItems = typeof categories === 'string'
  const displayedCategories = noItems ? [] : categories

  const { searchQuery, page } = useCategoriesFilters()

  const dataCategoriesProps = useMemo(() => {
    return {
      page,
      limit: 12,
      searchQuery
    }
  }, [page, searchQuery])

  useDataCategories(dataCategoriesProps)

  return (
    <div className="page-wrapper w-full pt-14">
      <CategoriesFiltersBox />

      <CategoriesList
        data={displayedCategories as Categories[]}
        totalItems={categoriesCount}
        noItems={noItems}
        isLoading={isLoading}
      />
    </div>
  )
}

export default CategoriesPageView
