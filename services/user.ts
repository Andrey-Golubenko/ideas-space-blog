'use server'

import { db } from '~/libs/db'
import { type User } from '@prisma/client'
import { type TDeserializedUser } from '~/types'

export const fetchAllUser = async (): Promise<
  TDeserializedUser[] | null
> => {
  try {
    const initialUsers = await db.user.findMany({
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        accounts: {
          select: {
            provider: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    const users: TDeserializedUser[] = initialUsers.map((user) => {
      return {
        ...user,
        provider: user.accounts[0]?.provider ?? 'local'
      }
    })

    return users
  } catch (error) {
    console.error('Failed to fetch users:', error)

    return null
  }
}

export const getUserByEmail = async (
  email: string
): Promise<User | null> => {
  if (!email || typeof email !== 'string') {
    console.error('Invalid Email provided')

    return null
  }

  try {
    const user = await db.user.findUnique({ where: { email } })

    if (!user) {
      console.warn(`User with Email ${email} not found`)

      return null
    }

    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)

    return null
  }
}

export const getUserById = async (id: string): Promise<UserDTO | null> => {
  if (!id || typeof id !== 'string') {
    console.error('Invalid ID provided')

    return null
  }

  try {
    const initialUser = await db.user.findUnique({
      where: { id },
      include: {
        accounts: {
          select: {
            id: true
          }
        }
      }
    })

    if (!initialUser) {
      console.warn(`User with ID ${id} not found`)

      return null
    }

    const { accounts, ...singleUser } = initialUser

    const serializedUser = { ...singleUser, isOAuth: !!accounts[0]?.id }

    return serializedUser
  } catch (error) {
    console.error('Failed to fetch user:', error)

    return null
  }
}
