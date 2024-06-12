import Image from 'next/image'
import { auth } from '~/libs/auth/auth'

async function Profile() {
  const session = await auth()

  return (
    <div className="page-wrapper">
      <h1 className="page-heading">Profile of {session?.user?.name}</h1>
      {session?.user?.image && (
        <Image
          className="ml-4 rounded-md"
          alt="profile"
          src={session?.user?.image}
          width={50}
          height={50}
        />
      )}
    </div>
  )
}

export default Profile
