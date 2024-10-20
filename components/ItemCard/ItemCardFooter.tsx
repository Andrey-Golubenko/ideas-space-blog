'use client'

import Link from 'next/link'

import { CardFooter } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants/constants'

interface IItemCardFooterProps {
  itemId: string
  itemType: { isPost: boolean; isCategory: boolean }
}

const PostCardFooter = ({ itemId, itemType }: IItemCardFooterProps) => {
  const { isPost, isCategory } = itemType

  return (
    <CardFooter className="mt-auto justify-end">
      <Button
        variant="link"
        className="font-normal"
        size="sm"
        asChild
      >
        <Link
          href={`${
            (isPost && PATHS.blog) || (isCategory && PATHS.categories)
          }/${itemId}`}
        >
          <span className="rounded-lg bg-slate-100 px-2 py-2">
            Read more . . .
          </span>
        </Link>
      </Button>
    </CardFooter>
  )
}

export default PostCardFooter
