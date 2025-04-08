import { cn } from '~/libs/utils'

interface INavLinksItemUnderliningProps {
  triggerClass: string
  isActive?: boolean
}

const NavLinkUnderlining = ({
  triggerClass,
  isActive = false
}: INavLinksItemUnderliningProps) => {
  return (
    <div className="relative">
      <div
        className={cn(
          'absolute bottom-0 left-0 h-[1px] w-full origin-bottom-left scale-x-0 transform transition-transform duration-300 ease-linear',
          `${triggerClass}`,
          isActive ? 'bg-[hsl(var(--logo-color))]' : 'bg-white'
        )}
      />
    </div>
  )
}

export default NavLinkUnderlining
