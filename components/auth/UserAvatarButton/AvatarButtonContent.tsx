import { DropdownMenuContent } from '~/components/ui/dropdown-menu'
import LogoutButton from '~/components/auth/LogoutButton'
import AvatarButtonContentItem from '~/components/auth/UserAvatarButton/AvatarButtonContentItem'

const AvatarButtonContent = () => {
  return (
    <DropdownMenuContent>
      <LogoutButton className="cursor-pointer">
        <AvatarButtonContentItem />
      </LogoutButton>
    </DropdownMenuContent>
  )
}

export default AvatarButtonContent
