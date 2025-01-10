'use client'

import NavLinksItem from '~/components/navigation/NavLinksItem'
import NavLinksAvatarItem from '~/components/navigation/NavLinksAvatarItem'
import { PRIVATE_NAV_LINKS } from '~/utils/constants'

const PrivateNavLinks = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <>
      {PRIVATE_NAV_LINKS.map(({ label, href }) => {
        return (
          <NavLinksItem
            key={href}
            label={label}
            href={href}
            isMobile={isMobile}
          />
        )
      })}
      {!isMobile && <NavLinksAvatarItem />}
    </>
  )
}

export default PrivateNavLinks
