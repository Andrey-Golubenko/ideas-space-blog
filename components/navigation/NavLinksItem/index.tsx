import Link from 'next/link'

import { useIsActive } from '~/hooks/useIsActive'
import NavLinkUnderlining from '~/components/navigation/NavLinksItem/NavLinkUnderlining'
import { cn } from '~/libs/utils'

interface INavLinksItemProps {
  label: string
  href: string
  isMobile: boolean
}

const NavLinksItem = ({ label, href, isMobile }: INavLinksItemProps) => {
  const { checkIsActive } = useIsActive()
  const isActive = checkIsActive(href)

  return (
    <li
      key={href}
      className={cn(
        'min-[1085px]:pl-4',
        isMobile && 'w-full border-b border-b-white',
        'group'
      )}
    >
      <Link
        href={href}
        className={cn(
          isActive ? 'navigation-link-active' : 'navigation-link',
          isMobile && 'border-none'
        )}
      >
        {label}
      </Link>

      <NavLinkUnderlining isActive={isActive} />
    </li>
  )
}

export default NavLinksItem
