'use client'

import { type FormHTMLAttributes } from 'react'
import { type UseFormReturn } from 'react-hook-form'

import { Form } from '~/components/ui/form'
import TextField from '~/components/shared/TextField'
import TextAreaField from '~/components/shared/TextAreaField'
import FilesField from '~/components/shared/FilesField'
import NotificationError from '~/components/notifications/NotificationError'
import NotificationSuccess from '~/components/notifications/NotificationSuccess'
import LoadableButton from '~/components/shared/LoadableButton'
import { TManageCategoryForm } from '~/types'

interface IPostManageFormProps {
  form: UseFormReturn<TManageCategoryForm>
  handleOnSubmit: (values: TManageCategoryForm) => void
  label: string
  isDisabled: boolean
  success?: string
  error?: string
}

const CategoryManageForm = ({
  form,
  handleOnSubmit,
  label,
  isDisabled,
  success,
  error,
  ...props
}: IPostManageFormProps & FormHTMLAttributes<HTMLFormElement>) => {
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
            name="name"
            autoComplete="name"
            label="Category name"
            placeholder="Unique name for the category"
            isPending={isDisabled}
          />

          <TextField
            control={form.control}
            name="slug"
            autoComplete="off"
            label="Category slug"
            placeholder="The URL of the category page, in lowercase only, separated by a dash"
            isPending={isDisabled}
          />

          <FilesField
            name="file"
            autoComplete="off"
            additionalName="imageUrl"
            isWithSingleImage
            validateErrors={form.formState.errors.file}
            isPending={isDisabled}
          />

          <TextAreaField
            control={form.control}
            name="description"
            autoComplete="off"
            label="Category description"
            placeholder="A short description of the category"
            isPending={isDisabled}
            maxLength={200}
            rows={5}
          />

          <NotificationError message={error} />
          <NotificationSuccess message={success} />

          <LoadableButton
            type="submit"
            isDisabled={isDisabled}
            label={label}
          />
        </div>
      </form>
    </Form>
  )
}

export default CategoryManageForm
