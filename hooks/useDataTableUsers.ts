import { useCallback, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import useGlobalStore from '~/store'
import { DEFAULT_TABLE_ITEMS_PER_PAGE } from '~/utils/constants'
import { type IFetchUsersFunctionProps } from '~/types'

export const useDataTableUsers = ({
  currentPage,
  limit,
  providerFilter,
  searchQuery
}: IFetchUsersFunctionProps) => {
  const [getDataTableUsers] = useGlobalStore((state) => {
    return [state.getDataTableUsers]
  })

  const [debouncedSearchQuery] = useDebounce(searchQuery, 700)

  const offset = currentPage
    ? (currentPage - 1) * limit
    : DEFAULT_TABLE_ITEMS_PER_PAGE

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
