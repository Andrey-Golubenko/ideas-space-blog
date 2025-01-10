'use client'

import { useCurrentUser } from '~/hooks/useCurrentUser'
import UserAvatarButton from '~/components/auth/UserAvatarButton'

const NavBar = () => {
  const user = useCurrentUser()

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 rounded-xl bg-secondary p-4 shadow-sm xs:w-[80%] sm:w-[65%] md:w-[45%] lg:w-[35%]">
      <UserAvatarButton />
      <p className="pl-4">{user?.name}</p>
    </div>
  )
}

export default NavBar
