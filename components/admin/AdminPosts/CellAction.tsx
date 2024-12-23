'use client'

import { useCallback, useMemo, useState, useTransition } from 'react'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import useStore from '~/store'
import { deletePost } from '~/actions/delete-post'
import { destroyImagesInCloudinary } from '~/services/imagesProcessing'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import AlertModal from '~/components/shared/Modal/AlertModal'
import { CLOUDINARY_POSTS_IMAGES_FOLDER, PATHS } from '~/utils/constants'

interface ICellActionProps {
  postId: string
}

const CellAction = ({ postId }: ICellActionProps) => {
  const [dataTablePosts, getDataTablePosts, setSinglePost] = useStore(
    (state) => {
      return [
        state.dataTablePosts,
        state.getDataTablePosts,
        state.setSinglePost
      ]
    }
  )

  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const postToProcessing =
    dataTablePosts.find((post) => {
      return post?.id === postId
    }) ?? null

  const handleOnUpdate = useCallback(() => {
    if (postToProcessing) {
      setSinglePost(postToProcessing)

      router.push(`${PATHS.adminEditPost}${postId}`)
    }
  }, [postId, postToProcessing])

  const handleOnDelete = useCallback(() => {
    setOpen(true)
  }, [])

  const imageUrls = postToProcessing ? postToProcessing?.imageUrls : []

  const onConfirm = () => {
    startTransition(async () => {
      if (postId) {
        if (imageUrls?.length) {
          try {
            await destroyImagesInCloudinary(
              imageUrls,
              CLOUDINARY_POSTS_IMAGES_FOLDER
            )
          } catch (error) {
            console.error('Error destroying images:', error)

            return
          }
        }

        try {
          const data = await deletePost(postId)

          if (data?.error) {
            toast.error(data?.error, {
              richColors: true,
              closeButton: true
            })
          } else if (data?.success) {
            toast.success(data?.success, {
              richColors: true,
              closeButton: true
            })

            getDataTablePosts({
              currentPage: 1,
              limit: 10,
              categoriesFilter: null,
              publishedFilter: null,
              searchQuery: null
            })
          }
        } catch (error) {
          console.error('Error deleting post:', error)
          toast.error('Failed to delete post.')
        } finally {
          setOpen(false)
        }
      }
    })
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          return setOpen(false)
        }}
        onConfirm={onConfirm}
        loading={isPending}
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
