import PostsLists from '~/components/posts/PostsList'
import ProfileCard from '~/components/profileInfo'
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
      <div className="justify-centerpy-10 flex flex-col items-center xs:w-[90%]">
        <PostsLists currentUser={currentUser} />
      </div>
    </>
  )
}

export default ProfilePage
