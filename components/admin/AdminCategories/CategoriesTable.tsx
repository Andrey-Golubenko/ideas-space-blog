'use client'

import { Suspense, useMemo } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import useGlobalStore from '~/store'
import { useCategoriesTableFilters } from '~/hooks/useCategoriesTableFilters'
import { useDataCategories } from '~/hooks/useDataCategories'
import { columns } from '~/components/admin/AdminCategories/columns'
import DataTable from '~/components/ui/table/DataTable'
import { DataTableSkeleton } from '~/components/ui/table/DataTableSkeleton'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'
import { type Categories } from '@prisma/client'
import { type IRCWithSearchParamsKeyProps } from '~/types'

const CategoriesTable = ({
  searchParamsKey
}: IRCWithSearchParamsKeyProps) => {
  const [categories, categoriesCount, isLoading] = useGlobalStore(
    (state) => {
      return [state.categories, state.categoriesCount, state.isLoading]
    }
  )

  const noItems = typeof categories === 'string'
  const displayedCategories = noItems ? [] : categories

  const [pageSize, setPageSize] = useQueryState(
    'limit',
    parseAsInteger
      .withOptions({ shallow: false, history: 'push' })
      .withDefault(10)
  )

  const {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    isAnyFilterActive,
    resetFilters
  } = useCategoriesTableFilters()

  const dataTableCategoriesProps = useMemo(() => {
    return {
      page,
      limit: pageSize,
      searchQuery
    }
  }, [page, pageSize, searchQuery])

  useDataCategories(dataTableCategoriesProps)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />

        <DataResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>

      {isLoading ? (
        <DataTableSkeleton
          columnCount={3}
          rowCount={7}
        />
      ) : (
        <Suspense
          key={searchParamsKey}
          fallback={
            <DataTableSkeleton
              columnCount={5}
              rowCount={10}
            />
          }
        >
          <DataTable
            key={categoriesCount}
            columns={columns}
            data={displayedCategories as Categories[]}
            totalItems={categoriesCount}
            currentPage={page}
            setCurrentPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </Suspense>
      )}
    </div>
  )
}

export default CategoriesTable
