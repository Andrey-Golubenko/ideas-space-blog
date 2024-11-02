'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { type Post } from '@prisma/client'

import useStore from '~/store'
import { useCleaningItem } from '~/hooks/useCleaningItem'
import AppCardWrapper from '~/components/shared/CardWrapper/AppCardWrapper'
import PostManageForm from '~/components/shared/PostManageForm'
import { editPost } from '~/actions/edit-post'
import {
  destroyImagesInCloudinary,
  saveImagesToCloudinary
} from '~/services/imagesProcessing'
import {
  CLOUDINARY_POSTS_IMAGES_FOLDER,
  PATHS
} from '~/utils/constants/constants'
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

  const [posts, singlePost, initCategories, setSinglePost] = useStore(
    (state) => {
      return [
        state.posts,
        state.singlePost,
        state.categories,
        state.setSinglePost
      ]
    }
  )

  const initialPost =
    posts?.find((post) => {
      return post?.id === (singlePost as Post)?.id
    }) || {}

  const {
    id: postId,
    title,
    content,
    imageUrls,
    published,
    categories: editablePostCategories
  } = singlePost as FullPost

  const categoriesFieldValues = editablePostCategories?.map(
    (editPostCategory) => {
      return editPostCategory?.name
    }
  )

  const isDisabled = isPending || !isLogged

  const isEditablePostExist = !!Object.values(singlePost)?.length

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
    if (Object.values(singlePost)?.length) {
      form.reset({
        title,
        content,
        imageUrls,
        published: published || false,
        categories: categoriesFieldValues
      })
    }
  }, [isEditablePostExist])

  useCleaningItem(setSinglePost)

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
          await destroyImagesInCloudinary(
            deletedImageUrls,
            CLOUDINARY_POSTS_IMAGES_FOLDER
          )
        } catch {
          return
        }
      }

      const uploadedFiles = values?.files || []

      let newImageUrlsFromFiles: string[] | null = []

      if (uploadedFiles?.length) {
        newImageUrlsFromFiles = await saveImagesToCloudinary(
          uploadedFiles,
          CLOUDINARY_POSTS_IMAGES_FOLDER,
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

          setSinglePost({})

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
