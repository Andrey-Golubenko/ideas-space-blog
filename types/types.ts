import { UserRole } from '@prisma/client'

export interface IPost {
  userId: number
  id: number
  title: string
  body: string
}

export interface INavLink {
  label: string
  href: string
}

export interface UserDTO {
  id: string
  name: string | null
  email: string
  emailVerified?: Date | null
  image?: string | null
  password: string
  role?: UserRole
  isTwoFactorEnabled: boolean
  createdAt?: Date
  updatedAt?: Date
}
