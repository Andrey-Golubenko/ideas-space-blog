'use client'

import { type UseFormReturn } from 'react-hook-form'

import { Form } from '~/components/ui/form'
import FormError from '~/components/FormError'
import FormSuccess from '~/components/FormSuccess'
import PasswordField from '~/components/shared/PasswordField'
import TextField from '~/components/shared/TextField'
import LoadableButton from '~/components/shared/LoadableButton'
import { type TManageLoginForm } from '~/types'

interface ILoginFormProps {
  form: UseFormReturn<TManageLoginForm>
  handleOnSubmit: (values: TManageLoginForm) => void
  showTwoFactor: boolean
  isPending: boolean
  urlError: string
  error?: string
  success?: string
}

const LoginForm = ({
  form,
  handleOnSubmit,
  showTwoFactor,
  isPending,
  urlError,
  error,
  success
}: ILoginFormProps) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          {showTwoFactor && (
            <TextField
              name="code"
              label="Two Factor Code"
              placeholder="123456"
              control={form.control}
              isPending={isPending}
            />
          )}

          {!showTwoFactor && (
            <>
              <TextField
                name="email"
                type="email"
                placeholder="email@example.com"
                label="Email"
                control={form.control}
                isPending={isPending}
              />
              <PasswordField
                name="password"
                label="Password"
                control={form.control}
                isPending={isPending}
                withLink
              />
            </>
          )}
        </div>
        <FormError message={error || urlError} />
        <FormSuccess message={success} />

        <LoadableButton
          type="submit"
          isDisabled={isPending}
          label={showTwoFactor ? 'Confirm' : 'Login'}
        />
      </form>
    </Form>
  )
}

export default LoginForm
