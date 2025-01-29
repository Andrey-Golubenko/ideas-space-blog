'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '~/components/ui/form'
import AuthCardWrapper from '~/components/shared/CardWrapper/AuthCardWrapper'
import NotificationError from '~/components/notifications/NotificationError'
import NotificationSuccess from '~/components/notifications/NotificationSuccess'
import TextField from '~/components/shared/TextField'
import LoadableButton from '~/components/shared/LoadableButton'
import { passwordReset } from '~/actions/reset-password'
import { PATHS } from '~/utils/constants'
import { ResetSchema } from '~/schemas'
import { TManageResetPasswordForm } from '~/types'

const ResetPasswordForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<TManageResetPasswordForm>({
    defaultValues: {
      email: ''
    },
    resolver: zodResolver(ResetSchema)
  })

  const onSubmit = (values: TManageResetPasswordForm) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      const data = await passwordReset(values)

      if (data?.success) {
        setSuccess(data?.success)
      }

      if (data?.error) {
        setError(data?.error)
      }
    })
  }

  return (
    <AuthCardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Go back to login?"
      backButtonHref={PATHS.logIn}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <TextField
              name="email"
              type="email"
              placeholder="email@example.com"
              label="Email"
              control={form.control}
              isPending={isPending}
            />
          </div>

          <NotificationError message={error} />
          <NotificationSuccess message={success} />

          <LoadableButton
            type="submit"
            isDisabled={isPending}
            label="Send reset email"
          />
        </form>
      </Form>
    </AuthCardWrapper>
  )
}

export default ResetPasswordForm
