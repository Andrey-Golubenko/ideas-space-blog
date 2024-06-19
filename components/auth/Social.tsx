'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '~/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '~/utils/constants/routes'

const Social = () => {
  const handleClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => handleClick('google')}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => handleClick('github')}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}

export default Social
