'use client'

import { Suspense } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import { PostStatus } from '@prisma/client'
import useGlobalStore from '~/store'
import { useDataPosts } from '~/hooks/useDataPosts'
import { usePostsFilters } from '~/hooks/usePostsFilters'
import { columns } from '~/components/admin/AdminPosts/columns'
import PostsTableFiltersBox from '~/components/admin/AdminPosts/PostsTable/PostsTableFiltersBox'
import DataTable from '~/components/ui/table/DataTable'
import { DataTableSkeleton } from '~/components/ui/table/DataTableSkeleton'
import {
  type TDeserializedPost,
  type IRCWithSearchParamsKeyProps,
  type IFetchPostsFunctionProps
} from '~/types'

const PostsTable = ({ searchParamsKey }: IRCWithSearchParamsKeyProps) => {
  const { posts, postsCount, isLoading } = useGlobalStore((state) => {
    return {
      posts: state.posts,
      postsCount: state.postsCount,
      isLoading: state.isLoading
    }
  })

  const noItem = typeof posts === 'string'

  const displayedPosts = noItem ? [] : posts

  const withAnyStatus = `${PostStatus.PUBLISHED}.${PostStatus.DRAFT}`

  const [pageSize, setPageSize] = useQueryState(
    'limit',
    parseAsInteger
      .withOptions({ shallow: false, history: 'push' })
      .withDefault(10)
  )

  const {
    categoriesFilter,
    statusFilter,
    authorFilter,
    searchQuery,
    page,
    setPage
  } = usePostsFilters()

  const dataTablePostsProps: IFetchPostsFunctionProps = {
    page,
    limit: pageSize,
    categoriesFilter,
    statusFilter: statusFilter || withAnyStatus,
    authorFilter,
    searchQuery
  }

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
