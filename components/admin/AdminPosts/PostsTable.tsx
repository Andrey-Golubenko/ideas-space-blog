'use client'

import { Suspense, useMemo } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import useStore from '~/store'
import { useDataTablePosts } from '~/hooks/useDataTablePosts'
import { useDataPostsFilters } from '~/hooks/useDataPostsFilters'
import { useCategoriesOptions } from '~/hooks/useCategoriesOptions'
import { columns } from '~/components/admin/AdminPosts/columns'
import DataTable from '~/components/ui/table/DataTable'
import { DataTableSkeleton } from '~/components/ui/table/DataTableSkeleton'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import DataFilterBox from '~/components/shared/DataManagement/DataFilterBox'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'
import { PUBLISHED_OPTIONS } from '~/utils/constants'
import { type IRCWithSearchParamsKeyProps } from '~/types'

const PostsTable = ({ searchParamsKey }: IRCWithSearchParamsKeyProps) => {
  const [dataTablePosts, dataTablePostsCount, isLoading] = useStore(
    (state) => {
      return [
        state.dataTablePosts,
        state.dataTablePostsCount,
        state.isLoading
      ]
    }
  )

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
  } = useDataPostsFilters()

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

  useDataTablePosts(dataTablePostsProps)

  const { categoriesOptions } = useCategoriesOptions()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />

        <DataFilterBox
          title="Category"
          options={categoriesOptions}
          filterValue={categoriesFilter}
          setFilterValue={setCategoriesFilter}
        />

        <DataFilterBox
          title="Published"
          options={PUBLISHED_OPTIONS}
          filterValue={publishedFilter}
          setFilterValue={setPublishedFilter}
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
            key={dataTablePostsCount}
            columns={columns}
            data={dataTablePosts}
            totalItems={dataTablePostsCount}
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
