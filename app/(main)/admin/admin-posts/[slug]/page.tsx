import { UserRole } from '@prisma/client'
import EditPostView from '~/views/EditPostView'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

const EditPostPage = async () => {
  const user = await getCurrentUser()

  const isAdmin = user?.role === UserRole.ADMIN

  return (
    <div className="@container">
      <EditPostView
        isLogged={!!user}
        isAdmin={isAdmin}
      />
    </div>
  )
}

export default EditPostPage
