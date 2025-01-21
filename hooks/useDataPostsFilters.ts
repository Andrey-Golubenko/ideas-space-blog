'use client'

import { useCallback, useMemo } from 'react'
import { useQueryState } from 'nuqs'

import { searchParams } from '~/libs/searchparams'

export const useDataPostsFilters = () => {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  )

  const [categoriesFilter, setCategoriesFilter] = useQueryState(
    'categories',
    searchParams.categories.withOptions({ shallow: false }).withDefault('')
  )

  const [publishedFilter, setPublishedFilter] = useQueryState(
    'published',
    searchParams.published.withOptions({ shallow: false }).withDefault('')
  )

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  )

  const resetFilters = useCallback(() => {
    setSearchQuery(null)
    setCategoriesFilter(null)
    setPublishedFilter(null)

    setPage(1)
  }, [setSearchQuery, setCategoriesFilter, setPublishedFilter, setPage])

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!categoriesFilter || !!publishedFilter
  }, [searchQuery, categoriesFilter, publishedFilter])

  return {
    searchQuery,
    setSearchQuery,
    categoriesFilter,
    setCategoriesFilter,
    publishedFilter,
    setPublishedFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive
  }
}
