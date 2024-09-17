'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import AppCardWrapper from '~/components/shared/CardWrapper/AppCardWrapper'
import PostManageForm from '~/components/shared/PostManageForm'
import { newPost } from '~/actions/new-post'
import { PATHS } from '~/utils/constants/constants'
import { uploadImageToCloudinary } from '~/services/images'
import { ManagePostSchema } from '~/schemas'
import { TManagePostForm } from '~/types/types'

interface INewPostFormProps {
  isLogged: boolean
}

const NewPostCard = ({ isLogged }: INewPostFormProps) => {
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<TManagePostForm>({
    defaultValues: {
      title: '',
      content: '',
      files: [],
      published: false
    },
    resolver: zodResolver(ManagePostSchema)
  })

  const router = useRouter()

  const handleOnSubmit = (values: TManagePostForm) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      const imageUrls: string[] = []

      if (values?.files?.length) {
        const uploadPromises = values?.files?.map((file: File) => {
          const formData = new FormData()

          formData.append('file', file, file?.name)

          return uploadImageToCloudinary(formData)
        })

        const uploadResults = await Promise.all(uploadPromises)

        uploadResults.forEach((result) => {
          if (result.error) {
            setError(result.error)

            return null
          }

          return imageUrls.push(result.url!)
        })

        if (error) return
      }

      const { files, ...restValues } = values

      const newPostValues = { ...restValues, imageUrls }

      newPost(newPostValues)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)

          if (data.success) {
            toast.success(data.success, {
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
