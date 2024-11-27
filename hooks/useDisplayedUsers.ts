import { useEffect, useState } from 'react'

import useStore from '~/store'
import { fetchCurrentPageOfFilteredUsers } from '~/services/user'

interface IUseDisplayedUsersProps {
  currentPage: number
  limit: number
  authProviderFilter: string | null
  searchQuery: string | null
}

export const useDisplayedUsers = ({
  currentPage,
  limit,
  authProviderFilter,
  searchQuery
}: IUseDisplayedUsersProps) => {
  const [setDisplayedUsers, setDisplayedUsersCount] = useStore((state) => {
    return [state.setDisplayedUsers, state.setDisplayedUsersCount]
  })

  const [loading, setLoading] = useState<boolean>(true)

  const offset = (currentPage - 1) * limit

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const data = await fetchCurrentPageOfFilteredUsers(
        limit,
        offset,
        searchQuery,
        authProviderFilter
      )
      setDisplayedUsers(data?.users ?? [])
      setDisplayedUsersCount(data?.totalUsers ?? 0)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [currentPage, limit, authProviderFilter, searchQuery])

  return {
    loading,
    refreshUsers: fetchUsers
  }
}
