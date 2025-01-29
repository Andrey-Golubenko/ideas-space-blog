'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '~/components/ui/form'
import AuthCardWrapper from '~/components/shared/CardWrapper/AuthCardWrapper'
import NotificationError from '~/components/notifications/NotificationError'
import NotificationSuccess from '~/components/notifications/NotificationSuccess'
import TextField from '~/components/shared/TextField'
import PasswordField from '~/components/shared/PasswordField'
import LoadableButton from '~/components/shared/LoadableButton'
import { RegisterSchema } from '~/schemas'
import { register } from '~/actions/register'
import { PATHS } from '~/utils/constants'
import { type TManageRegisterForm } from '~/types'

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<TManageRegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: TManageRegisterForm) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      const data = await register(values)

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
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref={PATHS.logIn}
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <TextField
              name="name"
              placeholder="John Doe"
              label="Name"
              control={form.control}
              isPending={isPending}
            />
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
            />
          </div>

          <NotificationError message={error} />
          <NotificationSuccess message={success} />

          <LoadableButton
            type="submit"
            isDisabled={isPending}
            label="Create an account"
          />
        </form>
      </Form>
    </AuthCardWrapper>
  )
}

export default RegisterForm
