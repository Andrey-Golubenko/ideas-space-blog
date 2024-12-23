'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

import AuthCardWrapper from '~/components/shared/CardWrapper/AuthCardWrapper'
import LoginForm from '~/components/auth/LoginForm'
import { logIn } from '~/actions/login'
import { LogInSchema } from '~/schemas'
import { AUTH_ERRORS, PATHS } from '~/utils/constants'
import { type TManageLoginForm } from '~/types'

const LoginPageView = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError: string =
    searchParams.get('error') === AUTH_ERRORS.duplicateCred
      ? 'Email already in use with different provider!'
      : ''

  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<TManageLoginForm>({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      email: '',
      password: '',
      code: ''
    }
  })

  const handleOnSubmit = (values: TManageLoginForm) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      logIn(values, callbackUrl)
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
        .catch(() => {
          return setError('Somthing went wrong!')
        })
    })
  }

  return (
    <AuthCardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref={PATHS.register}
      showSocial
    >
      <LoginForm
        form={form}
        handleOnSubmit={handleOnSubmit}
        showTwoFactor={showTwoFactor}
        isPending={isPending}
        urlError={urlError}
        error={error}
        success={success}
      />
    </AuthCardWrapper>
  )
}

export default LoginPageView
