import useGlobalStore from '~/store'

export const useCurrentUser = () => {
  const { currentSession } = useGlobalStore((state) => {
    return {
      currentSession: state.currentSession
    }
  })

  const currentUser = currentSession?.user

  return currentUser
}
