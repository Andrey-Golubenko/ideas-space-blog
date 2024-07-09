'use client'

import { useState, useTransition } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import CardWrapper from '~/components/auth/CardWrapper'
import FormError from '~/components/FormError'
import FormSuccess from '~/components/FormSuccess'
import TextField from '~/components/shared/TextField'
import PasswordField from '~/components/shared/PasswordField'
import { RegisterSchema } from '~/schemas'
import { register } from '~/actions/register'
import { PATHS } from '~/utils/constants/constants'

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      register(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <CardWrapper
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm
