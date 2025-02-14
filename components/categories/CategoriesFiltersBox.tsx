import { useCategoriesFilters } from '~/hooks/useCategoriesFilters'
import { Card } from '~/components/ui/card'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'

const CategoriesFiltersBox = () => {
  const {
    searchQuery,
    setSearchQuery,
    setPage,
    isAnyFilterActive,
    resetFilters
  } = useCategoriesFilters()

  return (
    <Card className="mb-5 grid w-full grid-cols-1 flex-wrap items-center justify-around gap-x-8 gap-y-4 px-6 py-3 min-[375px]:grid-cols-2 md:grid-cols-5">
      <div className="col-span-1 min-[375px]:col-span-2 md:[&_div]:w-full md:[&_input]:!max-w-full ">
        <DataSearch
          searchKey="title"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
      </div>

      <div className="col-span-1 grid grid-cols-1 place-content-start ">
        <DataResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
    </Card>
  )
}

export default CategoriesFiltersBox
