import { getCurrentUser } from '~/utils/helpers/server.helpers'
import NewPostPageView from '~/views/NewPostPageView'

const BlogNewPostPage = async () => {
  const user = await getCurrentUser()

  return (
    <div className="py-3.5 xs:w-[95%] sm:w-[90%] lg:w-[65%] lg:py-10">
      <NewPostPageView isLogged={!!user} />
    </div>
  )
}

export default BlogNewPostPage
