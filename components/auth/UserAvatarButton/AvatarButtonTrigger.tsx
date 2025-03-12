import { DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import WithTooltip from '~/components/hoc/WithTooltip'
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
    <WithTooltip
      tooltip="Logout"
      contentClasses="border border-black/30 bg-slate-100 py-1 text-black"
      tooltipClasses="bg-slate-100 text-black"
    >
      <DropdownMenuTrigger
        className={cn(
          'focus-visible:outline-none',
          canLogout ? 'cursor-pointer' : 'cursor-default'
        )}
      >
        <UserAvatar
          title="Logout"
          userImageUrl={userImageUrl}
          className="hover:brightness-110"
        />
      </DropdownMenuTrigger>
    </WithTooltip>
  )
}

export default AvatarButtonTrigger
