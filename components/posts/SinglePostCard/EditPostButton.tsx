'use client'

import Link from 'next/link'

import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants/constants'

interface IChangePostButtonProps {
  postId?: string
  isPending: boolean
}
const EditPostButton = ({ postId, isPending }: IChangePostButtonProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isPending}
      className={`min-w-[90px]  text-white  ${!isPending ? 'bg-blue-500 hover:bg-blue-500/90 hover:text-white' : ''}`}
      asChild
    >
      <Link href={`${PATHS.blog}/${postId}${PATHS.editPost}`}>
        Edit post
      </Link>
    </Button>
  )
}

export default EditPostButton
