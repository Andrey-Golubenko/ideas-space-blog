'use client'

import { useCallback, useMemo } from 'react'
import { useQueryState } from 'nuqs'

import { searchParams } from '~/libs/searchparams'

export const usePostsFilters = () => {
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

  const [statusFilter, setStatusFilter] = useQueryState(
    'status',
    searchParams.status.withOptions({ shallow: false }).withDefault('')
  )

  const [authorFilter, setAuthorFilter] = useQueryState(
    'author',
    searchParams.author.withOptions({ shallow: false }).withDefault('')
  )

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page
      .withOptions({ scroll: true, shallow: false })
      .withDefault(1)
  )

  const resetFilters = useCallback(() => {
    setSearchQuery(null)
    setCategoriesFilter(null)
    setStatusFilter(null)
    setAuthorFilter(null)

    setPage(1)
  }, [
    setSearchQuery,
    setCategoriesFilter,
    setStatusFilter,
    setAuthorFilter,
    setPage
  ])

  const isAnyFilterActive = useMemo(() => {
    return (
      !!searchQuery ||
      !!categoriesFilter ||
      !!statusFilter ||
      !!authorFilter
    )
  }, [searchQuery, categoriesFilter, statusFilter, authorFilter])

  return {
    searchQuery,
    setSearchQuery,
    categoriesFilter,
    setCategoriesFilter,
    statusFilter,
    setStatusFilter,
    authorFilter,
    setAuthorFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive
  }
}
