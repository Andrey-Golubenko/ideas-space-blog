import EditPostCard from '~/components/posts/EditPostCard'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

const EditPostPage = async () => {
  const user = await getCurrentUser()

  return (
    <div className=" py-10 xs:w-[95%] sm:w-[80%] md:w-[75%] lg:w-[60%]">
      <EditPostCard isLogged={!!user} />
    </div>
  )
}

export default EditPostPage
