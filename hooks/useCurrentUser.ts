import { useSession } from 'next-auth/react'

export const useCurrentUser = () => {
  const { data } = useSession()

  const user = data?.user

  return user
}
