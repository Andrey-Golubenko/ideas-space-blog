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
import { type TManagePostForm } from '~/types/types'

interface IEditPostCardProps {
  isLogged: boolean
}

const EditPostCard = ({ isLogged }: IEditPostCardProps) => {
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const [posts, editablePost, initCategories, setEditablePost] = useStore(
    (state) => {
      return [
        state.posts,
        state.editablePost,
        state.categories,
        state.setEditablePost
      ]
    }
  )

  const initialPost =
    posts?.find((post) => {
      return post?.id === (editablePost as Post)?.id
    }) || {}

  const {
    id: postId,
    title,
    content,
    imageUrls,
    published,
    categories: editablePostCategories
  } = editablePost as FullPost

  const categoriesFieldValues = editablePostCategories?.map(
    (editPostCategory) => {
      return editPostCategory?.name
    }
  )

  const isDisabled = isPending || !isLogged

  const isEditablePostExist = !!Object.values(editablePost)?.length

  const form = useForm<TManagePostForm>({
    defaultValues: {
      title: '',
      content: '',
      files: [],
      imageUrls: [],
      published: false,
      categories: []
    },
    resolver: zodResolver(ManagePostSchema)
  })

  useEffect(() => {
    if (Object.values(editablePost)?.length) {
      form.reset({
        title,
        content,
        imageUrls,
        published: published || false,
        categories: categoriesFieldValues
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

      const { files, categories, ...restValues } = values

      const categoryIds = (categories as string[])?.map((categoryName) => {
        const selectedCategory = initCategories?.find((initCat) => {
          return initCat.name === categoryName
        })
        return selectedCategory?.id
      })

      const newPostValues: TManagePostForm = {
        ...restValues,
        imageUrls: [...newImageUrlsFromFiles, ...newImageUrls],
        categories: categoryIds
      }

      editPost(newPostValues, postId as string).then((data) => {
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
