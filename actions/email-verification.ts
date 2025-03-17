'use server'

import { revalidatePath } from 'next/cache'

import { db } from '~/libs/db'
import { getUserByEmail } from '~/services/user'
import { getVerificationTokenByToken } from '~/services/verificationToken'
import { PATHS } from '~/utils/constants'
import { type TActionReturn } from '~/types'

export const emailVerification = async (token: string): TActionReturn => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'The token does not exist!' }
  }

  const hasExpired = new Date(`${existingToken.expires}`) < new Date()

  if (hasExpired) {
    return { error: 'The token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'The user does not exist!' }
  }

  try {
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email
      }
    })

    revalidatePath(PATHS.home)
    revalidatePath(PATHS.logIn)

    return { success: 'Email verified!' }
  } catch (error) {
    return { error: 'Something went wrong! Try again later' }
  } finally {
    await db.verificationToken.delete({
      where: { id: existingToken.id }
    })
  }
}
