import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const useGetSession = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const runGetSessionData = async () => {
      const sessionData = await getSession()
      setSession(sessionData)
    }
    runGetSessionData()
  }, [])

  return session
}
