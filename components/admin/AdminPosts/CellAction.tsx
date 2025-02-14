'use client'

import { useCallback, useState } from 'react'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

import useGlobalStore from '~/store'
import { usePostsFilters } from '~/hooks/usePostsFilters'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import DeletePostHandler from '~/components/shared/DeleteHandlers/DeletePostHandler'
import { PATHS } from '~/utils/constants'
import { type TDeserializedPost } from '~/types'

interface ICellActionProps {
  postId: string
}

const CellAction = ({ postId }: ICellActionProps) => {
  const [posts, setSinglePost] = useGlobalStore((state) => {
    return [state.posts, state.setSinglePost]
  })

  const [open, setOpen] = useState(false)

  const router = useRouter()

  const postToProcessing =
    (posts as TDeserializedPost[]).find((post) => {
      return post?.id === postId
    }) ?? null

  const { setPage } = usePostsFilters()

  const onPostDeleteSuccess = useCallback(() => {
    setPage(1)
  }, [])

  const handleOnDelete = useCallback(() => {
    setOpen(true)
  }, [])

  const handleOnUpdate = useCallback(() => {
    if (postToProcessing) {
      setSinglePost(postToProcessing)

      router.push(`${PATHS.adminEditPost(postId)}`)
    }
  }, [postId, postToProcessing])

  const imageUrls = postToProcessing ? postToProcessing?.imageUrls : []

  return (
    <>
      <DeletePostHandler
        postId={postId}
        imageUrls={imageUrls || []}
        isOpen={open}
        setIsOpen={setOpen}
        onPostDeleteSuccess={onPostDeleteSuccess}
      />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={handleOnUpdate}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOnDelete}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction
