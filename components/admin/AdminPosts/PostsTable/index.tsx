'use client'

import { Suspense, useMemo } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import useGlobalStore from '~/store'
import { useDataPosts } from '~/hooks/useDataPosts'
import { usePostsFilters } from '~/hooks/usePostsFilters'
import { columns } from '~/components/admin/AdminPosts/columns'
import PostsTableFiltersBox from '~/components/admin/AdminPosts/PostsTable/PostsTableFiltersBox'
import DataTable from '~/components/ui/table/DataTable'
import { DataTableSkeleton } from '~/components/ui/table/DataTableSkeleton'
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
    publishedFilter,
    authorFilter,
    searchQuery,
    page,
    setPage
  } = usePostsFilters()

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
      <PostsTableFiltersBox />

      {isLoading ? (
        <DataTableSkeleton
          columnCount={5}
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
