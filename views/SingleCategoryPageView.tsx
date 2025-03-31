'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

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

  const searchParams = useSearchParams()

  const refreshParam = useMemo(
    () => searchParams.get('refresh-posts'),
    [searchParams]
  )

  const { searchQuery, authorFilter, page, setPage } = usePostsFilters()

  const postsPerPage = SINGLE_CAT_POSTS_PER_PAGE

  const dataPostsProps: IFetchPostsFunctionProps = {
    page,
    limit: postsPerPage,
    categoriesFilter: categorySlug,
    authorFilter,
    searchQuery
  }

  useDataPosts({ ...dataPostsProps, refreshParam })

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
