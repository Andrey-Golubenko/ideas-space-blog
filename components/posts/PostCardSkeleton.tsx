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

interface IPostCardSkeletonProps {
  post?: Post
  isLoading: boolean
}

const PostCardSkeleton = ({ post, isLoading }: IPostCardSkeletonProps) => {
  const hasContent = post && !isLoading

  const postTitle = toUpperCaseFirstChar(post?.title)

  const postContent = `${toUpperCaseFirstChar(post?.content.slice(0, 120))}...`

  return (
    <Card
      className={`flex flex-col rounded-md shadow-md sm:last:col-span-2 md:last:col-span-1 ${post ? 'min-h-max' : 'min-h-[290px]'}`}
    >
      {hasContent ? (
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
      ) : (
        <CardHeader className="pb-8">
          <Skeleton className="h-7 w-full" />
        </CardHeader>
      )}
      {hasContent ? (
        <CardContent className="pb-10 text-justify">
          <div className="rounded-xl bg-slate-100 px-4 py-2">
            {postContent}
          </div>
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
            className="font-normal"
            size="sm"
            asChild
          >
            <Link href={`${PATHS.blog}/${post?.id}`}>
              <span className="rounded-lg bg-slate-100 px-2 py-2">
                Read more . . .
              </span>
            </Link>
          </Button>
        ) : (
          <Skeleton className="h-2 w-7" />
        )}
      </CardFooter>
    </Card>
  )
}

export default PostCardSkeleton
