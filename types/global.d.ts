import { type Post, PrismaClient, User, UserRole } from '@prisma/client'

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
    password: string | null
    role?: UserRole
    isTwoFactorEnabled: boolean
    isOAuth: boolean

    createdAt?: Date
    updatedAt?: Date
  }
}

declare global {
  interface CurrentUser extends UserDTO, User {}
}

declare global {
  interface INavMenuProps {
    isMobile: boolean
    user?: CurrentUser
    isLoggedIn?: boolean
  }
}

declare global {
  type TCategoryOptions = {
    categoryId: string
    categoryName: string
    categorySlug: string
  }
}

declare global {
  type FullPost = Partial<Post> & {
    categories?: TCategoryOptions[]
  }
}

export {}
