'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import useStore from '~/store'
import AppCardWrapper from '~/components/shared/CardWrapper/AppCardWrapper'
import PostManageForm from '~/components/shared/PostManageForm'
import { newPost } from '~/actions/new-post'
import { PATHS } from '~/utils/constants/constants'
import { saveImagesToCloudinary } from '~/services/posts/imagesProcessing.client'
import { ManagePostSchema } from '~/schemas'
import { TManagePostForm } from '~/types/types'

interface INewPostFormProps {
  isLogged: boolean
}

const NewPostCard = ({ isLogged }: INewPostFormProps) => {
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const [initCategories] = useStore((state) => {
    return [state.categories]
  })

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
      let imageUrls: string[] | null = []

      const newImages = values?.files || []

      if (newImages?.length) {
        imageUrls = await saveImagesToCloudinary(newImages, setError)

        if (!imageUrls) {
          return
        }
      }

      const { files, categories, ...restValues } = values

      const categoriesWithId = initCategories?.filter((category) => {
        return categories?.includes(category?.name)
      })

      const newPostValues = {
        ...restValues,
        imageUrls,
        categories: categoriesWithId
      }

      newPost(newPostValues)
        .then((data) => {
          setError(data?.error)
          setSuccess(data?.success)

          if (data?.success) {
            toast.success(data?.success, {
              richColors: true,
              closeButton: true,
              duration: 5000
            })

            router.push(`${PATHS.blog}`)
          }
        })
        .catch(() => {
          return setError('Somthing went wrong!')
        })
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

export default NewPostCard
