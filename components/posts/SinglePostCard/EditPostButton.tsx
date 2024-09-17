'use client'

import Link from 'next/link'

import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants/constants'

interface IChangePostButtonProps {
  postId?: string
}
const EditPostButton = ({ postId }: IChangePostButtonProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="min-w-[90px] bg-blue-500 text-white hover:bg-blue-500/90 hover:text-white"
      asChild
    >
      <Link href={`${PATHS.blog}/${postId}${PATHS.editPost}`}>
        Edit post
      </Link>
    </Button>
  )
}

export default EditPostButton
