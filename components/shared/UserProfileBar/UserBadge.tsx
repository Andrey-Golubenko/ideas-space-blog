import { type User } from 'next-auth'

import { Skeleton } from '~/components/ui/skeleton'
import UserAvatarButton from '~/components/auth/UserAvatarButton'

interface IUserBadgeProps {
  displayedUser: (UserDTO & User) | undefined | null
}

const UserBadge = ({ displayedUser }: IUserBadgeProps) => {
  return (
    <>
      {displayedUser ? (
        <UserAvatarButton displayedUser={displayedUser} />
      ) : (
        <Skeleton className="size-10 rounded-full" />
      )}

      {displayedUser ? (
        <p className="pl-4">{displayedUser?.name}</p>
      ) : (
        <Skeleton className="h-3.5 w-40" />
      )}
    </>
  )
}

export default UserBadge
