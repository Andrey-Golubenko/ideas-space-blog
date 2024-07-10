'use server'

import { AuthError } from 'next-auth'
import * as z from 'zod'

import { signIn } from '~/libs/auth/auth'
import {
  generateVerificationToken,
  generateTwoFactorToken
} from '~/libs/tokens'
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail
} from '~/libs/mail'
import { db } from '~/libs/db'

import { DEFAULT_LOGIN_REDIRECT } from '~/utils/constants/routes'
import { LogInSchema } from '~/schemas'
import { getTwoFactorTokenByEmail } from '~/services/twoFactorToken'
import { getUserByEmail } from '~/services/user'
import { getTwoFactorConfirmationByUserId } from '~/services/twoFactorConfirmation'

export const logIn = async (
  values: z.infer<typeof LogInSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LogInSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, code } = validatedFields.data

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

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(
        existingUser.email
      )

      if (!twoFactorToken) {
        return { error: 'Ivalid code!' }
      }

      if (twoFactorToken.token !== code) {
        return { error: 'Invalid code!' }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()

      if (hasExpired) {
        return { error: 'Code is expired!' }
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id }
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      )

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id }
        })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id
        }
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(
        existingUser.email
      )
      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token
      )

      return { twoFactor: true }
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
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
  }

  return null
}
