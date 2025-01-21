'use client'

import { Suspense, useMemo } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import useStore from '~/store'
import { useCategoriesTableFilters } from '~/hooks/useCategoriesTableFilters'
import { useDataTableCategories } from '~/hooks/useDataTableCategories'
import { columns } from '~/components/admin/AdminCategories/columns'
import DataTable from '~/components/ui/table/DataTable'
import { DataTableSkeleton } from '~/components/ui/table/DataTableSkeleton'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'
import { type IRCWithSearchParamsKeyProps } from '~/types'

const CategoriesTable = ({
  searchParamsKey
}: IRCWithSearchParamsKeyProps) => {
  const [dataTableCategories, isLoading] = useStore((state) => {
    return [state.dataTableCategories, state.isLoading]
  })

  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withOptions({ shallow: false }).withDefault(1)
  )

  const [pageSize, setPageSize] = useQueryState(
    'limit',
    parseAsInteger
      .withOptions({ shallow: false, history: 'push' })
      .withDefault(10)
  )

  const {
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useCategoriesTableFilters()

  const dataTableCategoriesProps = useMemo(() => {
    return {
      currentPage,
      limit: pageSize,
      searchQuery
    }
  }, [currentPage, pageSize, searchQuery])

  useDataTableCategories(dataTableCategoriesProps)

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
          columnCount={5}
          rowCount={10}
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
            key={dataTableCategories?.length}
            columns={columns}
            data={dataTableCategories}
            totalItems={dataTableCategories?.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </Suspense>
      )}
    </div>
  )
}

export default CategoriesTable
