import { DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import UserAvatar from '~/components/shared/UserAvatar'
import { cn } from '~/libs/utils'

interface IUserAvatarButtonTriggerProps {
  userImageUrl: string
  canLogout: boolean
}

const AvatarButtonTrigger = ({
  userImageUrl,
  canLogout
}: IUserAvatarButtonTriggerProps) => {
  return (
    <DropdownMenuTrigger
      className={cn(
        'focus-visible:outline-none',
        canLogout ? 'cursor-pointer' : 'cursor-default'
      )}
    >
      <UserAvatar
        userImageUrl={userImageUrl}
        className="hover:brightness-110"
      />
    </DropdownMenuTrigger>
  )
}

export default AvatarButtonTrigger
