'use server'

import { type User } from '@prisma/client'
import { db } from '~/libs/db'
import {
  type TDeserializedUser,
  type IFetchUsersFunctionProps,
  type TTruncatedAuthors
} from '~/types'

/**
 * @server-function - Fetches filtered users with pagination.
 *
 * This function retrieves a list of users from the database, applying optional search filtering,
 * provider-based filtering, and pagination constraints. It also selects relevant user details.
 *
 * @param {Object} params - The function parameters.
 * @param {number} params.limit - The number of users to retrieve.
 * @param {number} params.offset - The offset for pagination.
 * @param {string} [params.searchQuery] - An optional search query to filter users by name.
 * @param {string} [params.providerFilter] - An optional string of provider names separated by dots ("."),
 * used to filter users based on authentication provider.
 * @returns {Promise<{ users: TDeserializedUser[], usersCount: number } | string | null>}
 * Returns an object containing the filtered users and their total count. If no users are found,
 * returns a message string. If an error occurs, returns `null`.
 */
export const fetchFilteredUsersWithPag = async ({
  limit,
  providerFilter,
  searchQuery,
  offset
}: IFetchUsersFunctionProps): Promise<
  { users: TDeserializedUser[]; usersCount: number } | null | string
> => {
  const providerFilters: string[] = providerFilter
    ? providerFilter.split('.').filter(Boolean)
    : []

  const hasLocal = providerFilters.includes('local')

  const externalProviders = providerFilters.filter(
    (provider) => provider !== 'local'
  )

  let accountFilter = {}

  if (!providerFilters.length) {
    accountFilter = {}
  }

  if (hasLocal && externalProviders.length) {
    accountFilter = {
      OR: [
        { accounts: { none: {} } },
        { accounts: { some: { provider: { in: externalProviders } } } }
      ]
    }
  }

  if (hasLocal && !externalProviders.length) {
    accountFilter = { accounts: { none: {} } }
  }

  if (providerFilters.length && !hasLocal) {
    accountFilter = {
      accounts: { some: { provider: { in: providerFilters } } }
    }
  }

  try {
    const dbUsers = await db.user.findMany({
      where: {
        name: searchQuery
          ? { contains: searchQuery, mode: 'insensitive' }
          : undefined,
        ...accountFilter
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

    if (dbUsers?.length <= 0) {
      return 'It seems there are no users yet.'
    }

    const usersCount: number = await db.user.count({
      where: {
        name: searchQuery
          ? { contains: searchQuery, mode: 'insensitive' }
          : undefined,
        ...accountFilter
      }
    })

    const users: TDeserializedUser[] = dbUsers.map((user) => {
      const { accounts, ...rest } = user
      return {
        ...rest,
        provider: user.accounts[0]?.provider ?? 'local'
      }
    })

    return { users, usersCount }
  } catch (error) {
    console.error('Failed to fetch filtered users:', error)
    return null
  }
}

/**
 * @server-function - Fetches a list of all authors with truncated details.
 *
 * This function retrieves all authors from the database, selecting only their `id` and `name`.
 * It filters out any authors with a `null` name before returning the data.
 *
 * @returns {Promise<TTruncatedAuthors[] | null>}
 * Returns an array of truncated author objects. If an error occurs, returns `null`.
 */
export const fetchAllAuthorsTruncated = async (): Promise<
  TTruncatedAuthors[] | null
> => {
  try {
    const dbAuthors = await db.user.findMany({
      select: {
        id: true,
        name: true
      }
    })

    const authors = dbAuthors.filter((author) => {
      return author.name !== null
    }) as TTruncatedAuthors[]

    return authors
  } catch (error) {
    console.error('Failed to fetch authors!', error)

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
