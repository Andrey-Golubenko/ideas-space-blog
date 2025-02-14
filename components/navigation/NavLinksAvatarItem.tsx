import UserAvatarButton from '~/components/auth/UserAvatarButton'
import { useCurrentUser } from '~/hooks/useCurrentUser'

const NavLinksAvatarItem = () => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return null
  }

  return (
    <li className="h-[40px] pl-2 min-[1085px]:pl-4">
      <UserAvatarButton displayedUser={currentUser} />
    </li>
  )
}

export default NavLinksAvatarItem
