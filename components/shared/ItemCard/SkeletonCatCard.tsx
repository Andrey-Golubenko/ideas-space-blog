'use client'

import { useItemProps } from '~/hooks/useItemProps'
import { useItemType } from '~/hooks/useItemType'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import ItemCardHeader from '~/components/shared/ItemCard/ItemCardHeader'
import ItemCardContent from '~/components/shared/ItemCard/ItemCardContent'
import ItemCardFooter from '~/components/shared/ItemCard/ItemCardFooter'
import { TListItem } from '~/types'

interface ISkeletonCatCardProps {
  item?: TListItem
  isLoading?: boolean
}

const SkeletonCatCard = ({ item, isLoading }: ISkeletonCatCardProps) => {
  const hasContent = item && !isLoading

  const { itemContent, itemSlug } = useItemProps(item)

  const { isPost, isCategory } = useItemType(item)

  return (
    <Card className="flex min-h-[290px] flex-col rounded-md !border-0 shadow-md">
      {hasContent ? (
        <ItemCardHeader
          item={item}
          itemType={{ isPost, isCategory }}
          imagePriority
        />
      ) : (
        <>
          <CardHeader className="p-0">
            <Skeleton className="mx-auto mb-4 mt-6 h-[200px] w-[200px] rounded-full" />
          </CardHeader>
          <CardHeader className="px-8 pb-8 pt-3">
            <Skeleton className="h-7 w-full" />
          </CardHeader>
        </>
      )}

      {hasContent ? (
        <ItemCardContent
          itemContent={itemContent}
          itemType={{ isPost, isCategory }}
        />
      ) : (
        <CardContent className="space-y-2 px-8 pb-4 text-justify">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-full" />
        </CardContent>
      )}

      {hasContent ? (
        <ItemCardFooter
          itemSlug={itemSlug}
          itemType={{ isPost, isCategory }}
        />
      ) : (
        <CardFooter className="flex justify-end">
          <Skeleton className="h-2 w-8" />
        </CardFooter>
      )}
    </Card>
  )
}

export default SkeletonCatCard
