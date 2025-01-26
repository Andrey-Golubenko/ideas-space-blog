'use client'

import { useMemo } from 'react'

import useGlobalStore from '~/store'
import { useDataPostsFilters } from '~/hooks/useDataPostsFilters'
import { useDataPosts } from '~/hooks/useDataPosts'
import { useAuthorsFilterOptions } from '~/hooks/useAuthorsFilterOption'
import { isEmptyOrUnpublished } from '~/utils/helpers'
import { Card } from '~/components/ui/card'
import DataFilterBox from '~/components/shared/DataManagement/DataFilterBox'
import DataPagination from '~/components/shared/DataManagement/DataPagination'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import SingleCategoryPostsList from '~/components/categories/SingleCategoryPostsList'
import { SINGLE_CAT_POSTS_PER_PAGE } from '~/utils/constants'
import { type IFetchPostsFunctionProps } from '~/types'

interface ISingleCategoryPageViewProps {
  categorySlug: string
}

const SingleCategoryPageView = ({
  categorySlug
}: ISingleCategoryPageViewProps) => {
  const [posts, postsCount, isLoading] = useGlobalStore((state) => {
    return [state.posts, state.postsCount, state.isLoading]
  })

  const {
    searchQuery,
    setSearchQuery,
    authorFilter,
    setAuthorFilter,
    isAnyFilterActive,
    resetFilters,
    page,
    setPage
  } = useDataPostsFilters()

  const { authorsOptions } = useAuthorsFilterOptions()

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

  const noItems = isEmptyOrUnpublished(posts)

  return (
    <div className="page-wrapper w-full pt-4">
      <Card className="mb-5 grid w-full grid-cols-1 flex-wrap items-center justify-around gap-x-5 gap-y-4 px-3 py-3 min-[375px]:grid-cols-2 min-[1080px]:grid-cols-4">
        <div className="col-span-1 min-[375px]:col-span-2 md:[&_div]:w-full md:[&_input]:!max-w-full ">
          <DataSearch
            searchKey="title"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setPage={setPage}
          />
        </div>

        <div className="col-span-1 grid place-content-center max-[375px]:grid-cols-1 min-[375px]:place-content-start">
          <DataFilterBox
            title="Author"
            options={authorsOptions}
            filterValue={authorFilter}
            setFilterValue={setAuthorFilter}
            setPage={setPage}
          />
        </div>

        <div className="col-span-1 grid place-content-center max-[375px]:grid-cols-1 min-[375px]:place-content-end">
          <DataResetFilter
            isFilterActive={isAnyFilterActive}
            onReset={resetFilters}
          />
        </div>
      </Card>

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
