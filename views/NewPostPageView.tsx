'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import { PostStatus } from '@prisma/client'
import { newPost } from '~/actions/new-post'
import { saveImagesToCld } from '~/services/images/images.client'
import AppCardWrapper from '~/components/shared/CardWrapper/AppCardWrapper'
import PostManageForm from '~/components/shared/PostManageForm'
import { CLOUDINARY_POSTS_IMAGES_FOLDER } from '~/utils/constants'
import { isPostListPage } from '~/utils/helpers'
import { ManagePostSchema } from '~/schemas'
import { type TManagePostForm } from '~/types'

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
      status: PostStatus.DRAFT,
      categories: []
    },
    resolver: zodResolver(ManagePostSchema)
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const referrer = searchParams.get('from')

  const handleOnSubmit = (values: TManagePostForm) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      const postId = uuidv4()

      let imageUrls: string[] | null = []

      const newImages = values?.files || []

      if (newImages?.length) {
        imageUrls = await saveImagesToCld(
          newImages,
          `${CLOUDINARY_POSTS_IMAGES_FOLDER}/${postId}`,
          setError
        )

        if (!imageUrls) {
          return
        }
      }

      const { files, ...restValues } = values

      const newPostValues = {
        ...restValues,
        id: postId,
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

        if (referrer && isPostListPage(referrer)) {
          const path = `${referrer}?refresh-posts=${Date.now()}`

          router.refresh()

          router.replace(path)
        } else {
          router.back()
        }
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
