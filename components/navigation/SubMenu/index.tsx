import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

import SubMenuTitle from '~/components/navigation/SubMenu/SubMenuTitle'
import SubMenuItem from '~/components/navigation/SubMenu/SubMenuItem'
import { cn } from '~/libs/utils'
import { ADMIN_NAV_LINKS } from '~/utils/constants'
import { useIsActive } from '~/hooks/useIsActive'

interface SubMenuProps {
  title: string
  isMobile: boolean
}

const SubMenu = ({ title, isMobile }: SubMenuProps) => {
  const [isAnyChildActive, setIsAnyChildActive] = useState(false)

  const pathname = usePathname()

  const { checkIsActive } = useIsActive()

  useEffect(() => {
    const hasActiveChild = ADMIN_NAV_LINKS.some(({ href }) => {
      if (!href) return false
      return checkIsActive(href)
    })

    setIsAnyChildActive(hasActiveChild)
  }, [pathname, checkIsActive])

  return (
    <li
      className={cn(
        'group/menu relative cursor-pointer',
        isMobile && 'w-full'
      )}
    >
      <SubMenuTitle
        title={title}
        isMobile={isMobile}
        isActive={isAnyChildActive}
      />

      {isMobile && <div className="h-[1px] w-full bg-white" />}

      <div
        className={cn(
          '-translate-x-1/2 translate-y-2',
          'h-0 overflow-hidden opacity-0',
          'transition-[height,opacity] duration-700 ease-in-out',
          'group-hover/menu:h-max group-hover/menu:opacity-100 group-hover/menu:[&_*]:cursor-pointer',
          isMobile
            ? 'relative left-[45%] top-0 mb-9 w-[95%]'
            : 'absolute left-1/2 top-[30%] w-max group-hover/menu:translate-y-4'
        )}
      >
        <ul
          className={cn(
            'h-0 rounded-lg  group-hover/menu:h-auto group-hover/menu:[&_*]:cursor-pointer',
            'flex list-disc flex-col items-start',
            isMobile
              ? 'bg-transparent group-hover/menu:gap-4 group-hover/menu:p-7'
              : 'bg-[hsl(var(--layout-background))] shadow-[0_0_10px_rgba(252,252,252,.3)_inset] group-hover/menu:mt-[15%] group-hover/menu:gap-3 group-hover/menu:p-4'
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
              />
            )
          })}
        </ul>
      </div>
    </li>
  )
}

export default SubMenu
