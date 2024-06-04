import * as z from 'zod'

export const LogInSchema = z.object({
  email: z
    .string({
      message: 'Value must be a string!'
    })
    .email({ message: 'Email is required field!' }),
  password: z.string().min(1, { message: 'Password is required field!' })
})
