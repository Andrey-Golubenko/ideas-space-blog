'use client'

import { useEffect, useState, type FormHTMLAttributes } from 'react'
import { type UseFormReturn } from 'react-hook-form'

import useStore from '~/store'
import { Form } from '~/components/ui/form'
import TextField from '~/components/shared/TextField'
import TextAreaField from '~/components/shared/TextAreaField'
import SwitchField from '~/components/shared/SwitchField'
import FilesField from '~/components/shared/FilesField'
import MultiSelectField from '~/components/shared/MultiSelectField'
import FormError from '~/components/FormError'
import FormSuccess from '~/components/FormSuccess'
import LoadableButton from '~/components/shared/LoadableButton'
import {
  type IMultiSelectProps,
  type TManagePostForm
} from '~/types/types'
import { toUpperCaseFirstChar } from '~/utils/helpers/helpers'

interface IPostManageFormProps {
  form: UseFormReturn<TManagePostForm>
  handleOnSubmit: (values: TManagePostForm) => void
  label: string
  isDisabled: boolean
  success?: string
  error?: string
}

const PostManageForm = ({
  form,
  handleOnSubmit,
  label,
  isDisabled,
  success,
  error,
  ...props
}: IPostManageFormProps & FormHTMLAttributes<HTMLFormElement>) => {
  const [filesDuplicates, setFilesDuplicate] = useState<string[] | []>([])

  const [categories, getAllCategories] = useStore((state) => {
    return [state.categories, state.getAllCategories]
  })

  useEffect(() => {
    getAllCategories()
  }, [])

  const multiOptions: IMultiSelectProps['options'] =
    categories?.map((category) => {
      const categoryName = toUpperCaseFirstChar(category?.name)

      return { label: categoryName, value: categoryName }
    }) || []

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="space-y-8"
        encType="multipart/form-data"
        {...props}
      >
        <div className="space-y-6">
          <TextField
            control={form.control}
            name="title"
            label="Title"
            isPending={isDisabled}
          />

          <FilesField
            name="files"
            filesDuplicates={filesDuplicates}
            setFilesDuplicate={setFilesDuplicate}
            validateErrors={form.formState.errors.files}
            isPending={isDisabled}
          />

          <TextAreaField
            control={form.control}
            name="content"
            label="Post content"
            isPending={isDisabled}
          />

          <MultiSelectField
            options={multiOptions}
            control={form.control}
            name="categories"
            label="Post categories"
            isPending={isDisabled}
            placeholder="Select category or categories"
          />

          <SwitchField
            control={form.control}
            name="published"
            label="Publish the post?"
            description="Enabled the ability for all users to view your post."
            isPending={isDisabled}
          />
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <LoadableButton
          type="submit"
          isDisabled={isDisabled}
          label={label}
        />
      </form>
    </Form>
  )
}

export default PostManageForm
