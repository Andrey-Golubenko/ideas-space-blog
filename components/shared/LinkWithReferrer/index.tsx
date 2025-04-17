'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
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
  return (
    <Link
      href={path}
      className={cn(className)}
    >
      {withIcon && <Plus className="mr-2 h-4 w-4" />} {label}
    </Link>
  )
}

export default LinkWithReferrer
