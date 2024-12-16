import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Heading } from '~/components/ui/heading'
import { Separator } from '~/components/ui/separator'
import { Button } from '~/components/ui/button'
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
          title="c"
          description="Manage categories"
        />

        <Button asChild>
          <Link href={PATHS.adminNewPost}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </Button>
      </div>

      <Separator />

      <CategoriesTable searchParamsKey={searchParamsKey} />
    </div>
  )
}

export default AdminCategoriesPageView
