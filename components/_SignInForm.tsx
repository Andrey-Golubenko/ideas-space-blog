'use client'

import { AuthError } from 'next-auth'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormEventHandler, useState } from 'react'
import { PATHS } from '~/constants/constants'

const SignInForm = () => {
  const [authError, setAuthError] = useState<AuthError>()
  const router = useRouter()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()

    const formData = new FormData(event?.currentTarget)

    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false
    })
    if (result && !result.error) {
      router.push(PATHS.profile)
    } else {
      // @ts-ignore
      setAuthError(result?.error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="text-center"
    >
      <div className="text-center">
        <label
          htmlFor="email"
          className="label-signin-input"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={authError ? 'signin-input-error' : 'signin-input'}
          required
        />
      </div>

      <div className="text-center">
        <label
          htmlFor="password"
          className="label-signin-input"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className={authError ? 'signin-input-error' : 'signin-input'}
          required
        />
      </div>
      {authError && (
        <p className="my-4 text-center text-sm text-red-600">
          Invalid identifier or password
        </p>
      )}
      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center rounded-lg border border-[#00000031] bg-[#157efb] px-4 py-3 font-light text-white duration-500 hover:border-[#0f6ddb] hover:bg-[#0f6ddb]"
      >
        Sign in with Credentials
      </button>
    </form>
  )
}

export default SignInForm
