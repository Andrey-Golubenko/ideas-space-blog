import * as z from 'zod'

export const LogInSchema = z.object({
  email: z
    .string({
      message: 'Value must be a string!'
    })
    .email({ message: 'Email is required field!' }),
  password: z.string().min(1, { message: 'Password is required field!' })
})

export const ResetSchema = z.object({
  email: z
    .string({
      message: 'Value must be a string!'
    })
    .email({ message: 'Email is required field!' })
})

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Name is required field!' }),
  email: z
    .string({
      message: 'Value must be a string!'
    })
    .email({ message: 'Email is required field!' }),
  password: z
    .string()
    .min(6, { message: 'Minimum 6 carachters required field!' })
})
