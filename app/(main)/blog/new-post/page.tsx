import NewPostCard from '~/components/posts/NewPostCard'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

const NewPostPage = async () => {
  const user = await getCurrentUser()

  return (
    <div className=" py-10 xs:w-[95%] sm:w-[85%] lg:w-[65%]">
      <NewPostCard isLogged={!!user} />
    </div>
  )
}

export default NewPostPage
