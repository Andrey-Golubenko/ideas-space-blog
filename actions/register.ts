'use server'

import * as z from 'zod'
import { RegisterSchema } from '~/schemas'

import { signIn } from '~/lib/auth'

// interface ILogInArgs {
//   // provider: string
//   provider?: string
//   redirect?: string
// }

// export async function providerLogIn({ provider, redirect }: ILogInArgs) {
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // await signIn(provider, { redirectTo: redirect })

  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  return { success: 'Email sent!' }
}
