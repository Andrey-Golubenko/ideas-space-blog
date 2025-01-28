import { FormHTMLAttributes } from 'react'
import { type UseFormReturn } from 'react-hook-form'

import { Form } from '~/components/ui/form'
import NotificationError from '~/components/notifications/NotificationError'
import NotificationSuccess from '~/components/notifications/NotificationSuccess'
import TextField from '~/components/shared/TextField'
import PasswordField from '~/components/shared/PasswordField'
import SelectField from '~/components/shared/SelectField'
import SwitchField from '~/components/shared/SwitchField'
import LoadableButton from '~/components/shared/LoadableButton'
import { TManageUserForm } from '~/types'

interface IUserManageFormProps {
  isUserOAuth: boolean
  form: UseFormReturn<TManageUserForm>
  handleOnSubmit: (values: TManageUserForm) => void
  label: string
  isDisabled: boolean
  success?: string
  error?: string
}

const UserManageForm = ({
  isUserOAuth,
  form,
  handleOnSubmit,
  label,
  isDisabled,
  success,
  error,
  ...props
}: IUserManageFormProps & FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <Form {...form}>
      <form
        className="flex flex-grow flex-col justify-evenly space-y-6"
        onSubmit={form.handleSubmit(handleOnSubmit)}
        {...props}
      >
        <div className="space-y-4">
          <TextField
            name="name"
            type="text"
            placeholder="John Doe"
            label="Name"
            control={form.control}
            isPending={isDisabled}
          />

          {!isUserOAuth && (
            <>
              <TextField
                name="email"
                type="email"
                placeholder="email@example.com"
                label="Email"
                control={form.control}
                isPending={isDisabled}
              />

              <PasswordField
                name="password"
                label="Password"
                control={form.control}
                isPending={isDisabled}
              />

              <PasswordField
                name="newPassword"
                label="New password"
                control={form.control}
                isPending={isDisabled}
              />
            </>
          )}

          <SelectField
            name="role"
            label="Role"
            placeholder="Select a Role"
            control={form.control}
            isPending={isDisabled}
          />

          {!isUserOAuth && (
            <SwitchField
              name="isTwoFactorEnabled"
              label="Two Factor Authentication"
              description="Enabled two factor authentication for your account"
              control={form.control}
              isPending={isDisabled}
            />
          )}
        </div>

        <NotificationError message={error} />
        <NotificationSuccess message={success} />

        <LoadableButton
          type="submit"
          isDisabled={isDisabled}
          label="Save"
        />
      </form>
    </Form>
  )
}

export default UserManageForm
