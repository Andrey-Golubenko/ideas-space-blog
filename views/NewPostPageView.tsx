'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import AppCardWrapper from '~/components/shared/CardWrapper/AppCardWrapper'
import PostManageForm from '~/components/shared/PostManageForm'
import { newPost } from '~/actions/new-post'
import { CLOUDINARY_POSTS_IMAGES_FOLDER } from '~/utils/constants'
import { saveImagesToCld } from '~/services/imagesProcessing'
import { ManagePostSchema } from '~/schemas'
import { TManagePostForm } from '~/types'

interface INewPostPageViewProps {
  isLogged: boolean
}

const NewPostPageView = ({ isLogged }: INewPostPageViewProps) => {
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<TManagePostForm>({
    defaultValues: {
      title: '',
      content: '',
      files: [],
      published: false,
      categories: []
    },
    resolver: zodResolver(ManagePostSchema)
  })

  const router = useRouter()

  const handleOnSubmit = (values: TManagePostForm) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      const postid = uuidv4()

      let imageUrls: string[] | null = []

      const newImages = values?.files || []

      if (newImages?.length) {
        imageUrls = await saveImagesToCld(
          newImages,
          `${CLOUDINARY_POSTS_IMAGES_FOLDER}/${postid}`,
          setError
        )

        if (!imageUrls) {
          return
        }
      }

      const { files, ...restValues } = values

      const newPostValues = {
        ...restValues,
        id: postid,
        imageUrls
      }

      const data = await newPost(newPostValues)

      if (data?.success) {
        setSuccess(data?.success)

        toast.success(data?.success, {
          richColors: true,
          closeButton: true,
          duration: 5000
        })

        router.back()
      }

      if (data?.error) {
        setError(data?.error)
      }
    })
  }

  const isDisabled = isPending || !isLogged

  return (
    <AppCardWrapper
      headerTitle="📄 Post"
      headerLabel="Create a new post"
    >
      <PostManageForm
        form={form}
        handleOnSubmit={handleOnSubmit}
        label="Create a new post"
        isDisabled={isDisabled}
        success={success}
        error={error}
      />
    </AppCardWrapper>
  )
}

export default NewPostPageView
