import { usePostsFilters } from '~/hooks/usePostsFilters'
import { useCategoriesOptions } from '~/hooks/useCategoriesOptions'
import { useAuthorsFilterOptions } from '~/hooks/useAuthorsFilterOption'
import { Card } from '~/components/ui/card'
import DataSearch from '~/components/shared/DataManagement/DataSearch'
import DataResetFilter from '~/components/shared/DataManagement/DataResetFilter'
import DataFilterBox from '~/components/shared/DataManagement/DataFilterBox'

const BlogPostsFiltersBox = () => {
  const {
    searchQuery,
    setSearchQuery,
    categoriesFilter,
    setCategoriesFilter,
    authorFilter,
    setAuthorFilter,
    isAnyFilterActive,
    resetFilters,
    setPage
  } = usePostsFilters()

  const { categoriesOptions } = useCategoriesOptions('slug')

  const { authorsOptions } = useAuthorsFilterOptions()

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

      <div className="col-span-1 grid grid-cols-2 place-content-between gap-3 max-[375px]:grid-cols-1 min-[375px]:col-span-2">
        <DataFilterBox
          title="Category"
          options={categoriesOptions}
          filterValue={categoriesFilter}
          setFilterValue={setCategoriesFilter}
          setPage={setPage}
        />

        <DataFilterBox
          title="Author"
          options={authorsOptions}
          filterValue={authorFilter}
          setFilterValue={setAuthorFilter}
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

export default BlogPostsFiltersBox
