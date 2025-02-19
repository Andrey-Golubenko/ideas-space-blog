'use client'

import { useMemo } from 'react'

import useGlobalStore from '~/store'
import { usePostsFilters } from '~/hooks/usePostsFilters'
import { useDataPosts } from '~/hooks/useDataPosts'
import BlogPostsList from '~/components/posts/BlogPostsList'
import BlogPostsFiltersBox from '~/components/posts/BlogPostsFiltersBox'
import DataPagination from '~/components/shared/DataManagement/DataPagination'
import { isEmptyOrUnpublished } from '~/utils/helpers'
import { DEFAULT_POSTS_PER_PAGE } from '~/utils/constants'
import {
  type IFetchPostsFunctionProps,
  type TDeserializedPost
} from '~/types'

const BlogPageView = () => {
  const { posts, postsCount, isLoading } = useGlobalStore((state) => {
    return {
      posts: state.posts,
      postsCount: state.postsCount,
      isLoading: state.isLoading
    }
  })

  const { searchQuery, categoriesFilter, authorFilter, page, setPage } =
    usePostsFilters()

  const postsPerPage = DEFAULT_POSTS_PER_PAGE

  const dataPostsProps: IFetchPostsFunctionProps = useMemo(() => {
    return {
      page,
      limit: postsPerPage,
      categoriesFilter,
      authorFilter,
      searchQuery
    }
  }, [page, categoriesFilter, authorFilter, searchQuery])

  useDataPosts(dataPostsProps)

  const noItems: boolean = isEmptyOrUnpublished(posts)

  return (
    <div className="page-wrapper h-full w-full pt-14">
      <BlogPostsFiltersBox />

      <BlogPostsList
        data={posts as TDeserializedPost[]}
        totalItems={postsCount}
        noItems={noItems}
        isLoading={isLoading}
      />

      {!noItems && (
        <DataPagination
          totalItems={postsCount ?? 0}
          postsPerPage={postsPerPage}
          currentPage={page}
          setCurrentPage={setPage}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default BlogPageView
