import { type Session } from 'next-auth'

import ProfileInfo from '~/components/profile/ProfileInfo'
import ProfilePostsList from '~/components/profile/ProfilePostsList'

interface IProfilePageViewProps {
  user?: Session['user']
}

const ProfilePageView = ({ user }: IProfilePageViewProps) => {
  return (
    <div className="grid w-full grid-cols-1 items-stretch justify-between gap-x-4 px-5 pb-8 pt-4 md:grid-cols-3 md:px-4 md:pb-8 lg:p-10 lg:pt-4 ">
      <div className="col-start-1 h-full pb-4 md:pb-0">
        <ProfileInfo
          user={user}
          label="User data"
        />
      </div>

      <div className="col-start-1 flex h-full w-full flex-col items-center justify-center md:col-start-2 md:col-end-4">
        <ProfilePostsList currentUser={user} />
      </div>
    </div>
  )
}

export default ProfilePageView
