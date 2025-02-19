import { type StateCreator } from 'zustand/vanilla'
import { type ICookiesSlice } from '~/types'

export const cookiesSlice: StateCreator<
  ICookiesSlice,
  [],
  [],
  ICookiesSlice
> = (set) => ({
  cookiesConsent: false,
  isConsentModalOpen: false,

  setCookiesConsent: (cookiesConsent: boolean) => {
    set((state) => {
      return { ...state, cookiesConsent }
    })
  },

  setIsConsentModalOpen: (open: boolean) => {
    set((state) => {
      return { ...state, isConsentModalOpen: open }
    })
  }
})
