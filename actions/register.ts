'use server'

import * as bcrypt from 'bcryptjs'
import { RegisterSchema } from '~/schemas'

import { db } from '~/libs/db'
import { generateVerificationToken } from '~/libs/tokens'
import { sendVerificationEmail } from '~/libs/mail'
import { getUserByEmail } from '~/services/user'
import { type TManageRegisterForm, type TActionReturn } from '~/types'

export const register = async (
  values: TManageRegisterForm
): TActionReturn => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }
  const { name, email, password } = validatedFields.data as UserDTO

  const hashedPassword = password ? await bcrypt.hash(password, 10) : ''

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    const verificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return {
      success: 'Confirmation Email has been sent. Check your Email!'
    }
  } catch {
    return { error: 'Failed to sent a confirmation Email!' }
  }
}
