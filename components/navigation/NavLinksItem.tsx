'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'

import { useIsActive } from '~/hooks/useIsActive'
import { PATHS } from '~/utils/constants'

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
  const isActive = useIsActive()

  return (
    <li
      className={`pl-4${isMobile ? ' w-full border-b border-b-white' : ''}`}
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
