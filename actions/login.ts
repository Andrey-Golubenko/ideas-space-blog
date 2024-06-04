'use server'

import * as z from 'zod'
import { LogInSchema } from '~/schemas'

import { signIn } from '~/lib/auth'

// interface ILogInArgs {
//   // provider: string
//   provider?: string
//   redirect?: string
// }

// export async function providerLogIn({ provider, redirect }: ILogInArgs) {
export const logIn = async (values: z.infer<typeof LogInSchema>) => {
  // await signIn(provider, { redirectTo: redirect })

  const validatedFields = LogInSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  return { success: 'Email sent!' }
}
