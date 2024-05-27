'use client'

import Image from 'next/image'
import { PATHS } from '~/constants'
import { LogIn } from '~/lib/auth-actions'
import * as google from '~/public/google.svg'

const GoogleButton = () => (
  <button
    className="flex h-12 w-[100%] items-center justify-center rounded-lg border border-[#ccc]  px-4 py-3 duration-300 hover:border-[#0f6ddb] hover:bg-[#bad5f8]"
    type="button"
    onClick={() => LogIn({ provider: 'google', redirect: PATHS?.profile })}
  >
    <Image
      loading="lazy"
      height={24}
      width={24}
      src={google}
      alt="Google"
    />
    <span className="flex-grow">Sign in with Google</span>
  </button>
)

export default GoogleButton
