import { User } from 'next-auth'
import { useEffect, useState } from 'react'
import { useCurrentUser } from '~/hooks/useCurrentUser'

export const useCanLogout = (
  user: UserDTO | null | undefined
): { canLogout: boolean; currentUser?: UserDTO & User } => {
  const [canLogout, setCanLogout] = useState<boolean>(false)

  const currentUser = useCurrentUser()

  useEffect(() => {
    if (user?.id === currentUser?.id) setCanLogout(true)
  }, [user?.id, currentUser?.id])

  return { canLogout, currentUser }
}
