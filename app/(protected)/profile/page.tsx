import ProfileInfo from '~/components/ProfileInfo'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

const ProfilePage = async () => {
  const user = await getCurrentUser()

  return (
    <ProfileInfo
      user={user}
      label="User data"
    />
  )
}

export default ProfilePage
