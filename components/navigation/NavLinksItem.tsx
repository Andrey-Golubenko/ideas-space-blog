'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import useActive from '~/hooks/useActive'
import { PATHS } from '~/utils/constants/constants'

interface INavMenuItemProps {
  label: string
  href: string
  isMobile: boolean
  hasOnClick?: boolean
}

const NavMenuItem = ({
  label,
  href,
  isMobile,
  hasOnClick
}: INavMenuItemProps) => {
  const isActive = useActive()

  return (
    <li
      className={`pl-1.5${isMobile ? ' w-full border-b border-b-white' : ''}`}
      key={href}
    >
      <Link
        key={label}
        href={href}
        className={
          isActive(href)
            ? `header-link-active${isMobile ? ' border-none' : ''}`
            : `header-link${isMobile ? ' border-none' : ''}`
        }
        onClick={
          hasOnClick
            ? () => {
                return signOut({ callbackUrl: PATHS.logIn })
              }
            : undefined
        }
      >
        {label}
      </Link>
    </li>
  )
}

export default NavMenuItem
