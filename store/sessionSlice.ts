import { type Session } from 'next-auth'
import { type StateCreator } from 'zustand/vanilla'
import { type ISessionSlice } from '~/types'

export const sessionSlice: StateCreator<
  ISessionSlice,
  [],
  [],
  ISessionSlice
> = (set) => ({
  currentSession: null,

  setCurrentSession: (currentSession: Session) => {
    set((state) => {
      return { ...state, currentSession }
    })
  }
})
