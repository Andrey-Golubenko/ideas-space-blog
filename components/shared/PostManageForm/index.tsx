import { type FormHTMLAttributes } from 'react'

import { Form } from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import TextField from '~/components/shared/TextField'
import TextAreaField from '~/components/shared/TextAreaField'
import FormError from '~/components/FormError'
import FormSuccess from '~/components/FormSuccess'
import SwitchField from '~/components/shared/SwitchField'

interface IPostManageFormProps {
  form: any
  handleOnSubmit: (values: any) => void
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
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="space-y-8"
        {...props}
      >
        <div className="space-y-6">
          <TextField
            control={form.control}
            name="title"
            label="Title"
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
