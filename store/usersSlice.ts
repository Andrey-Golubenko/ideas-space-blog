import { type StateCreator } from 'zustand/vanilla'

import { fetchFilteredUsersWithPag } from '~/services/user'
import {
  type IUsersSlice,
  type TDeserializedUser,
  type IFetchUsersFunctionProps
} from '~/types'

export const usersSlice: StateCreator<IUsersSlice, [], [], IUsersSlice> = (
  set
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
      const data = await fetchFilteredUsersWithPag({
        limit,
        offset,
        searchQuery,
        providerFilter
      })

      const users = typeof data === 'string' ? data : data?.users

      const usersCount = typeof data === 'string' ? null : data?.usersCount

      set((state) => {
        return { ...state, users, usersCount }
      })
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
