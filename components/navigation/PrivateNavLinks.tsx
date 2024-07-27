'use client'

import { PRIVATE_NAV_LINKS } from '~/utils/constants/constants'
import NavLinksItem from '~/components/navigation/NavLinksItem'

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
      <NavLinksItem
        hasOnClick
        label="Log out"
        href="#"
        isMobile={isMobile}
      />
    </>
  )
}

export default PrivateNavLinks
