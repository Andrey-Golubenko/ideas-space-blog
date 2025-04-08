import { useEffect } from 'react'
import Link from 'next/link'

import { useIsActive } from '~/hooks/useIsActive'
import NavLinkUnderlining from '~/components/navigation/NavLinksItem/NavLinkUnderlining'
import { cn } from '~/libs/utils'

interface ISubMenuItemProps {
  label: string
  href: string
  isMobile: boolean
  onActiveCheck?: (href: string, isActive: boolean) => void
}

const SubMenuItem = ({
  label,
  href,
  isMobile,
  onActiveCheck
}: ISubMenuItemProps) => {
  const { checkIsActive } = useIsActive()
  const isActive = checkIsActive(href)

  useEffect(() => {
    onActiveCheck?.(href, isActive)
  }, [href, isActive, onActiveCheck])

  return (
    <li
      key={href}
      className={cn(
        'ml-3 cursor-pointer',
        isActive ? 'text-[hsl(var(--logo-color))]' : 'marker:text-white',
        isMobile && 'w-full border-b border-b-white'
      )}
    >
      <div className="group">
        <Link
          href={href}
          className={cn(
            isActive ? 'navigation-link-active' : 'navigation-link',
            isMobile && 'border-none'
          )}
        >
          {label}
        </Link>
        <NavLinkUnderlining
          triggerClass="group-hover:scale-x-100"
          isActive={isActive}
        />
      </div>
    </li>
  )
}

export default SubMenuItem
