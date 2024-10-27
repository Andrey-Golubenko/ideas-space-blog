'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { UserRole } from '@prisma/client'

import { Card, CardHeader, CardContent } from '~/components/ui/card'
import RoleGate from '~/components/auth/RoleGate'
import CategoryManageForm from '~/components/shared/CategoryManageForm'
import { newCategory } from '~/actions/new-category'
import { saveImagesToCloudinary } from '~/services/imagesProcessing'
import { SingleCategorySchema } from '~/schemas'
import { TManageCategoryForm } from '~/types/types'
import {
  CLOUDINARY_CATEGORIES_IMAGES_FOLDER,
  PATHS
} from '~/utils/constants/constants'

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
        const cloudinaryUrls = await saveImagesToCloudinary(
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

      newCategory(newCategoryValues)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)

          if (data.success) {
            toast.success(data.success, {
              richColors: true,
              closeButton: true,
              duration: 5000
            })

            router.push(PATHS.categories)
          }
        })
        .catch(() => {
          return setError('Somthing went wrong!')
        })
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
        <RoleGate allowedRole={UserRole.ADMIN}>
          <CategoryManageForm
            form={form}
            handleOnSubmit={handleOnSubmit}
            isDisabled={isPending}
            success={success}
            error={error}
            label="Create a new category"
          />
        </RoleGate>
      </CardContent>
    </Card>
  )
}

export default NewCategoryPageView
