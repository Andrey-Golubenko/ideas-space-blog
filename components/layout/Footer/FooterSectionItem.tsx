import Link from 'next/link'

import NavLinkUnderlining from '~/components/navigation/NavLinksItem/NavLinkUnderlining'
import { cn } from '~/libs/utils'
import { type INavLink } from '~/types'

interface IFooterSectionItemProps extends INavLink {
  withIconsLabels: boolean
}

const FooterSectionItem = ({
  label,
  icon: Icon,
  href,
  withIconsLabels
}: IFooterSectionItemProps) => {
  const linkName = Icon ? href.split('.')?.[1] : 'link'

  return (
    <li
      className={cn(
        'group inline-flex w-fit items-center gap-2',
        !withIconsLabels &&
          'cursor-pointer rounded-full border border-[hsl(var(--logo-color))] bg-[hsl(var(--layout-button))] p-2.5 hover:bg-black'
      )}
    >
      {label && Icon && <Icon className="size-4" />}

      <div>
        <Link href={href}>
          {label || (Icon && <Icon className="size-5" />)}
          {Icon && <span className="sr-only">{linkName}</span>}
        </Link>

        {label && (
          <NavLinkUnderlining
            triggerClass="group-hover:scale-x-100"
            isActive
          />
        )}
      </div>
    </li>
  )
}

export default FooterSectionItem
