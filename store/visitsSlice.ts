import { type StateCreator } from 'zustand/vanilla'

import { fetchUsersVisits } from '~/services/userVisits/visitsData'
import { type IVisitsSlice } from '~/types'

export const visitsSlice: StateCreator<
  IVisitsSlice,
  [],
  [],
  IVisitsSlice
> = (set) => ({
  usersVisits: [],
  browserStats: [],

  getUsersVisits: async (startDate?: Date, endDate?: Date) => {
    set((state) => {
      return { ...state, isLoading: true }
    })

    const visitsData = await fetchUsersVisits(startDate, endDate)

    set((state) => {
      return {
        ...state,
        usersVisits: visitsData?.visitsByDate ?? [],
        browserStats: visitsData?.browserStats ?? [],
        isLoading: false
      }
    })
  }
})
