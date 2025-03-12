'use client'

import { type User } from 'next-auth'

import { useCanLogout } from '~/hooks/useCanLogout'
import { DropdownMenu } from '~/components/ui/dropdown-menu'
import AvatarButtonTrigger from '~/components/auth/UserAvatarButton/AvatarButtonTrigger'
import AvatarButtonContent from '~/components/auth/UserAvatarButton/AvatarButtonContent'

interface IUserAvatarButtonProps {
  displayedUser: UserDTO & User
}

const UserAvatarButton = ({ displayedUser }: IUserAvatarButtonProps) => {
  const { canLogout } = useCanLogout(displayedUser)

  const userImageUrl = displayedUser?.image ? displayedUser?.image : ''

  return (
    <DropdownMenu modal={false}>
      <AvatarButtonTrigger
        userImageUrl={userImageUrl}
        canLogout={canLogout}
        tooltip="Logout"
      />

      {canLogout && <AvatarButtonContent />}
    </DropdownMenu>
  )
}

export default UserAvatarButton
