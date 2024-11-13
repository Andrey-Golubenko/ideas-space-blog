'use client'

import { type Session } from 'next-auth'
import { useEffect } from 'react'
import { trackVisit } from '~/actions/track-visit'

interface IClientTrackVisitProps {
  session: Session | null
}

const ClientTrackVisit = ({ session }: IClientTrackVisitProps) => {
  useEffect(() => {
    const runTrackVisit = async () => {
      await trackVisit(session)
    }

    runTrackVisit()
  }, [session])

  return null
}

export default ClientTrackVisit
