'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { UserRole, type Categories } from '@prisma/client'

import useStore from '~/store'
import { useCleaningItem } from '~/hooks/useCleaningItem'
import { Card, CardHeader, CardContent } from '~/components/ui/card'
import WithRole from '~/components/hoc/WithRole'
import { editCategory } from '~/actions/edit-category'
import {
  destroyImagesInCloudinary,
  saveImagesToCloudinary
} from '~/services/imagesProcessing'
import {
  CLOUDINARY_CATEGORIES_IMAGES_FOLDER,
  PATHS
} from '~/utils/constants'
import CategoryManageForm from '~/components/shared/CategoryManageForm'
import { SingleCategorySchema } from '~/schemas'
import { type TManageCategoryForm } from '~/types'

const EditCategoryPageView = () => {
  const router = useRouter()
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const [categories, editableCategory, setEditableCategory] = useStore(
    (state) => {
      return [
        state.categories,
        state.editableCategory,
        state.setEditableCategory
      ]
    }
  )

  const initialCategory: Categories | {} =
    categories?.find((category) => {
      return category?.id === (editableCategory as Categories)?.id
    }) || {}

  const {
    id: editableCategoryId,
    name,
    slug,
    imageUrl: editableImageUrl,
    description: editableDescription
  } = editableCategory as Categories

  const isEditableCategoryExist = !!Object.values(editableCategory)?.length

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

  useEffect(() => {
    if (Object.values(editableCategory)?.length) {
      form.reset({
        name,
        slug,
        imageUrl: editableImageUrl as string,
        description: editableDescription as string
      })
    }
  }, [isEditableCategoryExist])

  useCleaningItem(setEditableCategory)

  const handleOnSubmit = (values: TManageCategoryForm) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      const isImageUrlExist = !!values?.imageUrl

      const deletedImageUrl: string = (initialCategory as Categories)
        ?.imageUrl as string

      if (!isImageUrlExist && !!deletedImageUrl) {
        try {
          await destroyImagesInCloudinary(
            [deletedImageUrl],
            CLOUDINARY_CATEGORIES_IMAGES_FOLDER
          )
        } catch {
          return
        }
      }

      let newImageUrl: string | null = ''

      const newImage = values?.file || []

      if (newImage?.length) {
        const cloudinaryUrls = await saveImagesToCloudinary(
          newImage,
          CLOUDINARY_CATEGORIES_IMAGES_FOLDER,
          setError
        )

        if (cloudinaryUrls) {
          ;[newImageUrl] = cloudinaryUrls
        }

        if (!newImageUrl) {
          return
        }
      }

      const { file, imageUrl, ...restValues } = values

      const newCategoryValues: Omit<TManageCategoryForm, 'file'> = {
        ...restValues,
        imageUrl: isImageUrlExist ? imageUrl : newImageUrl
      }

      editCategory(newCategoryValues, editableCategoryId)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)

          if (data.success) {
            toast.success(data.success, {
              richColors: true,
              closeButton: true,
              duration: 5000
            })

            setEditableCategory({})

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
          📂 Edit the category
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
            label="Edit category"
          />
        </WithRole>
      </CardContent>
    </Card>
  )
}

export default EditCategoryPageView
