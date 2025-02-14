import { useCategoriesFilters } from '~/hooks/useCategoriesFilters'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'

const CategoriesTableFiltersBox = () => {
  const {
    searchQuery,
    setSearchQuery,
    setPage,
    isAnyFilterActive,
    resetFilters
  } = useCategoriesFilters()

  return (
    <div className="flex flex-wrap items-center gap-4">
      <DataSearch
        searchKey="name"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />

      <DataResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  )
}

export default CategoriesTableFiltersBox
