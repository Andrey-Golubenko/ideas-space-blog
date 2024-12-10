'use client'

import { Suspense, useMemo } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import useStore from '~/store'
import { useDataTablePosts } from '~/hooks/useDataTablePosts'
import { usePostsTableFilters } from '~/hooks/usePostsTableFilters'
import { useCategoriesOptions } from '~/hooks/useCategoriesOptions'
import { columns } from '~/components/admin/AdminPosts/columns'
import DataTable from '~/components/ui/table/DataTable'
import { DataTableSkeleton } from '~/components/ui/table/DataTableSkeleton'
import DataTableSearch from '~/components/ui/table/DataTableSearch'
import DataTableFilterBox from '~/components/ui/table/DataTableFilterBox'
import DataTableResetFilter from '~/components/ui/table/DataTableResetFilter'
import { PUBLISHED_OPTIONS } from '~/utils/constants'
import { type IRCWithSearchParamsKeyProps } from '~/types'

const PostsTable = ({ searchParamsKey }: IRCWithSearchParamsKeyProps) => {
  const [dataTablePosts, isLoading] = useStore((state) => {
    return [state.dataTablePosts, state.isLoading]
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
    categoriesFilter,
    setCategoriesFilter,
    publishedFilter,
    setPublishedFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = usePostsTableFilters()

  const dataTablePostsProps = useMemo(() => {
    return {
      currentPage,
      limit: pageSize,
      categoriesFilter,
      publishedFilter,
      searchQuery
    }
  }, [
    currentPage,
    pageSize,
    categoriesFilter,
    publishedFilter,
    searchQuery
  ])

  const { categoriesOptions } = useCategoriesOptions()

  useDataTablePosts(dataTablePostsProps)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />

        <DataTableFilterBox
          title="Category"
          options={categoriesOptions}
          filterValue={categoriesFilter}
          setFilterValue={setCategoriesFilter}
        />

        <DataTableFilterBox
          title="Published"
          options={PUBLISHED_OPTIONS}
          filterValue={publishedFilter}
          setFilterValue={setPublishedFilter}
        />

        <DataTableResetFilter
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
            key={dataTablePosts?.length}
            columns={columns}
            data={dataTablePosts}
            totalItems={dataTablePosts?.length}
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

export default PostsTable
