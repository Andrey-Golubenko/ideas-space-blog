import EditPostPageView from '~/views/EditPostPageView'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

const AdminEditPostPage = async () => {
  const user = await getCurrentUser()

  return (
    <div className="@container">
      <EditPostPageView isLogged={!!user} />
    </div>
  )
}

export default AdminEditPostPage
