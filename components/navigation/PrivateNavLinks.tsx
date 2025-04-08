'use client'

import NavLinksItem from '~/components/navigation/NavLinksItem'
import NavLinksAvatarItem from '~/components/navigation/NavLinksAvatarItem'
import SubMenu from '~/components/navigation/SubMenu'
import { PRIVATE_NAV_LINKS } from '~/utils/constants'

interface IPrivateNavLinksProps {
  isMobile: boolean
  isAdmin?: boolean
}

const PrivateNavLinks = ({ isMobile, isAdmin }: IPrivateNavLinksProps) => {
  return (
    <>
      {PRIVATE_NAV_LINKS.map(({ label, href }) => {
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
      {isAdmin && (
        <SubMenu
          title="Admin"
          isMobile={isMobile}
        />
      )}
      {!isMobile && <NavLinksAvatarItem />}
    </>
  )
}

export default PrivateNavLinks
