import { useCallback, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import useGlobalStore from '~/store'
import { DEFAULT_TABLE_ITEMS_PER_PAGE } from '~/utils/constants'
import { type IFetchUsersFunctionProps } from '~/types'

export const useDataUsers = ({
  page,
  limit,
  providerFilter,
  searchQuery
}: IFetchUsersFunctionProps) => {
  const [getFilteredUsersWithPag] = useGlobalStore((state) => {
    return [state.getFilteredUsersWithPag]
  })

  const [debouncedSearchQuery] = useDebounce(searchQuery, 700)

  const offset = page ? (page - 1) * limit : DEFAULT_TABLE_ITEMS_PER_PAGE

  const fetchUsers = useCallback(async () => {
    await getFilteredUsersWithPag({
      limit,
      offset,
      searchQuery: debouncedSearchQuery,
      providerFilter
    })
  }, [
    getFilteredUsersWithPag,
    limit,
    offset,
    debouncedSearchQuery,
    providerFilter
  ])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])
}
