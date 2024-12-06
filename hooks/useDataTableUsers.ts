import { useCallback, useEffect } from 'react'

import useStore from '~/store'
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

  const offset = currentPage ? (currentPage - 1) * limit : 10

  const fetchUsers = useCallback(async () => {
    await getDataTableUsers({
      limit,
      offset,
      searchQuery,
      providerFilter
    })
  }, [getDataTableUsers, limit, offset, searchQuery, providerFilter])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])
}
