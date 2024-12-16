'use client'

import Link from 'next/link'

import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants'

interface IChangePostButtonProps {
  postId?: string
  isPending: boolean
}
const EditPostButton = ({ postId, isPending }: IChangePostButtonProps) => {
  return (
    <Button
      variant="outline"
      disabled={isPending}
      className={`h-10 w-[45%] min-w-[90px] rounded-lg md:w-[35%] lg:w-[25%] ${!isPending ? 'border border-black/20 bg-blue-200 hover:bg-blue-200/70' : ''}`}
      asChild
    >
      <Link href={`${PATHS.blog}/${postId}${PATHS.editPost}`}>
        Edit post
      </Link>
    </Button>
  )
}

export default EditPostButton
