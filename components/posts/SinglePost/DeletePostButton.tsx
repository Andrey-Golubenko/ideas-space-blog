'use client'

import { useCallback, useState, type ButtonHTMLAttributes } from 'react'
import { useRouter } from 'next/navigation'

import useGlobalStore from '~/store'
import { Button } from '~/components/ui/button'
import DeletePostHandler from '~/components/shared/DeleteHandlers/DeletePostHandler'
import { PATHS } from '~/utils/constants'

interface IPostDeleteButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  postId: string
  imageUrls: string[]
}

const DeletePostButton = ({
  postId,
  imageUrls,
  ...props
}: IPostDeleteButtonProps) => {
  const { setSinglePost } = useGlobalStore((state) => {
    return { setSinglePost: state.setSinglePost }
  })

  const [open, setOpen] = useState(false)

  const router = useRouter()

  const onPostDeleteSuccess = useCallback(() => {
    router.push(PATHS.blog)
    setSinglePost({})
  }, [])

  return (
    <>
      <DeletePostHandler
        postId={postId}
        imageUrls={imageUrls || []}
        isOpen={open}
        setIsOpen={setOpen}
        onPostDeleteSuccess={onPostDeleteSuccess}
      />

      <Button
        onClick={() => {
          setOpen(true)
        }}
        className="h-10 w-[45%] min-w-[90px] rounded-lg border border-black/20 bg-red-700/85 hover:bg-red-700/75 md:w-[35%] lg:w-[25%]"
        {...props}
      >
        Delete post
      </Button>
    </>
  )
}

export default DeletePostButton
