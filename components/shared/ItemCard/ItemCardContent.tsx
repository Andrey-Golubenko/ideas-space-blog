'use client'

import { CardContent } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/libs/utils'
import { type TItemType } from '~/types'

interface IItemCardContentProps {
  hasContent: boolean
  itemContent: string
  itemType: TItemType
}

const ItemCardContent = ({
  hasContent,
  itemContent,
  itemType
}: IItemCardContentProps) => {
  const { isCategory } = itemType

  if (!hasContent) {
    return (
      <CardContent
        className={cn('space-y-2 pb-4 text-justify', isCategory && 'px-8')}
      >
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-full" />
      </CardContent>
    )
  }

  return (
    <CardContent className="pb-6 text-justify">
      <div
        className={cn(
          'rounded-xl py-2',
          !isCategory && 'bg-slate-100 px-4'
        )}
      >
        {itemContent}
      </div>
    </CardContent>
  )
}

export default ItemCardContent
