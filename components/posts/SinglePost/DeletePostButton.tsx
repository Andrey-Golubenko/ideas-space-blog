'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

import useStore from '~/store'
import { Button } from '~/components/ui/button'
import DeletePostHandler from '~/components/shared/DeleteHandlers/DeletePostHandler'
import { PATHS } from '~/utils/constants'

interface IPostDeleteButtonProps {
  postId: string
  imageUrls: string[]
}

const DeletePostButton = ({
  postId,
  imageUrls
}: IPostDeleteButtonProps) => {
  const [setSinglePost] = useStore((state) => {
    return [state.setSinglePost]
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
      >
        Delete post
      </Button>
    </>
  )
}

export default DeletePostButton
