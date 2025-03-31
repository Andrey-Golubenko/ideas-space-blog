'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '~/libs/utils'

interface ILinkWithReferrerProps {
  path: string
  label: string
  withIcon: boolean
  className?: string
}

const LinkWithReferrer = ({
  path,
  label,
  withIcon,
  className
}: ILinkWithReferrerProps) => {
  const pathname = usePathname()

  return (
    <Link
      href={`${path}?from=${pathname}`}
      className={cn(className)}
    >
      {withIcon && <Plus className="mr-2 h-4 w-4" />} {label}
    </Link>
  )
}

export default LinkWithReferrer
