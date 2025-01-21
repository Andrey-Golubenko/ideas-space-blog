'use client'

import { useMemo } from 'react'

import useStore from '~/store'
import { useDataPostsFilters } from '~/hooks/useDataPostsFilters'
import { useCategoriesOptions } from '~/hooks/useCategoriesOptions'
import { useDataPosts } from '~/hooks/useDataPosts'
import { Card } from '~/components/ui/card'
import BlogPostsList from '~/components/posts/BlogPostsList'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'
import DataFilterBox from '~/components/shared/DataManagement/DataFilterBox'
import DataPagination from '~/components/shared/DataManagement/DataPagination'
import { isEmptyOrUnpublished } from '~/utils/helpers'
import { POSTS_PER_PAGE } from '~/utils/constants'

const BlogPageView = () => {
  const [posts, postsCount, isLoading] = useStore((state) => {
    return [state.posts, state.postsCount, state.isLoading]
  })

  const {
    searchQuery,
    setSearchQuery,
    categoriesFilter,
    setCategoriesFilter,
    isAnyFilterActive,
    resetFilters,
    page,
    setPage
  } = useDataPostsFilters()

  const { categoriesOptions } = useCategoriesOptions()

  const dataPostsProps = useMemo(() => {
    return {
      page,
      limit: POSTS_PER_PAGE,
      categoriesFilter,
      searchQuery
    }
  }, [page, categoriesFilter, searchQuery])

  useDataPosts(dataPostsProps)

  const noItems = isEmptyOrUnpublished(posts)

  return (
    <div className="page-wrapper w-full pt-14">
      <Card className="mb-5 grid w-full grid-cols-1 flex-wrap items-center justify-around gap-x-8 gap-y-4 px-6 py-3 min-[375px]:grid-cols-2 md:grid-cols-4">
        <div className="col-span-1 min-[375px]:col-span-2 md:[&_div]:w-full md:[&_input]:!max-w-full ">
          <DataSearch
            searchKey="name"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setPage={setPage}
          />
        </div>

        <div className="col-span-1 grid place-content-center max-[375px]:grid-cols-1 min-[375px]:place-content-start">
          <DataFilterBox
            title="Category"
            options={categoriesOptions}
            filterValue={categoriesFilter}
            setFilterValue={setCategoriesFilter}
          />
        </div>

        <div className="col-span-1 grid place-content-center max-[375px]:grid-cols-1 min-[375px]:place-content-end">
          <DataResetFilter
            isFilterActive={isAnyFilterActive}
            onReset={resetFilters}
          />
        </div>
      </Card>

      <BlogPostsList
        data={posts}
        totalItems={postsCount}
        noItems={noItems}
        isLoading={isLoading}
      />

      {!noItems && (
        <DataPagination
          totalItems={postsCount ?? 0}
          currentPage={page}
          setCurrentPage={setPage}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default BlogPageView
