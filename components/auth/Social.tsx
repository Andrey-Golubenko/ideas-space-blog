'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '~/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '~/utils/constants/routes'

const Social = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const handleClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => {
          return handleClick('google')
        }}
      >
        <FcGoogle className="h-5 w-5" />
        <span className="sr-only">Continue with Google</span>
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => {
          return handleClick('github')
        }}
      >
        <FaGithub className="h-5 w-5" />
        <span className="sr-only">Continue with Github</span>
      </Button>
    </div>
  )
}

export default Social
