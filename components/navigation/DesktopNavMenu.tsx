import NavLinks from '~/components/navigation/NavLinks'
import LogoItem from '~/components/navigation/LogoItem'
import AddNewItemButton from '~/components/shared/AddNewItemButton'
import { PATHS } from '~/utils/constants'

const DesktopNavMenu = ({ isLoggedIn, isMobile }: INavMenuProps) => {
  return (
    <nav className="flex w-full items-center justify-between px-16">
      <LogoItem logoClassNames="mr-14 h-10 w-10 " />

      <ul className="flex items-center justify-center space-x-8">
        <NavLinks
          isLoggedIn={isLoggedIn}
          isMobile={isMobile}
        />
        <li className="pl-4">
          <AddNewItemButton
            label="Add Post"
            path={PATHS.blogNewPost}
            variant="outline"
            className="rounded-full border border-[hsl(var(--logo-color))] bg-transparent !text-[hsl(var(--logo-color))] hover:bg-black hover:text-[hsl(var(--logo-color))] sm:px-4 sm:py-2"
          />
        </li>
      </ul>
    </nav>
  )
}

export default DesktopNavMenu
