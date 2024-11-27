'use client'

import { Suspense } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import useStore from '~/store'
import { useUsersTableFilters } from '~/hooks/useUsersTableFilters'
import { useDisplayedUsers } from '~/hooks/useDisplayedUsers'
import DataTable from '~/components/ui/table/DataTable'
import { columns } from '~/components/admin/AdminUsers/UsersTable/columns'
import DataTableFilterBox from '~/components/ui/table/DataTableFilterBox'
import DataTableResetFilter from '~/components/ui/table/DataTableResetFilter'
import DataTableSearch from '~/components/ui/table/DataTableSearch'
import { DataTableSkeleton } from '~/components/ui/table/DataTableSkeleton'
import { AUTH_OPTIONS } from '~/utils/constants'

const UsersTable = () => {
  const [displayedUsers, displayedUsersCount] = useStore((state) => {
    return [state.displayedUsers, state.displayedUsersCount]
  })

  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withOptions({ shallow: false }).withDefault(1)
  )
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
    setPage,
    setSearchQuery
  } = useUsersTableFilters()

  const { loading } = useDisplayedUsers({
    currentPage,
    limit: pageSize,
    authProviderFilter,
    searchQuery
  })

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
      {loading ? (
        <DataTableSkeleton
          columnCount={5}
          rowCount={10}
        />
      ) : (
        <Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              rowCount={10}
            />
          }
        >
          <DataTable
            key={displayedUsers?.length}
            columns={columns}
            data={displayedUsers}
            totalItems={displayedUsersCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </Suspense>
      )}
    </div>
  )
}

export default UsersTable
