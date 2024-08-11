import NewPostForm from '~/components/posts/NewPostForm'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

const NewPostPage = async () => {
  const user = await getCurrentUser()

  return (
    <div className=" py-10 xs:w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%]">
      <NewPostForm isLogged={!!user} />
    </div>
  )
}

export default NewPostPage
