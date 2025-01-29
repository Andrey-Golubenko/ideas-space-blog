'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { UserRole } from '@prisma/client'

import { Card, CardHeader, CardContent } from '~/components/ui/card'
import WithRole from '~/components/hoc/WithRole'
import CategoryManageForm from '~/components/shared/CategoryManageForm'
import { newCategory } from '~/actions/new-category'
import { saveImagesToCld } from '~/services/imagesProcessing'
import { SingleCategorySchema } from '~/schemas'
import { type TManageCategoryForm } from '~/types'
import { CLOUDINARY_CATEGORIES_IMAGES_FOLDER } from '~/utils/constants'

const NewCategoryPageView = () => {
  const router = useRouter()
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<TManageCategoryForm>({
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      file: [],
      imageUrl: ''
    },
    resolver: zodResolver(SingleCategorySchema)
  })

  const handleOnSubmit = (values: TManageCategoryForm) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      let imageUrl: string | null = ''

      const newImage = values?.file || []

      if (newImage?.length) {
        const cloudinaryUrls = await saveImagesToCld(
          newImage,
          CLOUDINARY_CATEGORIES_IMAGES_FOLDER,
          setError
        )

        if (cloudinaryUrls) {
          ;[imageUrl] = cloudinaryUrls
        }

        if (!imageUrl) {
          return
        }
      }

      const { file, ...restValues } = values

      const newCategoryValues = {
        ...restValues,
        imageUrl
      }

      const data = await newCategory(newCategoryValues)

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

  return (
    <Card className="my-12 flex min-h-[420px] flex-col">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">
          🗂️ Create a new category
        </p>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-evenly space-y-4">
        <WithRole allowedRole={UserRole.ADMIN}>
          <CategoryManageForm
            form={form}
            handleOnSubmit={handleOnSubmit}
            isDisabled={isPending}
            success={success}
            error={error}
            label="Create a new category"
          />
        </WithRole>
      </CardContent>
    </Card>
  )
}

export default NewCategoryPageView
