import Link from 'next/link'
import { ChevronRightIcon } from 'lucide-react'

import NavLinkUnderlining from '~/components/navigation/NavLinksItem/NavLinkUnderlining'
import { cn } from '~/libs/utils'
import { type INavLink } from '~/types'

const FooterSectionItem = ({ href, label, icon: Icon }: INavLink) => {
  return (
    <li
      className={cn(
        'group inline-flex w-fit items-center gap-2',
        !label &&
          'cursor-pointer rounded-full border border-[hsl(var(--logo-color))] bg-[hsl(var(--layout-button))] p-2.5 hover:bg-black'
      )}
    >
      {label && <ChevronRightIcon className="h-4 w-4" />}

      <div>
        <Link href={href}>
          {label || (Icon && <Icon className="size-5" />)}
        </Link>

        {label && <NavLinkUnderlining isActive />}
      </div>
    </li>
  )
}

export default FooterSectionItem
