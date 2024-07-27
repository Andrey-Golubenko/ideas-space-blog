import { PrismaClient, UserRole } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

declare global {
  interface UserDTO {
    id: string
    name: string | null
    email: string
    emailVerified?: Date | null
    image?: string | null
    password: string
    role?: UserRole
    isTwoFactorEnabled: boolean
    isOAuth: boolean

    createdAt?: Date
    updatedAt?: Date
  }
}

declare global {
  interface INavMenuProps {
    isLoggedIn: boolean
    isMobile: boolean
  }
}

export {}
