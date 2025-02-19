'use client'

import { useEffect } from 'react'
import * as CookieConsent from 'vanilla-cookieconsent'
import 'vanilla-cookieconsent/dist/cookieconsent.css'

import useGlobalStore from '~/store'
import getConfig from '~/libs/cookie-consent.config'

const CookiesBanner = () => {
  const { setCookiesConsent, setIsConsentModalOpen } = useGlobalStore(
    (state) => {
      return {
        setCookiesConsent: state.setCookiesConsent,
        setIsConsentModalOpen: state.setIsConsentModalOpen
      }
    }
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      CookieConsent.run(
        getConfig({ setCookiesConsent, setIsConsentModalOpen })
      )
    }
  }, [])

  return null
}

export default CookiesBanner
