'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BeatLoader } from 'react-spinners'

import { emailVerification } from '~/actions/email-verification'
import FormSuccess from '~/components/FormSuccess'
import FormError from '~/components/FormError'
import AuthCardWrapper from '~/components/shared/CardWrapper/AuthCardWrapper'
import { PATHS } from '~/utils/constants'

const EmailVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParamms = useSearchParams()
  const token = searchParamms.get('token')

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing token!')
      return
    }

    emailVerification(token)
      .then((data) => {
        setSuccess(data?.success)
        setError(data?.error)
      })
      .catch(() => {
        return setError('Somthing went wrong!')
      })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <AuthCardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login!"
      backButtonHref={PATHS.logIn}
    >
      <div className="flex w-full items-center justify-center gap-x-5">
        {!success && !error && <BeatLoader className="h-11" />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </AuthCardWrapper>
  )
}

export default EmailVerificationForm
