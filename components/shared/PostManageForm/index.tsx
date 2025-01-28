'use client'

import { useState, type FormHTMLAttributes } from 'react'
import { type UseFormReturn } from 'react-hook-form'

import { useCategoriesOptions } from '~/hooks/useCategoriesOptions'
import { Form } from '~/components/ui/form'
import TextField from '~/components/shared/TextField'
import TextAreaField from '~/components/shared/TextAreaField'
import FilesField from '~/components/shared/FilesField'
import SwitchField from '~/components/shared/SwitchField'
import MultiSelectField from '~/components/shared/MultiSelectField'
import NotificationError from '~/components/notifications/NotificationError'
import NotificationSuccess from '~/components/notifications/NotificationSuccess'
import LoadableButton from '~/components/shared/LoadableButton'
import { type TManagePostForm } from '~/types'

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

  const { categoriesOptions } = useCategoriesOptions()

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
            additionalName="imageUrls"
            multiple
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
            rows={7}
          />

          <MultiSelectField
            options={categoriesOptions}
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

        <NotificationError message={error} />
        <NotificationSuccess message={success} />

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
