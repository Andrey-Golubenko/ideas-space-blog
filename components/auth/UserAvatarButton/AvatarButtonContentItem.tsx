import { ExitIcon } from '@radix-ui/react-icons'

import { DropdownMenuItem } from '~/components/ui/dropdown-menu'

const AvatarButtonContentItem = () => {
  return (
    <DropdownMenuItem className="flex cursor-pointer items-center justify-around">
      <ExitIcon className="h-4 w-4" />
      Logout
    </DropdownMenuItem>
  )
}

export default AvatarButtonContentItem
