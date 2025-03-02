import { useCurrentUser } from '~/hooks/useCurrentUser'
import UserAvatarButton from '~/components/auth/UserAvatarButton'
import { Skeleton } from '~/components/ui/skeleton'

const NavLinksAvatarItem = () => {
  const currentUser = useCurrentUser()

  return (
    <li className="h-[40px] pl-2 min-[1085px]:pl-4">
      {currentUser ? (
        <UserAvatarButton displayedUser={currentUser} />
      ) : (
        <Skeleton className="size-10 rounded-full border border-[hsl(var(--logo-color))] bg-[hsl(var(--layout-button))]" />
      )}
    </li>
  )
}

export default NavLinksAvatarItem
