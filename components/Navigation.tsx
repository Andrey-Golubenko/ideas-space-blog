'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { INavLink } from '~/links'

interface NavigationProps {
  navLinks: INavLink[]
}

const Navigation: React.FC<NavigationProps> = ({ navLinks }) => {
  const pathName = usePathname()

  return (
    <>
      {navLinks.map(({ label, href }) => {
        const isActive = pathName === href

        return (
          <Link
            key={label}
            href={href}
            className={isActive ? 'header-link-active' : 'header-link'}
          >
            {label}
          </Link>
        )
      })}
    </>
  )
}

export default Navigation
