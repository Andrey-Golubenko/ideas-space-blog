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

  const [authorFilter, setAuthorFilter] = useQueryState(
    'author',
    searchParams.author.withOptions({ shallow: false }).withDefault('')
  )

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  )

  const resetFilters = useCallback(() => {
    setSearchQuery(null)
    setCategoriesFilter(null)
    setPublishedFilter(null)
    setAuthorFilter(null)

    setPage(1)
  }, [
    setSearchQuery,
    setCategoriesFilter,
    setPublishedFilter,
    setAuthorFilter,
    setPage
  ])

  const isAnyFilterActive = useMemo(() => {
    return (
      !!searchQuery ||
      !!categoriesFilter ||
      !!publishedFilter ||
      !!authorFilter
    )
  }, [searchQuery, categoriesFilter, publishedFilter, authorFilter])

  return {
    searchQuery,
    setSearchQuery,
    categoriesFilter,
    setCategoriesFilter,
    publishedFilter,
    setPublishedFilter,
    authorFilter,
    setAuthorFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive
  }
}
