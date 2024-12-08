'use client'

import { Suspense, useMemo } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import useStore from '~/store'
import { useUsersTableFilters } from '~/hooks/useUsersTableFilters'
import { useDataTableUsers } from '~/hooks/useDataTableUsers'
import DataTable from '~/components/ui/table/DataTable'
import { columns } from '~/components/admin/AdminUsers/columns'
import DataTableFilterBox from '~/components/ui/table/DataTableFilterBox'
import DataTableResetFilter from '~/components/ui/table/DataTableResetFilter'
import DataTableSearch from '~/components/ui/table/DataTableSearch'
import { DataTableSkeleton } from '~/components/ui/table/DataTableSkeleton'
import { AUTH_OPTIONS } from '~/utils/constants'
import { type IRCWithSearchParamsKeyProps } from '~/types'

const UsersTable = ({ searchParamsKey }: IRCWithSearchParamsKeyProps) => {
  const [dataTableUsers, isLoading] = useStore((state) => {
    return [state.dataTableUsers, state.isLoading]
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

  const dataTableUsersProps = useMemo(() => {
    return {
      currentPage,
      limit: pageSize,
      providerFilter: authProviderFilter,
      searchQuery
    }
  }, [currentPage, pageSize, authProviderFilter, searchQuery])

  useDataTableUsers(dataTableUsersProps)

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
      {isLoading ? (
        <DataTableSkeleton
          columnCount={5}
          rowCount={10}
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
            key={dataTableUsers?.length}
            columns={columns}
            data={dataTableUsers}
            totalItems={dataTableUsers?.length}
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
