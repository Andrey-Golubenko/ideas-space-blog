'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { UserRole } from '@prisma/client'

import { Card, CardHeader, CardContent } from '~/components/ui/card'
import { Form } from '~/components/ui/form'
import TextAreaField from '~/components/shared/TextAreaField'
import FilesField from '~/components/shared/FilesField'
import TextField from '~/components/shared/TextField'
import LoadableButton from '~/components/shared/LoadableButton'
import FormError from '~/components/FormError'
import FormSuccess from '~/components/FormSuccess'
import RoleGate from '~/components/auth/RoleGate'

import { newCategory } from '~/actions/new-category'
import { saveImagesToCloudinary } from '~/services/posts/imagesProcessing.client'
import { SingleCategorySchema } from '~/schemas'
import { TManageCategoryForm } from '~/types/types'
import { PATHS } from '~/utils/constants/constants'

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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-8"
            >
              <div className="space-y-6">
                <TextField
                  control={form.control}
                  name="name"
                  label="Category name"
                  placeholder="Unique name for the category"
                  isPending={isPending}
                />

                <TextField
                  control={form.control}
                  name="slug"
                  label="Category slug"
                  placeholder="The URL of the category page, in lowercase only, separated by a dash"
                  isPending={isPending}
                />

                <FilesField
                  name="file"
                  additionalName="imageUrl"
                  validateErrors={form.formState.errors.file}
                  isPending={isPending}
                />

                <TextAreaField
                  control={form.control}
                  name="description"
                  label="Category description"
                  placeholder="A short description of the category"
                  isPending={isPending}
                />

                <FormError message={error} />
                <FormSuccess message={success} />

                <LoadableButton
                  type="submit"
                  isDisabled={isPending}
                  label="Create a new category"
                />
              </div>
            </form>
          </Form>
        </RoleGate>
      </CardContent>
    </Card>
  )
}

export default NewCategoryPageView
