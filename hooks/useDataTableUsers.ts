import { useCallback, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import useStore from '~/store'
import { ITEMS_PER_PAGE_DEFAULT_LIMIT } from '~/utils/constants'
import { type IFetchUsersFunctionProps } from '~/types'

export const useDataTableUsers = ({
  currentPage,
  limit,
  providerFilter,
  searchQuery
}: IFetchUsersFunctionProps) => {
  const [getDataTableUsers] = useStore((state) => {
    return [state.getDataTableUsers]
  })

  const [debouncedSearchQuery] = useDebounce(searchQuery, 700)

  const offset = currentPage
    ? (currentPage - 1) * limit
    : ITEMS_PER_PAGE_DEFAULT_LIMIT

  const fetchUsers = useCallback(async () => {
    await getDataTableUsers({
      limit,
      offset,
      searchQuery: debouncedSearchQuery,
      providerFilter
    })
  }, [
    getDataTableUsers,
    limit,
    offset,
    debouncedSearchQuery,
    providerFilter
  ])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])
}
