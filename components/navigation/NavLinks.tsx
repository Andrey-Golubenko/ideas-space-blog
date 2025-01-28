'use client'

import PrivateNavLinks from '~/components/navigation/PrivateNavLinks'
import NavMenuItem from '~/components/navigation/NavLinksItem'
import { NAV_LINKS, PATHS } from '~/utils/constants'

const NavLinks = ({ isLoggedIn, isMobile, isAdmin }: INavMenuProps) => {
  return (
    <>
      {NAV_LINKS.map(({ label, href }) => {
        return (
          <NavMenuItem
            isMobile={isMobile}
            key={href}
            label={label}
            href={href}
          />
        )
      })}
      {!isLoggedIn ? (
        <NavMenuItem
          isMobile={isMobile}
          label="Log in"
          href={PATHS.logIn}
        />
      ) : (
        <PrivateNavLinks
          isMobile={isMobile}
          isAdmin={isAdmin}
        />
      )}
    </>
  )
}

export default NavLinks
