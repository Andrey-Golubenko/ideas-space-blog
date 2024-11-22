'use client'

import { Suspense, useEffect, useState } from 'react'

import { useUsersTableFilters } from '~/hooks/useUsersTableFilters'
import DataTable from '~/components/ui/table/DataTable'
import { columns } from '~/components/admin/AdminUsers/UsersTable/columns'
import DataTableFilterBox from '~/components/ui/table/DataTableFilterBox'
import DataTableResetFilter from '~/components/ui/table/DataTableResetFilter'
import DataTableSearch from '~/components/ui/table/DataTableSearch'
import { DataTableSkeleton } from '~/components/ui/table/DataTableSkeleton'
import { AUTH_OPTIONS } from '~/utils/constants'
import { TDeserializedUser } from '~/types'

interface IUsersTableProps {
  users: TDeserializedUser[]
  totalUsers: number
}

const UsersTable = ({ users, totalUsers }: IUsersTableProps) => {
  const [displayedUsers, setDisplayedUsers] =
    useState<TDeserializedUser[]>(users)

  const {
    authProviderFilter,
    setAuthProviderFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useUsersTableFilters()

  useEffect(() => {
    if (authProviderFilter || searchQuery) {
      const filters = authProviderFilter?.split('.') || []

      const filteredUsers = users?.filter((user) => {
        const matchesSearch = searchQuery
          ? user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
          : true

        const matchesProvider = filters.length
          ? filters.includes(user?.provider)
          : true

        return matchesSearch && matchesProvider
      })

      setDisplayedUsers(filteredUsers || [])
    } else {
      setDisplayedUsers(users || [])
    }
  }, [searchQuery, authProviderFilter, users])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="provider"
          title="Provider type"
          options={AUTH_OPTIONS}
          setFilterValue={setAuthProviderFilter}
          filterValue={authProviderFilter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            rowCount={10}
          />
        }
      >
        <DataTable
          columns={columns}
          data={displayedUsers}
          totalItems={totalUsers}
        />
      </Suspense>
    </div>
  )
}

export default UsersTable
