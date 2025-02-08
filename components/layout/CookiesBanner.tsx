'use client'

import { useEffect } from 'react'
import * as CookieConsent from 'vanilla-cookieconsent'
import 'vanilla-cookieconsent/dist/cookieconsent.css'

import getConfig from '~/libs/cookie-consent.config'
import useGlobalStore from '~/store'

const CookiesBanner = () => {
  const [setCookiesConsent, setIsConsentModalOpen] = useGlobalStore(
    (state) => {
      return [state.setCookiesConsent, state.setIsConsentModalOpen]
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
