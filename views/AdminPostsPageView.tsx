import { Heading } from '~/components/ui/heading'
import { Separator } from '~/components/ui/separator'
import AddNewItemButton from '~/components/shared/AddNewItemButton'
import PostsTable from '~/components/admin/AdminPosts/PostsTable'
import { PATHS } from '~/utils/constants'
import { type IRCWithSearchParamsKeyProps } from '~/types'

const AdminPostsPageView = ({
  searchParamsKey
}: IRCWithSearchParamsKeyProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <Heading
          title="Posts"
          description="Manage posts"
        />

        <AddNewItemButton
          label="Add New"
          path={PATHS.adminNewPost}
          variant="outline"
          withIcon
          className="ml-auto border border-black/20 bg-blue-200 hover:bg-blue-200/70 sm:px-4 sm:py-2"
        />
      </div>

      <Separator />

      <PostsTable searchParamsKey={searchParamsKey} />
    </div>
  )
}

export default AdminPostsPageView
