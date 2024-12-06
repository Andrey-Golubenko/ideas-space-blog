'use server'

import { db } from '~/libs/db'
import { type User } from '@prisma/client'
import {
  type TDeserializedUser,
  type IFetchUsersFunctionProps
} from '~/types'

export const fetchCurrentPageOfFilteredUsers = async ({
  limit,
  providerFilter,
  searchQuery,
  offset
}: IFetchUsersFunctionProps) => {
  const providerFilters = providerFilter?.split('.') || []

  try {
    const filteredUsers = await db.user.findMany({
      where: {
        name: searchQuery
          ? { contains: searchQuery, mode: 'insensitive' }
          : undefined,
        accounts: providerFilter
          ? {
              some: {
                provider: { in: providerFilters }
              }
            }
          : undefined
      },
      take: limit,
      skip: offset as number,
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        accounts: {
          select: {
            provider: true
          }
        },
        createdAt: true
      }
    })

    const users: TDeserializedUser[] = filteredUsers.map((user) => {
      const { accounts, ...restValues } = user
      return {
        ...restValues,
        provider: user.accounts[0]?.provider ?? 'local'
      }
    })

    return users
  } catch (error) {
    console.error('Failed to fetch filtered users:', error)
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
