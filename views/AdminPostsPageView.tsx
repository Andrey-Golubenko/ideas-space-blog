import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Heading } from '~/components/ui/heading'
import { Separator } from '~/components/ui/separator'
import { Button } from '~/components/ui/button'
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

        <Button asChild>
          <Link href={PATHS.adminNewPost}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </Button>
      </div>

      <Separator />

      <PostsTable searchParamsKey={searchParamsKey} />
    </div>
  )
}

export default AdminPostsPageView
