'use server'

import * as z from 'zod'
import { LogInSchema } from '~/schemas'

export const logIn = async (values: z.infer<typeof LogInSchema>) => {
  const validatedFields = LogInSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  return { success: 'Email sent!' }
}
