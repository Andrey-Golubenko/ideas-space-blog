'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

import { Form } from '~/components/ui/form'
import AuthCardWrapper from '~/components/shared/CardWrapper/AuthCardWrapper'
import NotificationError from '~/components/notifications/NotificationError'
import NotificationSuccess from '~/components/notifications/NotificationSuccess'
import PasswordField from '~/components/shared/PasswordField'
import LoadableButton from '~/components/shared/LoadableButton'
import { newPassword } from '~/actions/new-password'
import { PATHS } from '~/utils/constants'
import { NewPasswordSchema } from '~/schemas'
import { type TManagePasswordForm } from '~/types'

const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<TManagePasswordForm>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: ''
    }
  })

  const onSubmit = (values: TManagePasswordForm) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      newPassword(values, token!).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <AuthCardWrapper
      headerLabel="Enter a new password!"
      backButtonLabel="Go back to login?"
      backButtonHref={PATHS.logIn}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <PasswordField
              name="password"
              label="New password"
              control={form.control}
              isPending={isPending}
            />
          </div>
          <NotificationError message={error} />
          <NotificationSuccess message={success} />

          <LoadableButton
            type="submit"
            isDisabled={isPending}
            label="Reset password"
          />
        </form>
      </Form>
    </AuthCardWrapper>
  )
}
export default NewPasswordForm
