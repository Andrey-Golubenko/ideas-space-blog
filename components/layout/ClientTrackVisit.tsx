'use client'

import { useEffect } from 'react'

import { trackVisit } from '~/actions/track-visit'
import { type Session } from 'next-auth'

interface IClientTrackVisitProps {
  session: Session | null
}

const ClientTrackVisit = ({ session }: IClientTrackVisitProps) => {
  useEffect(() => {
    const runTrackVisit = async () => {
      try {
        const timeZone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone

        await trackVisit(session, timeZone)
      } catch (error) {
        console.error('Error tracking visit:', error)
      }
    }

    runTrackVisit()
  }, [session])

  return null
}

export default ClientTrackVisit
