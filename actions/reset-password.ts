'use server'

import * as z from 'zod'
import { ResetSchema } from '~/schemas/index'
import { getUserByEmail } from '~/services/user'
import { generatePasswordResetToken } from '~/libs/tokens'
import { sendPasswordResetEmail } from '~/libs/mail'
import { type TManageResetPasswordForm, type TActionReturn } from '~/types'

export const passwordReset = async (
  values: TManageResetPasswordForm
): TActionReturn => {
  const validatedFields = ResetSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid email!' }
  }

  const { email } = validatedFields.data

  try {
    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
      return { error: 'Email not found!' }
    }

    const passwordResetToken = await generatePasswordResetToken(email)

    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    )

    return { success: 'Reset email sent!' }
  } catch {
    return { error: 'Failed to sent a confirmation Email!' }
  }
}
