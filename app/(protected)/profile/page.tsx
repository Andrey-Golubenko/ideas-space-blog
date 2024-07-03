import Image from 'next/image'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

const ProfilePage = async () => {
  const user = await getCurrentUser()

  return (
    <div className="page-wrapper">
      <h1 className="page-heading">Profile of {user?.name}</h1>
      {user?.image && (
        <Image
          className="ml-4 rounded-md"
          alt="profile"
          src={user?.image}
          width={50}
          height={50}
        />
      )}
    </div>
  )
}

export default ProfilePage
