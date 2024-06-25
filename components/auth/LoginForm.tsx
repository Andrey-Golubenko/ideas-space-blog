'use client'

import { useState, useTransition } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'

import { Button } from '~/components/ui/button'
import CardWrapper from '~/components/auth/CardWrapper'
import PasswordIcon from '~/components/auth/PasswordIcon'
import FormError from '~/components/FormError'
import FormSuccess from '~/components/FormSuccess'
import { LogInSchema } from '~/schemas'
import { AUTH_ERRORS, PATHS } from '~/utils/constants/constants'
import { logIn } from '~/actions/login'
import { useSearchParams } from 'next/navigation'

const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError =
    searchParams.get('error') === AUTH_ERRORS.duplicateCred
      ? 'Email already in use with different provider!'
      : ''

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LogInSchema>>({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleIconClick = () => setShowPassword((previous) => !previous)

  const onSubmit = (values: z.infer<typeof LogInSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      logIn(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="email@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="*****"
                      type={showPassword ? 'text' : 'password'}
                      inputAdornment={
                        <PasswordIcon
                          showPassword={showPassword}
                          iconClick={handleIconClick}
                        />
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            Log In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm
