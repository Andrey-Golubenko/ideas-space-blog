'use client'

import { useCallback, useMemo } from 'react'
import { useQueryState } from 'nuqs'
import { searchParams } from '~/libs/searchparams'

export const useUsersFilters = () => {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  )

  const [authProviderFilter, setAuthProviderFilter] = useQueryState(
    'provider',
    searchParams.authProvider
      .withOptions({ shallow: false })
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
    setAuthProviderFilter(null)

    setPage(1)
  }, [setSearchQuery, setAuthProviderFilter, setPage])

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!authProviderFilter
  }, [searchQuery, authProviderFilter])

  return {
    searchQuery,
    setSearchQuery,
    authProviderFilter,
    setAuthProviderFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive
  }
}
