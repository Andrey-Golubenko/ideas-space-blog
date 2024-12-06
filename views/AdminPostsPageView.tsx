import { Heading } from '~/components/ui/heading'
import { Separator } from '~/components/ui/separator'
import PostsTable from '~/components/admin/AdminPosts/PostsTable'

const AdminPostsPageView = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <Heading
          title="Posts"
          description="Manage posts"
        />
      </div>

      <Separator />

      <PostsTable />
    </div>
  )
}

export default AdminPostsPageView
