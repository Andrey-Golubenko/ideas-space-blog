'use client'

import { useEffect } from 'react'

import useGlobalStore from '~/store'
import { trackVisit } from '~/actions/track-visit'
import { type Session } from 'next-auth'

interface IClientTrackVisitProps {
  session: Session | null
}

const ClientTrackVisit = ({ session }: IClientTrackVisitProps) => {
  const [cookiesConsent, setCookiesConsent] = useGlobalStore((state) => {
    return [state.cookiesConsent, state.setCookiesConsent]
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStorageConsent = JSON.parse(
        localStorage?.getItem('cc_cookie') ?? '{}'
      )

      const hasAnalyticsConsent: boolean = localStorageConsent?.categories
        ? localStorageConsent?.categories.includes('analytics')
        : false

      setCookiesConsent(hasAnalyticsConsent)
    }

    const runTrackVisit = async () => {
      try {
        if (!cookiesConsent) return

        const timeZone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone
        await trackVisit(session, timeZone)
      } catch (error) {
        console.error('Error tracking visit:', error)
      }
    }

    runTrackVisit()
  }, [session, setCookiesConsent, cookiesConsent])

  return null
}

export default ClientTrackVisit
