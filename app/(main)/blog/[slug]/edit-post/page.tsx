import { UserRole } from '@prisma/client'
import EditPostView from '~/views/EditPostView'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

const BlogEditPostPage = async () => {
  const user = await getCurrentUser()

  const isAdmin = user?.role === UserRole.ADMIN

  return (
    <div className="py-10 xs:w-[95%] sm:w-[80%] md:w-[75%] lg:w-[60%]">
      <EditPostView
        isLogged={!!user}
        isAdmin={isAdmin}
      />
    </div>
  )
}

export default BlogEditPostPage
