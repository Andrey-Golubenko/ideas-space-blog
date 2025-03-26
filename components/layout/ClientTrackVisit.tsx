'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import useGlobalStore from '~/store'
import { trackVisit } from '~/actions/track-visit'
import type { Session } from 'next-auth'

interface IClientTrackVisitProps {
  session: Session | null
}

const ClientTrackVisit = ({ session }: IClientTrackVisitProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNotFoundPage, setIsNotFoundPage] = useState(false)

  const { cookiesConsent, setCookiesConsent, setCurrentSession } =
    useGlobalStore((state) => ({
      cookiesConsent: state.cookiesConsent,
      setCookiesConsent: state.setCookiesConsent,
      setCurrentSession: state.setCurrentSession
    }))

  // Determining if we are on page 404
  useEffect(() => {
    // Checking whether the current DOM contains elements specific to page 404
    const checkFor404Elements = () => {
      // Checking for elements specific to the 404 page
      const has404Title =
        document.title.includes('404') ||
        document.title.includes('Not Found')

      // Checking for specific elements in the DOM
      const has404Elements =
        document.querySelector('[data-not-found-page]') !== null

      setIsNotFoundPage(has404Title || has404Elements)
    }

    // Start checking after the page is fully loaded
    if (document.readyState === 'complete') {
      checkFor404Elements()
      return undefined
    }
    window.addEventListener('load', checkFor404Elements)
    return () => window.removeEventListener('load', checkFor404Elements)
  }, [pathname, searchParams])

  useEffect(() => {
    if (session) {
      setCurrentSession(session)
    }
  }, [session, setCurrentSession])

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

        if (isNotFoundPage) {
          console.log('Skipping visit tracking for 404 page')
          return
        }

        const timeZone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone
        await trackVisit(session, timeZone)
      } catch (error) {
        console.error('Error tracking visit:', error)
      }
    }

    runTrackVisit()
  }, [pathname, searchParams, session, cookiesConsent, isNotFoundPage])

  return null
}

export default ClientTrackVisit
