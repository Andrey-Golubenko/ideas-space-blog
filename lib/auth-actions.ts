'use server'

import { signIn } from './auth'

interface ILogInArgs {
  provider: string
  redirect?: string
}

export async function LogIn({ provider, redirect }: ILogInArgs) {
  await signIn(provider, { redirectTo: redirect })
}
