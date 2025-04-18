import * as z from 'zod'
import { PostStatus, UserRole } from '@prisma/client'

// eslint-disable-next-line import/no-cycle
import {
  MAX_FILES_COUNT,
  MAX_FILE_SIZE,
  SLUG_MODEL
} from '~/utils/constants'

export const SingleCategorySchema = z.object({
  id: z.optional(z.string()),
  name: z.string({ message: 'Category name is required field!' }).max(50, {
    message: 'The name of the category should be up to 50 characters'
  }),
  slug: z
    .string()
    .regex(SLUG_MODEL, {
      message:
        'Category slug is required field and must contain only lowercase letters and dashes!'
    })
    .max(50, {
      message: 'The slug of the category should be up to 50 characters'
    }),
  description: z
    .string({ message: 'Description is required field!' })
    .max(200, {
      message: 'The description should be up to 200 characters'
    }),
  imageUrl: z.optional(z.string()),
  file: z.optional(
    z
      .array(
        z.instanceof(File).refine(
          (file) => {
            return file.size <= MAX_FILE_SIZE
          },
          {
            message: `The file size should be no more than ${MAX_FILE_SIZE / 1024 / 1024} MB. Try again please.`
          }
        )
      )
      .max(1, {
        message: `You can upload only 1 file.`
      })
  )
})

export const SingleTruncatedCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.optional(z.string())
})

export const ManagePostSchema = z.object({
  id: z.optional(z.string()),
  title: z.string({ message: 'Title is required field!' }).max(100, {
    message: 'The title should be up to 100 characters'
  }),
  content: z
    .string()
    .max(5000, { message: 'The content should be up to 5000 characters' })
    .refine(
      (val) => {
        const textOnly = val.replace(/<[^>]*>/g, '').trim()
        return textOnly.length > 0
      },
      {
        message: 'Content must include text'
      }
    ),
  status: z.optional(z.enum([PostStatus.PUBLISHED, PostStatus.DRAFT])),
  files: z.optional(
    z
      .array(
        z.instanceof(File).refine(
          (file) => {
            return file.size <= MAX_FILE_SIZE
          },
          {
            message: `The file size should be no more than ${MAX_FILE_SIZE / 1024 / 1024} MB. Try again please.`
          }
        )
      )
      .max(MAX_FILES_COUNT, {
        message: `You can upload up to ${MAX_FILES_COUNT} files.`
      })
  ),
  imageUrls: z.optional(z.array(z.string())),
  categories: z.array(
    z.union([z.optional(z.string()), SingleTruncatedCategorySchema])
  )
})

export const SingleFileSchema = z.instanceof(File).refine(
  (file) => {
    return file.size <= MAX_FILE_SIZE
  },
  {
    message: `file should be no more than ${MAX_FILE_SIZE / 1024 / 1024} MB. Try again please.`
  }
)

export const SearchPostSchema = z.object({
  search: z.string()
})

export const SettingsSchema = z
  .object({
    id: z.string(),
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
    .min(6, { message: 'Minimum 6 characters required field!' })
})
