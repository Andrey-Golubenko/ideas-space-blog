'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { UserRole, type Categories } from '@prisma/client'

import useGlobalStore from '~/store'
import { useCleaningItem } from '~/hooks/useCleaningItem'
import { Card, CardHeader, CardContent } from '~/components/ui/card'
import CategoryManageForm from '~/components/shared/CategoryManageForm'
import WithRole from '~/components/hoc/WithRole'
import { editCategory } from '~/actions/edit-category'
import {
  destroyImagesInCld,
  saveImagesToCld
} from '~/services/imagesProcessing'
import { CLOUDINARY_CATEGORIES_IMAGES_FOLDER } from '~/utils/constants'
import { SingleCategorySchema } from '~/schemas'
import { type TManageCategoryForm } from '~/types'

const EditCategoryPageView = () => {
  const router = useRouter()
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const { editableCategory, setEditableCategory } = useGlobalStore(
    (state) => {
      return {
        editableCategory: state.editableCategory,
        setEditableCategory: state.setEditableCategory
      }
    }
  )

  const {
    id,
    name,
    slug,
    imageUrl: editableImageUrl,
    description: editableDescription
  } = editableCategory as Categories

  const isEditableCategoryExist = !!Object.values(editableCategory)?.length

  const form = useForm<TManageCategoryForm>({
    defaultValues: {
      id: '',
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
        id,
        name,
        slug,
        imageUrl: editableImageUrl as string,
        description: editableDescription as string
      })
    }
  }, [isEditableCategoryExist])

  const handleOnSubmit = (values: TManageCategoryForm) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      const initialImageUrl: string | null = (
        editableCategory as Categories
      )?.imageUrl as string

      const isImageUrlChanged: boolean =
        initialImageUrl !== values?.imageUrl

      if (initialImageUrl && isImageUrlChanged) {
        try {
          await destroyImagesInCld(
            [initialImageUrl],
            CLOUDINARY_CATEGORIES_IMAGES_FOLDER
          )
        } catch {
          return
        }
      }

      let newImageUrl: string | null = initialImageUrl

      const newImage = values?.file || []

      if (newImage?.length) {
        const cloudinaryUrls = await saveImagesToCld(
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
        imageUrl: newImageUrl
      }

      const data = await editCategory(newCategoryValues)

      if (data?.success) {
        setSuccess(data?.success)

        toast.success(data?.success, {
          richColors: true,
          closeButton: true,
          duration: 5000
        })

        setEditableCategory({})

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
