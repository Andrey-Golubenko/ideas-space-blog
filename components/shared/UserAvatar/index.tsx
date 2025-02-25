import { type HTMLAttributes } from 'react'
import { FaUser } from 'react-icons/fa'

import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from '~/components/ui/avatar'
import { cn } from '~/libs/utils'

interface IUserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  userImageUrl: string
}

const UserAvatar = ({
  userImageUrl,
  className,
  ...props
}: IUserAvatarProps) => {
  return (
    <Avatar
      className={cn(className)}
      {...props}
    >
      <AvatarImage
        src={userImageUrl || ''}
        alt="Avatar of the user"
      />

      <AvatarFallback className="bg-sky-500">
        <FaUser className="text-white" />
      </AvatarFallback>

      <span className="sr-only">User</span>
    </Avatar>
  )
}

export default UserAvatar
