import { type Metadata } from 'next'

import ProfilePageView from '~/views/ProfilePageView'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

export const metadata: Metadata = {
  title: 'Ideas space : Users profile',
  description: 'Displaying logged in users data and posts in the blog'
}

const ProfilePage = async () => {
  const currentUser = await getCurrentUser()

  return (
    <ProfilePageView
      user={currentUser}
      hasFullAccess
    />
  )
}

export default ProfilePage
