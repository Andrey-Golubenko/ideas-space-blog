import NewPostCard from '~/components/posts/NewPostCard'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

const AdminNewPostPageView = async () => {
  const user = await getCurrentUser()

  return (
    <div className="@container">
      <NewPostCard isLogged={!!user} />
    </div>
  )
}

export default AdminNewPostPageView
