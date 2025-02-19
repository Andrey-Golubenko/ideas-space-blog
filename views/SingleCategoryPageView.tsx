'use client'

import { useMemo } from 'react'

import useGlobalStore from '~/store'
import { usePostsFilters } from '~/hooks/usePostsFilters'
import { useDataPosts } from '~/hooks/useDataPosts'
import DataPagination from '~/components/shared/DataManagement/DataPagination'
import SingleCategoryPostsFiltersBox from '~/components/categories/SingleCategoryPostsFiltersBox'
import SingleCategoryPostsList from '~/components/categories/SingleCategoryPostsList'
import { isEmptyOrUnpublished } from '~/utils/helpers'
import { SINGLE_CAT_POSTS_PER_PAGE } from '~/utils/constants'
import { type IFetchPostsFunctionProps } from '~/types'

interface ISingleCategoryPageViewProps {
  categorySlug: string
}

const SingleCategoryPageView = ({
  categorySlug
}: ISingleCategoryPageViewProps) => {
  const { posts, postsCount, isLoading } = useGlobalStore((state) => {
    return {
      posts: state.posts,
      postsCount: state.postsCount,
      isLoading: state.isLoading
    }
  })

  const { searchQuery, authorFilter, page, setPage } = usePostsFilters()

  const postsPerPage = SINGLE_CAT_POSTS_PER_PAGE

  const dataPostsProps: IFetchPostsFunctionProps = useMemo(() => {
    return {
      page,
      limit: postsPerPage,
      categoriesFilter: categorySlug,
      authorFilter,
      searchQuery
    }
  }, [authorFilter, categorySlug, page, searchQuery])

  useDataPosts(dataPostsProps)

  const noItems: boolean = isEmptyOrUnpublished(posts)

  return (
    <div className="page-wrapper h-full w-full pt-4">
      <SingleCategoryPostsFiltersBox />

      <SingleCategoryPostsList
        data={posts}
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

export default SingleCategoryPageView
