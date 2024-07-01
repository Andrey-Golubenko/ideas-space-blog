'use client'

import { useState, useTransition } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

import { Form } from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import CardWrapper from '~/components/auth/CardWrapper'
import FormError from '~/components/FormError'
import FormSuccess from '~/components/FormSuccess'
import PasswordField from '~/components/shared/passwordField'
import EmailField from '~/components/shared/emailField'
import TextField from '~/components/shared/TextField'
import { LogInSchema } from '~/schemas'
import { AUTH_ERRORS, PATHS } from '~/utils/constants/constants'
import { logIn } from '~/actions/login'

const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError =
    searchParams.get('error') === AUTH_ERRORS.duplicateCred
      ? 'Email already in use with different provider!'
      : ''

  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LogInSchema>>({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      email: '',
      password: '',
      code: ''
    }
  })

  const onSubmit = (values: z.infer<typeof LogInSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      logIn(values)
        .then((data) => {
          if (data?.error) {
            form.reset()
            setError(data?.error)
          }

          if (data?.success) {
            form.reset()
            setSuccess(data?.success)
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true)
          }
        })
        .catch(() => setError('Somthing went wrong!'))
    })
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref={PATHS.register}
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
                <EmailField
                  control={form.control}
                  isPending={isPending}
                />
                <PasswordField
                  control={form.control}
                  isPending={isPending}
                  withLink
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            {showTwoFactor ? 'Confirm' : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm
