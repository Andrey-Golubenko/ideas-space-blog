'use client'

import Link from 'next/link'
import useActive from '~/hooks/useActive'
import { NAV_LINKS, PATHS } from '~/utils/constants/constants'

const NavMenu = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const isActive = useActive()

  return (
    <>
      {NAV_LINKS.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={isActive(href) ? 'header-link-active' : 'header-link'}
        >
          {label}
        </Link>
      ))}
      {!isLoggedIn && (
        <Link
          href={PATHS.signIn}
          className={
            isActive(PATHS.signIn) ? 'header-link-active' : 'header-link'
          }
        >
          Log in
        </Link>
      )}
    </>
  )
}

export default NavMenu
