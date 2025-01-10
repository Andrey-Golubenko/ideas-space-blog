import ProfileCard from '~/components/ProfileInfo'
import ProfilePostsList from '~/components/ProfileInfo/ProfilePostsList'
import { getCurrentUser } from '~/utils/helpers/server.helpers'

const ProfilePage = async () => {
  const currentUser = await getCurrentUser()

  return (
    <>
      <div className="py-10 xs:w-[80%] sm:w-[65%] md:w-[45%] lg:w-[35%]">
        <ProfileCard
          user={currentUser}
          label="User data"
        />
      </div>
      <ProfilePostsList currentUser={currentUser} />
    </>
  )
}

export default ProfilePage
