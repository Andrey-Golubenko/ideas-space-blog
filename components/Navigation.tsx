'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { INavLink } from '~/types/types'
import { PATHS } from '~/constants/constants'

interface NavigationProps {
  navLinks: INavLink[]
}

const Navigation: React.FC<NavigationProps> = ({ navLinks }) => {
  const pathName = usePathname()
  const session = useSession()
  const isActive = (href: string): boolean => pathName === href

  return (
    <>
      {navLinks.map(({ label, href }) => (
        // const isActive = pathName === href

        <Link
          key={label}
          href={href}
          className={isActive(href) ? 'header-link-active' : 'header-link'}
        >
          {label}
        </Link>
      ))}
      {session?.data && (
        <Link
          href={PATHS.profile}
          className={
            isActive(PATHS.profile) ? 'header-link-active' : 'header-link'
          }
        >
          Profile
        </Link>
      )}
      {session?.data ? (
        <Link
          href="#"
          onClick={() => signOut({ callbackUrl: PATHS.home })}
          className={isActive('') ? 'header-link-active' : 'header-link'}
        >
          Sign Out
        </Link>
      ) : (
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

export default Navigation
