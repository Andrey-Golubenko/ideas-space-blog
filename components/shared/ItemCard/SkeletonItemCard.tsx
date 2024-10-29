'use client'

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
import { useItemProps } from '~/hooks/useItemProps'
import { useItemType } from '~/hooks/useItemType'
import { TListItem } from '~/types/types'

interface IPostCardSkeletonProps {
  item?: TListItem
  isLoading?: boolean
}

const SkeletonItemCard = ({ item, isLoading }: IPostCardSkeletonProps) => {
  const hasContent = item && !isLoading

  const { itemImage, itemTitle, itemContent, itemSlug } =
    useItemProps(item)

  const { isPost, isCategory } = useItemType(item)

  return (
    <Card className="flex min-h-[290px] flex-col rounded-md !border-0 shadow-md">
      {hasContent ? (
        <ItemCardHeader
          itemImage={itemImage}
          itemTitle={itemTitle}
          itemSlug={itemSlug}
          itemType={{ isPost, isCategory }}
          imagePriority
        />
      ) : (
        <>
          <CardHeader className="p-0">
            <Skeleton className="mb-4 min-h-[260px] w-full" />
          </CardHeader>
          <CardHeader className="pb-8 pt-3">
            <Skeleton className="h-7 w-full" />
          </CardHeader>
        </>
      )}

      {hasContent ? (
        <ItemCardContent itemContent={itemContent} />
      ) : (
        <CardContent className="space-y-2 pb-4 text-justify">
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

export default SkeletonItemCard
