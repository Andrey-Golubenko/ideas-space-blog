'use server'

import * as z from 'zod'
import * as bcrypt from 'bcryptjs'
import { RegisterSchema } from '~/schemas'

import { UserDTO } from '~/types/types'
import { db } from '~/libs/db'
import { getUserByEmail } from '~/services/user'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }
  const { name, email, password } = validatedFields.data as UserDTO

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  // TODO: Sent verification token Email

  return { success: 'User has been created!' }
}
