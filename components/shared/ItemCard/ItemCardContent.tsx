'use client'

import { CardContent } from '~/components/ui/card'

interface IItemCardContentProps {
  itemContent: string
}

const ItemCardContent = ({ itemContent }: IItemCardContentProps) => {
  return (
    <CardContent className="pb-10 text-justify">
      <div className="rounded-xl bg-slate-100 px-4 py-2">
        {itemContent}
      </div>
    </CardContent>
  )
}

export default ItemCardContent
