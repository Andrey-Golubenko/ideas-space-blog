import { useSessionData } from '~/hooks/useSessionData'

export const useCurrentUser = () => {
  const { data } = useSessionData()

  const user = data?.user

  return user
}
