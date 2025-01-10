import EditPostPageView from '~/views/EditPostPageView'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

const BlogEditPostPage = async () => {
  const user = await getCurrentUser()

  return (
    <div className="py-10 xs:w-[95%] sm:w-[80%] md:w-[75%] lg:w-[60%]">
      <EditPostPageView isLogged={!!user} />
    </div>
  )
}

export default BlogEditPostPage
