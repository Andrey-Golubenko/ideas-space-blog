import ProfilePageView from '~/views/ProfilePageView'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

const ProfilePage = async () => {
  const currentUser = await getCurrentUser()

  return <ProfilePageView user={currentUser} />
}

export default ProfilePage
