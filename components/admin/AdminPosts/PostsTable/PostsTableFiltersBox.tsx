import { usePostsFilters } from '~/hooks/usePostsFilters'
import { useCategoriesOptions } from '~/hooks/useCategoriesOptions'
import { useAuthorsFilterOptions } from '~/hooks/useAuthorsFilterOption'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import DataFilterBox from '~/components/shared/DataManagement/DataFilterBox'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'
import { POST_STATUS_OPTIONS } from '~/utils/constants'

const PostsTableFiltersBox = () => {
  const { categoriesOptions } = useCategoriesOptions('slug')

  const { authorsOptions } = useAuthorsFilterOptions()

  const {
    categoriesFilter,
    setCategoriesFilter,
    statusFilter,
    setStatusFilter,
    authorFilter,
    setAuthorFilter,
    searchQuery,
    setSearchQuery,
    setPage,
    isAnyFilterActive,
    resetFilters
  } = usePostsFilters()

  return (
    <div className="flex flex-wrap items-center gap-4">
      <DataSearch
        searchKey="name"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />

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

      <DataFilterBox
        title="Author"
        options={authorsOptions}
        filterValue={authorFilter}
        setFilterValue={setAuthorFilter}
        setPage={setPage}
      />

      <DataResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  )
}

export default PostsTableFiltersBox
