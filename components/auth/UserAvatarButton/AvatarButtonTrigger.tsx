import { DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '~/components/ui/tooltip'
import UserAvatar from '~/components/shared/UserAvatar'
import { cn } from '~/libs/utils'

interface IUserAvatarButtonTriggerProps {
  userImageUrl: string
  canLogout: boolean
  tooltip?: string
}

const AvatarButtonTrigger = ({
  userImageUrl,
  canLogout,
  tooltip
}: IUserAvatarButtonTriggerProps) => {
  const triggerButton = (
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

  if (!tooltip) {
    return triggerButton
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{triggerButton}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        className="border border-black/30 bg-slate-100 py-1 text-black"
      >
        <span className="bg-slate-100 text-black">
          {tooltip as React.ReactNode}
        </span>
      </TooltipContent>
    </Tooltip>
  )
}

export default AvatarButtonTrigger
