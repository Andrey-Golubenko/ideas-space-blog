import { type HTMLAttributes } from 'react'

import { PostStatus } from '@prisma/client'
import { cn } from '~/libs/utils'
import { toUpperCaseFirstChar } from '~/utils/helpers'

interface IPostMetaStatusProps extends HTMLAttributes<HTMLSpanElement> {
  status: PostStatus
  additionalClassNames?: string
}

const PostMetaStatus = ({
  status,
  additionalClassNames,
  ...props
}: IPostMetaStatusProps) => {
  const isPublished = status === PostStatus.PUBLISHED

  const isDraft = status === PostStatus.DRAFT

  const formattedStatus = toUpperCaseFirstChar(status)

  return (
    <span
      className={cn(
        additionalClassNames,
        isPublished && 'text-green-600',
        isDraft && 'text-red-800'
      )}
      {...props}
    >
      {formattedStatus}
    </span>
  )
}

export default PostMetaStatus
