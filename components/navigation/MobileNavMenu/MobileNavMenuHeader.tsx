import UserAvatarButton from '~/components/auth/UserAvatarButton'
import LogoItem from '~/components/navigation/LogoItem'

interface MobileNavMenuHeaderProps {
  user?: CurrentUser
}

const MobileNavMenuHeader = ({ user }: MobileNavMenuHeaderProps) => {
  if (user) {
    return (
      <div
        id="user-avatar"
        className="flex w-full items-center justify-center px-4 py-4"
      >
        <UserAvatarButton displayedUser={user} />
        <p className="pl-4 text-white">{user?.name}</p>
      </div>
    )
  }

  return <LogoItem logoClassNames="pt-6 pb-4" />
}

export default MobileNavMenuHeader
