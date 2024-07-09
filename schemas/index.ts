import * as z from 'zod'
import { UserRole } from '@prisma/client'

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string()),
    newPassword: z.optional(z.string()),
    role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER])),
    isTwoFactorEnabled: z.optional(z.boolean())
  })
  .refine(
    (data) => {
      if (data.password === '' || data!.password!.length >= 6) {
        return true
      }

      return false
    },
    {
      message: 'Password must contain at least 6 characters',
      path: ['password']
    }
  )
  .refine(
    (data) => {
      if (data.newPassword === '' || data!.newPassword!.length >= 6) {
        return true
      }

      return false
    },
    {
      message: 'New password must contain at least 6 characters',
      path: ['newPassword']
    }
  )
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false
      }

      return true
    },
    {
      message: 'New password is required!',
      path: ['newPassword']
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false
      }

      return true
    },
    {
      message: 'Password is required!',
      path: ['password']
    }
  )

export const LogInSchema = z.object({
  email: z
    .string({
      message: 'Value must be a string!'
    })
    .email({ message: 'Email is required field!' }),
  password: z.string().min(1, { message: 'Password is required field!' }),
  code: z.optional(z.string())
})

export const ResetSchema = z.object({
  email: z
    .string({
      message: 'Value must be a string!'
    })
    .email({ message: 'Email is required field!' })
})

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Minimum of 6 characters required!' })
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
