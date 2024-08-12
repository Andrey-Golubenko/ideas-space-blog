'use client'

import { type Post } from '@prisma/client'
import Link from 'next/link'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { Button } from '~/components/ui/button'
import { cn } from '~/libs/utils'
import { PATHS } from '~/utils/constants/constants'
import { fontPoppins } from '~/utils/constants/fonts'
import { toUpperCaseFirstChar } from '~/utils/helpers/helpers'

interface IPostsCardsSkeletonProps {
  post: Post
  isLoading: boolean
}

const PostsCardsSkeleton = ({
  post,
  isLoading
}: IPostsCardsSkeletonProps) => {
  const hasContent = post && !isLoading
  const postTitle = toUpperCaseFirstChar(post?.title)
  const postContent = `${toUpperCaseFirstChar(post?.content.slice(0, 120))}...`

  return (
    <Card className="flex min-h-[290px] flex-col rounded-md shadow-md">
      {hasContent ? (
        <CardHeader className="pb-2">
          <div className="flex w-full items-center justify-start">
            <Link href={`${PATHS.blog}/${post?.id}`}>
              <h2
                className={cn(
                  'text-2xl font-semibold',
                  fontPoppins.className
                )}
              >
                {postTitle}
              </h2>
            </Link>
          </div>
        </CardHeader>
      ) : (
        <CardHeader className="pb-4">
          <Skeleton className="h-7 w-full" />
        </CardHeader>
      )}
      {hasContent ? (
        <CardContent className="pb-4 text-justify">
          {postContent}
        </CardContent>
      ) : (
        <CardContent className="space-y-2 pb-4 text-justify">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-full" />
        </CardContent>
      )}

      <CardFooter className="mt-auto justify-end">
        {hasContent ? (
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
        ) : (
          <Skeleton className="h-2 w-7" />
        )}
      </CardFooter>
    </Card>
  )
}

export default PostsCardsSkeleton
