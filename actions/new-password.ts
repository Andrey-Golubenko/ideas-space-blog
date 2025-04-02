'use server'

import bcrypt from 'bcryptjs'

import { db } from '~/libs/db'
import { getPasswordResetTokenByToken } from '~/services/auth/password-reset-token'
import { getUserByEmail } from '~/services/user'
import { NewPasswordSchema } from '~/schemas'
import { type TManagePasswordForm, type TActionReturn } from '~/types'

export const newPassword = async (
  values: TManagePasswordForm,
  token?: string
): TActionReturn => {
  if (!token) {
    return { error: 'Missing token!' }
  }

  const validatedFields = NewPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { password } = validatedFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid token!' }
  }

  const hasExpired = new Date(`${existingToken.expires}`) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword }
    })

    return { success: 'Password has been updated!' }
  } catch (error) {
    return { error: 'Failed to update password!' }
  } finally {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id }
    })
  }
}
