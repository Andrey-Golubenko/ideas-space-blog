'use client'

import { CircleAlert } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import useNetwork from '~/hooks/useNetwork'

const OfflineNotification = () => {
  const { isOffline } = useNetwork()

  const toastId = useRef<string | number | null>(null)

  useEffect(() => {
    if (isOffline && !toastId.current) {
      toastId.current = toast.warning(
        <div className="flex items-center gap-x-4">
          <span className="size-6">
            <CircleAlert className="size-6" />
          </span>

          <div className="flex flex-col gap-y-2 pr-12">
            <strong>Whoops! No Internet Connection</strong>

            <p>
              Some parts of this app may be unavailable until you come back
              online.
            </p>
          </div>
        </div>,
        {
          richColors: true,
          duration: Infinity,
          position: 'bottom-center'
        }
      )
    } else if (!isOffline && toastId.current) {
      toast.dismiss(toastId.current)

      toastId.current = null
    }
  }, [isOffline])

  return null
}

export default OfflineNotification
