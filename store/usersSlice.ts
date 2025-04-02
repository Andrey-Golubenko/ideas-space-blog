import { type StateCreator } from 'zustand/vanilla'

import { fetchFilteredUsersWithPag } from '~/services/user'
import {
  type IUsersSlice,
  type TDeserializedUser,
  type IFetchUsersFunctionProps
} from '~/types'
import { withNetworkCheck } from '~/utils/helpers/network'

export const usersSlice: StateCreator<IUsersSlice, [], [], IUsersSlice> = (
  set,
  get
) => ({
  users: [],
  usersCount: null,

  getFilteredUsersWithPag: async ({
    limit,
    offset,
    searchQuery,
    providerFilter
  }: IFetchUsersFunctionProps) => {
    set((state) => {
      return { ...state, isLoading: true }
    })

    try {
      await withNetworkCheck(
        // Online action
        async () => {
          const data = await fetchFilteredUsersWithPag({
            limit,
            offset,
            searchQuery,
            providerFilter
          })

          const users = typeof data === 'string' ? data : data?.users
          const usersCount =
            typeof data === 'string' ? null : data?.usersCount

          set((state) => {
            return { ...state, users, usersCount }
          })
        },
        // Offline action - we use cached data
        () => {
          // If we already have data in the store, we use it
          const currentUsers = get().users

          if (
            currentUsers &&
            Array.isArray(currentUsers) &&
            currentUsers.length > 0
          ) {
            // Applying filtering
            let filteredUsers = [...currentUsers]

            if (searchQuery) {
              const query = searchQuery.toLowerCase()
              filteredUsers = filteredUsers.filter(
                (user) =>
                  user.name?.toLowerCase().includes(query) ||
                  user.email?.toLowerCase().includes(query)
              )
            }

            if (providerFilter) {
              filteredUsers = filteredUsers.filter(
                (user) => user.provider === providerFilter
              )
            }

            // Apply pagination
            const paginatedUsers = filteredUsers.slice(
              offset,
              offset! + limit
            )

            set((state) => {
              return {
                ...state,
                users: paginatedUsers,
                usersCount: filteredUsers.length
              }
            })

            console.info('Cached data is used for offline users.')
          } else {
            console.warn(
              'There is no cached data to display users offline.'
            )
          }
        }
      )
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      set((state) => {
        return { ...state, isLoading: false }
      })
    }
  },

  deleteSingleUser: (userId: string) => {
    set((state) => {
      const users: TDeserializedUser[] = Array.isArray(state?.users)
        ? (state?.users as TDeserializedUser[])?.filter((user) => {
            return user.id !== userId
          })
        : []

      return { ...state, users }
    })
  }
})
