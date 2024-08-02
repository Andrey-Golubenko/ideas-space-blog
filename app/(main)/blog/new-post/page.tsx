import NewPostForm from '~/components/post/NewPostForm'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

const NewPostPage = async () => {
  const user = await getCurrentUser()

  return <NewPostForm isLogged={!!user} />
}

export default NewPostPage
