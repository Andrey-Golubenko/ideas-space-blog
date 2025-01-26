'use client'

import { useMemo } from 'react'

import useGlobalStore from '~/store'
import { useCategoriesTableFilters } from '~/hooks/useCategoriesTableFilters'
import { useDataCategories } from '~/hooks/useDataCategories'
import { Card } from '~/components/ui/card'
import CategoriesList from '~/components/categories/CategoriesList'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'
import { type Categories } from '@prisma/client'

const CategoriesPageView = () => {
  const [categories, categoriesCount, isLoading] = useGlobalStore(
    (state) => {
      return [state.categories, state.categoriesCount, state.isLoading]
    }
  )

  const noItems = typeof categories === 'string'
  const displayedCategories = noItems ? [] : categories

  const {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    isAnyFilterActive,
    resetFilters
  } = useCategoriesTableFilters()

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
      <Card className="mb-5 grid w-full grid-cols-1 flex-wrap items-center justify-around gap-x-8 gap-y-4 px-6 py-3 min-[375px]:grid-cols-2 md:grid-cols-5">
        <div className="col-span-1 min-[375px]:col-span-2 md:[&_div]:w-full md:[&_input]:!max-w-full ">
          <DataSearch
            searchKey="title"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setPage={setPage}
          />
        </div>

        <div className="col-span-1 grid grid-cols-1 place-content-start ">
          <DataResetFilter
            isFilterActive={isAnyFilterActive}
            onReset={resetFilters}
          />
        </div>
      </Card>

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
