'use client'

import { useState, useTransition } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import AuthCardWrapper from '~/components/shared/CardWrapper/AuthCardWrapper'
import FormError from '~/components/FormError'
import FormSuccess from '~/components/FormSuccess'
import TextField from '~/components/shared/TextField'
import { ResetSchema } from '~/schemas'
import { PATHS } from '~/utils/constants/constants'
import { passwordReset } from '~/actions/reset-password'

const ResetPasswordForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      passwordReset(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            Send reset email
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  )
}

export default ResetPasswordForm
