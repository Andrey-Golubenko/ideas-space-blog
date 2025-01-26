'use client'

import { useMemo } from 'react'

import useGlobalStore from '~/store'
import { useDataPostsFilters } from '~/hooks/useDataPostsFilters'
import { useCategoriesFilterOptions } from '~/hooks/useCategoriesFilterOption'
import { useAuthorsFilterOptions } from '~/hooks/useAuthorsFilterOption'
import { useDataPosts } from '~/hooks/useDataPosts'
import { Card } from '~/components/ui/card'
import BlogPostsList from '~/components/posts/BlogPostsList'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'
import DataFilterBox from '~/components/shared/DataManagement/DataFilterBox'
import DataPagination from '~/components/shared/DataManagement/DataPagination'
import { isEmptyOrUnpublished } from '~/utils/helpers'
import { DEFAULT_POSTS_PER_PAGE } from '~/utils/constants'
import {
  type IFetchPostsFunctionProps,
  type TDeserializedPost
} from '~/types'

const BlogPageView = () => {
  const [posts, postsCount, isLoading] = useGlobalStore((state) => {
    return [state.posts, state.postsCount, state.isLoading]
  })

  const {
    searchQuery,
    setSearchQuery,
    categoriesFilter,
    setCategoriesFilter,
    authorFilter,
    setAuthorFilter,
    isAnyFilterActive,
    resetFilters,
    page,
    setPage
  } = useDataPostsFilters()

  const { categoriesOptions } = useCategoriesFilterOptions()

  const { authorsOptions } = useAuthorsFilterOptions()

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

  const noItems = isEmptyOrUnpublished(posts)

  return (
    <div className="page-wrapper w-full pt-14">
      <Card className="mb-5 grid w-full grid-cols-1 flex-wrap items-center justify-around gap-x-8 gap-y-4 px-6 py-3 min-[375px]:grid-cols-2 md:grid-cols-5">
        <div className="col-span-1 min-[375px]:col-span-2 md:[&_div]:w-full md:[&_input]:!max-w-full ">
          <DataSearch
            searchKey="title"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setPage={setPage}
          />
        </div>

        <div className="col-span-1 grid grid-cols-2 place-content-between gap-3 max-[375px]:grid-cols-1 min-[375px]:col-span-2">
          <DataFilterBox
            title="Category"
            options={categoriesOptions}
            filterValue={categoriesFilter}
            setFilterValue={setCategoriesFilter}
            setPage={setPage}
          />

          <DataFilterBox
            title="Author"
            options={authorsOptions}
            filterValue={authorFilter}
            setFilterValue={setAuthorFilter}
            setPage={setPage}
          />
        </div>

        <div className="col-span-1 grid grid-cols-1 place-content-start ">
          <DataResetFilter
            isFilterActive={isAnyFilterActive}
            onReset={resetFilters}
          />
        </div>
      </Card>

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
