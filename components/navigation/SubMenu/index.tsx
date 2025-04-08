import { useState } from 'react'

import SubMenuTitle from '~/components/navigation/SubMenu/SubMenuTitle'
import SubMenuItem from '~/components/navigation/SubMenu/SubMenuItem'
import { cn } from '~/libs/utils'
import { ADMIN_NAV_LINKS } from '~/utils/constants'

interface SubMenuProps {
  title: string
  isMobile: boolean
}

const SubMenu = ({ title, isMobile }: SubMenuProps) => {
  const [isAnyChildActive, setIsAnyChildActive] = useState(false)

  const handleItemActive = (_href: string, isActive: boolean) => {
    if (isActive) {
      setIsAnyChildActive(true)
    }
  }

  return (
    <li
      className={cn(
        'group/menu relative cursor-pointer',
        isMobile && 'w-full border-b border-b-white'
      )}
    >
      <SubMenuTitle
        title={title}
        isMobile={isMobile}
        isActive={isAnyChildActive}
      />

      <div
        className={cn(
          'pointer-events-none absolute top-[30%] -translate-x-1/2 translate-y-2 cursor-pointer opacity-0',
          'transition-all duration-500 ease-in-out',
          'group-hover/menu:pointer-events-auto   group-hover/menu:cursor-pointer group-hover/menu:opacity-100',
          isMobile
            ? 'left-[41%] w-[95%]'
            : 'left-1/2 w-max group-hover/menu:translate-y-4'
        )}
      >
        <ul
          className={cn(
            'mt-[15%] cursor-pointer rounded-lg',
            'flex list-disc flex-col items-start bg-[hsl(var(--layout-background))]  shadow-[0_0_10px_rgba(252,252,252,.3)_inset]',
            'group-hover/menu:cursor-pointer',
            isMobile ? 'gap-4 p-7' : 'gap-3 p-4'
          )}
        >
          {ADMIN_NAV_LINKS.map(({ label, href }) => {
            if (!label || !href) return null

            return (
              <SubMenuItem
                key={href}
                label={label}
                href={href}
                isMobile={isMobile}
                onActiveCheck={handleItemActive}
              />
            )
          })}
        </ul>
      </div>
    </li>
  )
}

export default SubMenu
