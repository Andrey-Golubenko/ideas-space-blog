import { useState, type FormHTMLAttributes } from 'react'
import { type UseFormReturn } from 'react-hook-form'

import { Form } from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import TextField from '~/components/shared/TextField'
import TextAreaField from '~/components/shared/TextAreaField'
import SwitchField from '~/components/shared/SwitchField'
import FilesField from '~/components/shared/FilesField'
import FormError from '~/components/FormError'
import FormSuccess from '~/components/FormSuccess'
import { type TManagePostForm } from '~/types/types'

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
            register={form.register}
            watch={form.watch}
            setValue={form.setValue}
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

        <Button
          type="submit"
          disabled={isDisabled}
          className="w-full"
        >
          {label}
        </Button>
      </form>
    </Form>
  )
}

export default PostManageForm
