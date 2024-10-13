'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { type Post } from '@prisma/client'

import useStore from '~/store'
import AppCardWrapper from '~/components/shared/CardWrapper/AppCardWrapper'
import PostManageForm from '~/components/shared/PostManageForm'
import { editPost } from '~/actions/edit-post'
import {
  destroyImagesInCloudinary,
  saveImagesToCloudinary
} from '~/services/posts/imagesProcessing.client'
import { PATHS } from '~/utils/constants/constants'
import { ManagePostSchema } from '~/schemas'
import { TManagePostForm } from '~/types/types'

interface IEditPostCardProps {
  isLogged: boolean
}

const EditPostCard = ({ isLogged }: IEditPostCardProps) => {
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const [posts, editablePost, setEditablePost] = useStore((state) => {
    return [state.posts, state.editablePost, state.setEditablePost]
  })

  const initialPost =
    posts?.find((post) => {
      return post?.id === (editablePost as Post)?.id
    }) || {}

  const {
    id: postId,
    title,
    content,
    imageUrls,
    published
  } = editablePost as Post

  const isDisabled = isPending || !isLogged

  const form = useForm<TManagePostForm>({
    defaultValues: {
      title: '',
      content: '',
      files: [],
      imageUrls: [],
      published: false
    },
    resolver: zodResolver(ManagePostSchema)
  })

  const isEditablePostExist = !!Object.values(editablePost)?.length

  useEffect(() => {
    if (Object.values(editablePost)?.length) {
      form.reset({
        title,
        content,
        imageUrls,
        published: published || false
      })
    }
  }, [isEditablePostExist])

  const handleOnSubmit = (values: TManagePostForm) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      const newImageUrls = values?.imageUrls || []
      const initialPostImageUrls = (initialPost as Post)?.imageUrls || []

      const isImageUrlsChanged =
        (initialPostImageUrls?.length || 0) > (newImageUrls?.length || 0)

      if (isImageUrlsChanged) {
        const deletedImageUrls = initialPostImageUrls?.filter((url) => {
          return !newImageUrls?.includes(url)
        })

        try {
          await destroyImagesInCloudinary(deletedImageUrls)
        } catch {
          return
        }
      }

      const uploadedFiles = values?.files || []

      let newImageUrlsFromFiles: string[] | null = []

      if (uploadedFiles?.length) {
        newImageUrlsFromFiles = await saveImagesToCloudinary(
          uploadedFiles,
          setError
        )

        if (!newImageUrlsFromFiles) {
          return
        }

        if (error) return
      }

      const { files, ...restValues } = values

      const newPostValues = {
        ...restValues,
        imageUrls: [...newImageUrlsFromFiles, ...newImageUrls]
      }

      editPost(newPostValues, postId).then((data) => {
        setError(data.error)
        setSuccess(data.success)

        if (data.success) {
          toast.success(data.success, {
            richColors: true,
            closeButton: true,
            duration: 5000
          })

          setEditablePost({})

          router.push(`${PATHS.blog}/${postId}`)
        }
      })
    })
  }

  return (
    <AppCardWrapper
      headerTitle="📄 Post"
      headerLabel={`Edit post - ${title || ''}`}
    >
      <PostManageForm
        form={form}
        handleOnSubmit={handleOnSubmit}
        label="Edit post"
        isDisabled={isDisabled}
        success={success}
        error={error}
      />
    </AppCardWrapper>
  )
}

export default EditPostCard
