import { ChevronDown } from 'lucide-react'

import { cn } from '~/libs/utils'
import NavLinkUnderlining from '~/components/navigation/NavLinksItem/NavLinkUnderlining'

interface ISubMenuTitleProps {
  title: string
  isMobile: boolean
  isActive?: boolean
}

const SubMenuTitle = ({
  title,
  isMobile,
  isActive
}: ISubMenuTitleProps) => {
  return (
    <div className="block gap-1">
      <div className={cn('flex items-center', isMobile && 'ml-1')}>
        <span
          className={cn(
            isActive ? 'navigation-link-active' : 'navigation-link',
            isMobile && 'border-none'
          )}
        >
          {title}
        </span>
        <ChevronDown
          className={cn(
            'size-4  transition-transform duration-300 group-hover/menu:rotate-180',
            isActive ? 'text-[hsl(var(--logo-color))]' : 'text-white'
          )}
        />
      </div>

      {!isMobile && (
        <NavLinkUnderlining
          triggerClass="group-hover/menu:scale-x-100"
          isActive={isActive}
        />
      )}
    </div>
  )
}

export default SubMenuTitle
