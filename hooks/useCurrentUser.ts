import { type Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const useCurrentUser = () => {
  const [user, setUser] = useState<Session['user'] | undefined>()

  useEffect(() => {
    const getSessionData = async () => {
      const sessionData = await getSession()
      setUser(sessionData?.user)
    }
    getSessionData()
  }, [])

  return user
}
