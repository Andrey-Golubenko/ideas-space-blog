import { getCurrentUser } from '~/utils/helpers/server.helpers'
import NewPostPageView from '~/views/NewPostPageView'

const AdminNewPostPage = async () => {
  const user = await getCurrentUser()

  return (
    <div className="@container">
      <NewPostPageView isLogged={!!user} />
    </div>
  )
}

export default AdminNewPostPage
