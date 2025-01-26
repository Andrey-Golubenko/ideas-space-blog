'use client'

import { Suspense, useMemo } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import useGlobalStore from '~/store'
import { useDataPosts } from '~/hooks/useDataPosts'
import { useDataPostsFilters } from '~/hooks/useDataPostsFilters'
import { useCategoriesFilterOptions } from '~/hooks/useCategoriesFilterOption'
import { useAuthorsFilterOptions } from '~/hooks/useAuthorsFilterOption'
import { columns } from '~/components/admin/AdminPosts/columns'
import DataTable from '~/components/ui/table/DataTable'
import { DataTableSkeleton } from '~/components/ui/table/DataTableSkeleton'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import DataFilterBox from '~/components/shared/DataManagement/DataFilterBox'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'
import { PUBLISHED_OPTIONS } from '~/utils/constants'
import {
  type TDeserializedPost,
  type IRCWithSearchParamsKeyProps
} from '~/types'

const PostsTable = ({ searchParamsKey }: IRCWithSearchParamsKeyProps) => {
  const [posts, postsCount, isLoading] = useGlobalStore((state) => {
    return [state.posts, state.postsCount, state.isLoading]
  })

  const noItem = typeof posts === 'string'
  const displayedPosts = noItem ? [] : posts

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
    authorFilter,
    setAuthorFilter,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    isAnyFilterActive,
    resetFilters
  } = useDataPostsFilters()

  const { categoriesOptions } = useCategoriesFilterOptions()

  const { authorsOptions } = useAuthorsFilterOptions()

  const dataTablePostsProps = useMemo(() => {
    return {
      page,
      limit: pageSize,
      categoriesFilter,
      publishedFilter,
      authorFilter,
      searchQuery
    }
  }, [
    page,
    pageSize,
    categoriesFilter,
    publishedFilter,
    authorFilter,
    searchQuery
  ])

  useDataPosts(dataTablePostsProps)

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
          setPage={setPage}
        />

        <DataFilterBox
          title="Published"
          options={PUBLISHED_OPTIONS}
          filterValue={publishedFilter}
          setFilterValue={setPublishedFilter}
          setPage={setPage}
        />

        <DataFilterBox
          title="Author"
          options={authorsOptions}
          filterValue={authorFilter}
          setFilterValue={setAuthorFilter}
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
            key={postsCount}
            columns={columns}
            data={displayedPosts as TDeserializedPost[]}
            totalItems={postsCount}
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

export default PostsTable
