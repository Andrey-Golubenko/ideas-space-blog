'use server'

import { AuthError } from 'next-auth'
import * as z from 'zod'
import { DEFAULT_LOGIN_REDIRECT } from '~/utils/constants/routes'
import { LogInSchema } from '~/schemas'
import { signIn } from '~/libs/auth/auth'
import { getUserByEmail } from '~/services/user'
import { generateVerificationToken } from '~/libs/tokens'
import { sendVerificationEmail } from '~/libs/mail'

export const logIn = async (values: z.infer<typeof LogInSchema>) => {
  const validatedFields = LogInSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'User does not exist!' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return { success: 'Confirmation Email has been sent!' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    throw error
    // TODO
  }

  return null
}
