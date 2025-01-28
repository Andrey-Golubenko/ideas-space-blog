'use client'

import { usePathname } from 'next/navigation'

import { useCurrentUser } from '~/hooks/useCurrentUser'
import UserAvatarButton from '~/components/auth/UserAvatarButton'
import { PATHS } from '~/utils/constants'

const UserProfileBar = () => {
  const user = useCurrentUser()
  const pathname = usePathname()

  const isProfilePage = pathname.includes(PATHS.profile)

  if (isProfilePage) {
    return (
      <div className="grid-col-1 mx-4 mt-12 grid w-[calc(100%-32px)] gap-x-4 md:grid-cols-3 lg:mx-10 lg:w-[calc(100%-80px)]">
        <div className="col-start-1 flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-3 rounded-xl bg-secondary p-2.5 shadow-sm">
          <UserAvatarButton />
          <p className="pl-4">{user?.name}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 rounded-xl bg-secondary p-4 shadow-sm xs:w-[80%] sm:w-[65%] md:w-[45%] lg:w-[35%]">
      <UserAvatarButton />
      <p className="pl-4">{user?.name}</p>
    </div>
  )
}

export default UserProfileBar
