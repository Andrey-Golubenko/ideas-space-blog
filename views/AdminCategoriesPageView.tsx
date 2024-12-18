import { Heading } from '~/components/ui/heading'
import { Separator } from '~/components/ui/separator'
import AddNewItemButton from '~/components/shared/AddNewItemButton'
import CategoriesTable from '~/components/admin/AdminCategories/CategoriesTable'
import { PATHS } from '~/utils/constants'
import { type IRCWithSearchParamsKeyProps } from '~/types'

const AdminCategoriesPageView = ({
  searchParamsKey
}: IRCWithSearchParamsKeyProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <Heading
          title="Categories"
          description="Manage categories"
        />

        <AddNewItemButton
          label="Add New"
          path={PATHS.adminNewCategory}
        />
      </div>

      <Separator />

      <CategoriesTable searchParamsKey={searchParamsKey} />
    </div>
  )
}

export default AdminCategoriesPageView
