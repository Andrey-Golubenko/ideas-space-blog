'use client'

import Link from 'next/link'
import { type ButtonHTMLAttributes } from 'react'

import { Button } from '~/components/ui/button'
import { PATHS } from '~/utils/constants'

interface IEditPostButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  postId?: string
}
const EditPostButton = ({ postId, ...props }: IEditPostButtonProps) => {
  if (!postId) return null

  return (
    <Button
      variant="outline"
      className="h-10 w-[45%] min-w-[90px] rounded-lg border border-black/20 bg-blue-200 hover:bg-blue-200/70 md:w-[35%] lg:w-[25%]"
      asChild
      {...props}
    >
      <Link href={`${PATHS.editPost(postId)}`}>Edit post</Link>
    </Button>
  )
}

export default EditPostButton
