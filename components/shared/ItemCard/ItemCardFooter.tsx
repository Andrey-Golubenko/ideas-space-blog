'use client'

import Link from 'next/link'

import { CardFooter } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants'
import { type TItemType } from '~/types'

interface IItemCardFooterProps {
  hasContent: boolean
  itemSlug?: string
  itemType: TItemType
}

const PostCardFooter = ({
  hasContent,
  itemSlug,
  itemType
}: IItemCardFooterProps) => {
  const { isPost, isCategory } = itemType

  if (!hasContent) {
    return (
      <CardFooter className="flex justify-end">
        <Skeleton className="h-2 w-8" />
      </CardFooter>
    )
  }

  return (
    <CardFooter className="ml-auto mt-auto flex-col justify-end pb-0">
      <Button
        variant="link"
        className="mb-5 ml-auto font-normal"
        size="sm"
        asChild
      >
        <Link
          href={
            (isPost && itemSlug && `${PATHS.post(itemSlug)}`) ||
            (isCategory && itemSlug && `${PATHS.category(itemSlug)}`) ||
            '#'
          }
          className="hover:no-underline"
        >
          <span className="rounded-lg bg-slate-100 px-2 py-2 hover:bg-slate-50 hover:text-slate-500">
            Read more . . .
          </span>
        </Link>
      </Button>
    </CardFooter>
  )
}

export default PostCardFooter
