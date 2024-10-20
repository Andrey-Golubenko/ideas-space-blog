'use client'

import Link from 'next/link'

import { CardFooter } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants/constants'

interface IItemCardFooterProps {
  itemSlug?: string
  itemType: { isPost: boolean; isCategory: boolean }
}

const PostCardFooter = ({ itemSlug, itemType }: IItemCardFooterProps) => {
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
          href={
            (isPost && `${PATHS.blog}/${itemSlug}`) ||
            (isCategory && `${PATHS.categories}/${itemSlug}`) ||
            '#'
          }
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
