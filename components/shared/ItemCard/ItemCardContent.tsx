'use client'

import { CardContent } from '~/components/ui/card'
import { type TItemType } from '~/types'

interface IItemCardContentProps {
  itemContent: string
  itemType: TItemType
}

const ItemCardContent = ({
  itemContent,
  itemType
}: IItemCardContentProps) => {
  const { isCategory } = itemType

  return (
    <CardContent className="pb-6 text-justify">
      <div
        className={`rounded-xl py-2 ${isCategory ? '' : 'bg-slate-100 px-4'}`}
      >
        {itemContent}
      </div>
    </CardContent>
  )
}

export default ItemCardContent
