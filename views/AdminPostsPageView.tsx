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
        />
      </div>

      <Separator />

      <PostsTable searchParamsKey={searchParamsKey} />
    </div>
  )
}

export default AdminPostsPageView
