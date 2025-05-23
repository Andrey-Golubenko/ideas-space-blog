'use client'

import { useCallback, useMemo } from 'react'
import { useQueryState } from 'nuqs'
import { searchParams } from '~/libs/searchparams'

export const useCategoriesFilters = () => {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  )

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page
      .withOptions({ scroll: true, shallow: false })
      .withDefault(1)
  )

  const resetFilters = useCallback(() => {
    setSearchQuery(null)

    setPage(1)
  }, [setSearchQuery, setPage])

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery
  }, [searchQuery])

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive
  }
}
