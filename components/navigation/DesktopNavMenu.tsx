import NavLinks from '~/components/navigation/NavLinks'

const DesktopNavMenu = ({ isLoggedIn, isMobile }: INavMenuProps) => {
  return (
    <nav className="flex w-full items-center justify-center">
      <ul className="flex w-full items-center justify-center space-x-8">
        <NavLinks
          isLoggedIn={isLoggedIn}
          isMobile={isMobile}
        />
      </ul>
    </nav>
  )
}

export default DesktopNavMenu
