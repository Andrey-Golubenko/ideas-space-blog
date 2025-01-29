'use client'

import { Suspense, useMemo } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import useGlobalStore from '~/store'
import { useUsersTableFilters } from '~/hooks/useUsersTableFilters'
import { useDataUsers } from '~/hooks/useDataUsers'
import DataTable from '~/components/ui/table/DataTable'
import { columns } from '~/components/admin/AdminUsers/columns'
import DataFilterBox from '~/components/shared/DataManagement/DataFilterBox'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import { DataTableSkeleton } from '~/components/ui/table/DataTableSkeleton'
import { AUTH_OPTIONS } from '~/utils/constants'
import { type IRCWithSearchParamsKeyProps } from '~/types'

const UsersTable = ({ searchParamsKey }: IRCWithSearchParamsKeyProps) => {
  const [users, usersCount, isLoading] = useGlobalStore((state) => {
    return [state.users, state.usersCount, state.isLoading]
  })

  const noItems = typeof users === 'string'
  const displayedUsers = noItems ? [] : users

  const [pageSize, setPageSize] = useQueryState(
    'limit',
    parseAsInteger
      .withOptions({ shallow: false, history: 'push' })
      .withDefault(10)
  )

  const {
    authProviderFilter,
    setAuthProviderFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    page,
    setPage,
    setSearchQuery
  } = useUsersTableFilters()

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
      <div className="flex flex-wrap items-center gap-4">
        <DataSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />

        <DataFilterBox
          title="Provider type"
          options={AUTH_OPTIONS}
          setFilterValue={setAuthProviderFilter}
          filterValue={authProviderFilter}
          setPage={setPage}
        />

        <DataResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>

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
