'use client'

import { NAV_LINKS, PATHS } from '~/utils/constants/constants'
import PrivateNavLinks from '~/components/navigation/PrivateNavLinks'
import NavMenuItem from '~/components/navigation/NavLinksItem'

const NavLinks = ({ isLoggedIn, isMobile }: INavMenuProps) => {
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
          href={PATHS.signIn}
        />
      ) : (
        <PrivateNavLinks isMobile={isMobile} />
      )}
    </>
  )
}

export default NavLinks
