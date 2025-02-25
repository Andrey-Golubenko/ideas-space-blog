import { getCurrentUser } from '~/utils/helpers/server.helpers'
import NewPostPageView from '~/views/NewPostPageView'

const BlogNewPostPage = async () => {
  const user = await getCurrentUser()

  return (
    <div className="py-10 xs:w-[95%] sm:w-[90%] lg:w-[65%]">
      <NewPostPageView isLogged={!!user} />
    </div>
  )
}

export default BlogNewPostPage
