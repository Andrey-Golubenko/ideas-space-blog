'use client'

import { type Post } from '@prisma/client'
import { Poppins } from 'next/font/google'
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
import { toUpperCaseFirstChar } from '~/utils/helpers/helpers'

interface IpostCardProps {
  post: Post
  isLoading: boolean
}

const font = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

const PostCard = ({ post, isLoading }: IpostCardProps) => {
  const postTitle = toUpperCaseFirstChar(post?.title)

  const postContent = `${toUpperCaseFirstChar(post?.content.slice(0, 120))}...`

  return (
    <Card
      className={cn(
        'flex transform flex-col rounded-md shadow-md transition-all delay-500 duration-1000 ease-in-out',
        isLoading && !post
          ? 'translate-y-18 opacity-0 '
          : 'translate-y-0 opacity-100'
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex w-full items-center justify-start">
          <Link href={`${PATHS.blog}/${post?.id}`}>
            <h2 className={cn('text-2xl font-semibold', font.className)}>
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
