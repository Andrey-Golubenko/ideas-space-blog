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
      className={`h-10 w-[40%] min-w-[90px] rounded-lg text-white md:w-[35%] lg:w-[25%] ${!isPending ? 'bg-blue-700 hover:bg-blue-700/90 hover:text-white' : ''}`}
      asChild
    >
      <Link href={`${PATHS.blog}/${postId}${PATHS.editPost}`}>
        Edit post
      </Link>
    </Button>
  )
}

export default EditPostButton
