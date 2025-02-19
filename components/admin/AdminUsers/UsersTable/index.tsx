'use client'

import { Suspense, useMemo } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import useGlobalStore from '~/store'
import { useUsersFilters } from '~/hooks/useUsersFilters'
import { useDataUsers } from '~/hooks/useDataUsers'
import DataTable from '~/components/ui/table/DataTable'
import { columns } from '~/components/admin/AdminUsers/columns'
import UsersFiltersBox from '~/components/admin/AdminUsers/UsersTable/UsersFiltersBox'
import { DataTableSkeleton } from '~/components/ui/table/DataTableSkeleton'
import { type IRCWithSearchParamsKeyProps } from '~/types'

const UsersTable = ({ searchParamsKey }: IRCWithSearchParamsKeyProps) => {
  const { users, usersCount, isLoading } = useGlobalStore((state) => {
    return {
      users: state.users,
      usersCount: state.usersCount,
      isLoading: state.isLoading
    }
  })

  const noItems = typeof users === 'string'
  const displayedUsers = noItems ? [] : users

  const [pageSize, setPageSize] = useQueryState(
    'limit',
    parseAsInteger
      .withOptions({ shallow: false, history: 'push' })
      .withDefault(10)
  )

  const { authProviderFilter, searchQuery, page, setPage } =
    useUsersFilters()

  const dataTableUsersProps = useMemo(() => {
    return {
      page,
      limit: pageSize,
      providerFilter: authProviderFilter,
      searchQuery
    }
  }, [page, pageSize, authProviderFilter, searchQuery])

  useDataUsers(dataTableUsersProps)

  return (
    <div className="space-y-4">
      <UsersFiltersBox />

      {isLoading ? (
        <DataTableSkeleton
          columnCount={4}
          rowCount={7}
        />
      ) : (
        <Suspense
          key={searchParamsKey}
          fallback={
            <DataTableSkeleton
              columnCount={5}
              rowCount={10}
            />
          }
        >
          <DataTable
            key={usersCount}
            columns={columns}
            data={displayedUsers}
            totalItems={usersCount}
            currentPage={page}
            setCurrentPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </Suspense>
      )}
    </div>
  )
}

export default UsersTable
