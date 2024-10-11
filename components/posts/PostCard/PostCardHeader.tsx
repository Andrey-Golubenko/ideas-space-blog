'use client'

import Link from 'next/link'

import { cn } from '~/libs/utils'
import { CardHeader } from '~/components/ui/card'
import LoadableImage from '~/components/shared/LoadableImage'
import { fontPoppins } from '~/utils/constants/fonts'
import { IMAGES_PATHS, PATHS } from '~/utils/constants/constants'

interface IPostCardHeaderProps {
  postImage: string
  postTitle: string
  postId: string
}

const PostCardHeader = ({
  postImage,
  postTitle,
  postId
}: IPostCardHeaderProps) => {
  return (
    <>
      <Link
        href={`${PATHS.blog}/${postId}`}
        className="w-full overflow-hidden"
      >
        <LoadableImage
          src={postImage}
          alt="Post image"
          width={130}
          height={100}
          priority={postImage === IMAGES_PATHS.noImages}
          imageClassNames="aspect-[5/4] h-full w-full rounded-t-md object-cover duration-500 hover:rounded-md"
          containerClassNames="rounded-t-md duration-700 hover:scale-110 hover:rounded-t-md"
        />
      </Link>

      <CardHeader className="pb-4">
        <h2
          className={cn(
            'w-full truncate text-2xl font-semibold',
            fontPoppins.className
          )}
        >
          {postTitle}
        </h2>
      </CardHeader>
    </>
  )
}

export default PostCardHeader
