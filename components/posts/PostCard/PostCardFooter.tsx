'use client'

import Link from 'next/link'

import { CardFooter } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants/constants'

interface IPostCardFooterProps {
  postId: string
}

const PostCardFooter = ({ postId }: IPostCardFooterProps) => {
  return (
    <CardFooter className="mt-auto justify-end">
      <Button
        variant="link"
        className="font-normal"
        size="sm"
        asChild
      >
        <Link href={`${PATHS.blog}/${postId}`}>
          <span className="rounded-lg bg-slate-100 px-2 py-2">
            Read more . . .
          </span>
        </Link>
      </Button>
    </CardFooter>
  )
}

export default PostCardFooter
