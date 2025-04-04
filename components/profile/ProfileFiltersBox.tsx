import { useCategoriesOptions } from '~/hooks/useCategoriesOptions'
import { usePostsFilters } from '~/hooks/usePostsFilters'
import { Card } from '~/components/ui/card'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'
import DataFilterBox from '~/components/shared/DataManagement/DataFilterBox'
import { POST_STATUS_OPTIONS } from '~/utils/constants'

const ProfileFiltersBox = () => {
  const { categoriesOptions } = useCategoriesOptions('slug')

  const {
    searchQuery,
    setSearchQuery,
    categoriesFilter,
    setCategoriesFilter,
    statusFilter,
    setStatusFilter,
    isAnyFilterActive,
    resetFilters,
    setPage
  } = usePostsFilters()

  return (
    <Card className="mb-5 grid w-full grid-cols-1 flex-wrap items-center justify-around gap-x-5 gap-y-4 px-3 py-3 min-[375px]:grid-cols-2 min-[1080px]:grid-cols-4">
      <div className="col-span-1 min-[375px]:col-span-2 md:[&_div]:w-full md:[&_input]:!max-w-full ">
        <DataSearch
          searchKey="title"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
      </div>

      <div className="col-span-1 grid grid-cols-2 place-content-between gap-3 max-[375px]:grid-cols-1 min-[375px]:col-span-2">
        <DataFilterBox
          title="Category"
          options={categoriesOptions}
          filterValue={categoriesFilter}
          setFilterValue={setCategoriesFilter}
          setPage={setPage}
        />

        <DataFilterBox
          title="Status"
          options={POST_STATUS_OPTIONS}
          filterValue={statusFilter}
          setFilterValue={setStatusFilter}
          setPage={setPage}
        />
      </div>

      {isAnyFilterActive && (
        <div className="col-span-1 grid grid-cols-2 place-content-between gap-3 max-[375px]:grid-cols-1 min-[375px]:col-span-2">
          <DataResetFilter
            isFilterActive={isAnyFilterActive}
            onReset={resetFilters}
          />
        </div>
      )}
    </Card>
  )
}

export default ProfileFiltersBox
