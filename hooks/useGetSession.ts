import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const useGetSession = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const getSessionData = async () => {
      const sessionData = await getSession()
      setSession(sessionData)
    }
    getSessionData()
  }, [])

  return session
}
