'use client'

import PrivateNavLinks from '~/components/navigation/PrivateNavLinks'
import NavLinksItem from '~/components/navigation/NavLinksItem'
import { NAV_LINKS, PATHS } from '~/utils/constants'

const NavLinks = ({ isLoggedIn, isMobile, isAdmin }: INavMenuProps) => {
  return (
    <>
      {NAV_LINKS.map(({ label, href }) => {
        if (!label || !href) return null

        return (
          <NavLinksItem
            key={href}
            label={label}
            href={href}
            isMobile={isMobile}
          />
        )
      })}
      {!isLoggedIn ? (
        <NavLinksItem
          label="Log in"
          href={PATHS.logIn}
          isMobile={isMobile}
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
