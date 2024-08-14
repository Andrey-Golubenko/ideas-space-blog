'use client'

import { type Post } from '@prisma/client'
import Link from 'next/link'

import {
  Card,
  CardHeader,
  CardFooter,
  CardContent
} from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { cn } from '~/libs/utils'
import { PATHS } from '~/utils/constants/constants'
import { fontPoppins } from '~/utils/constants/fonts'
import { toUpperCaseFirstChar } from '~/utils/helpers/helpers'

interface IpostCardProps {
  post: Post
}

const PostCard = ({ post }: IpostCardProps) => {
  const postTitle = toUpperCaseFirstChar(post?.title)

  const postContent = `${toUpperCaseFirstChar(post?.content.slice(0, 120))}...`

  return (
    <Card className="flex min-h-[290px] flex-col rounded-md shadow-md">
      <CardHeader className="pb-4">
        <div className="flex w-full items-center justify-start">
          <Link
            href={`${PATHS.blog}/${post?.id}`}
            className="w-full"
          >
            <h2
              className={cn(
                'w-full truncate text-2xl font-semibold',
                fontPoppins.className
              )}
            >
              {postTitle}
            </h2>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pb-4 text-justify">
        {postContent}
      </CardContent>
      <CardFooter className="mt-auto justify-end">
        <Button
          variant="link"
          className="font-narmal"
          size="sm"
          asChild
        >
          <Link href={`${PATHS.blog}/${post?.id}`}>
            <span>Read more . . .</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PostCard
