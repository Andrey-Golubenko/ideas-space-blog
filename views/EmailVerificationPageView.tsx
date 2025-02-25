'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { BeatLoader } from 'react-spinners'

import { emailVerification } from '~/actions/email-verification'
import NotificationSuccess from '~/components/notifications/NotificationSuccess'
import NotificationError from '~/components/notifications/NotificationError'
import AuthCardWrapper from '~/components/shared/CardWrapper/AuthCardWrapper'
import { PATHS } from '~/utils/constants'

const EmailVerificationPageView = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()

  const router = useRouter()

  const token = searchParams.get('token')

  const onCheck = async () => {
    if (!token) {
      setError('Missing token!')
      return
    }

    const data = await emailVerification(token)

    if (data?.success) {
      setSuccess(data?.success)

      router.push(PATHS.home)
    }

    if (data?.error) {
      setError(data?.error)
    }
  }

  useEffect(() => {
    onCheck()
  }, [])

  return (
    <AuthCardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login!"
      backButtonHref={PATHS.logIn}
    >
      <div className="flex w-full flex-col items-center justify-center gap-4">
        {!success && !error && <BeatLoader className="h-8" />}
        <NotificationSuccess message={success} />
        <NotificationError message={error} />
      </div>
    </AuthCardWrapper>
  )
}

export default EmailVerificationPageView
