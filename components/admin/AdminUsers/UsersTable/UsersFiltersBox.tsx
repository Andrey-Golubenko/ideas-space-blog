import { useUsersFilters } from '~/hooks/useUsersFilters'
import DataFilterBox from '~/components/shared/DataManagement/DataFilterBox'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import { AUTH_OPTIONS } from '~/utils/constants'

const UsersFiltersBox = () => {
  const {
    authProviderFilter,
    setAuthProviderFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useUsersFilters()

  return (
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
  )
}

export default UsersFiltersBox
