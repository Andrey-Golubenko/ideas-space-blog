import { useEffect } from 'react'

type IuseCleaningItemProps = (obj: Record<never, never>) => void

export const useCleaningItem = (
  cleaningFucntion: IuseCleaningItemProps
) => {
  useEffect(() => {
    const handlePageUnload = (event: BeforeUnloadEvent) => {
      cleaningFucntion({})

      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('unload', handlePageUnload)

    return () => {
      window.removeEventListener('unload', handlePageUnload)
    }
  }, [])
}
