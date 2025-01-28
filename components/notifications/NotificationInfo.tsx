import { InfoCircledIcon } from '@radix-ui/react-icons'

interface INotificationInfoProps {
  message?: string
}

const NotificationInfo = ({ message }: INotificationInfoProps) => {
  if (!message) return null

  return (
    <div className="flex w-full items-center justify-center gap-x-2 rounded-md bg-blue-200/55 p-4 text-sm text-blue-500">
      <span className="mr-1 h-6 w-6">
        <InfoCircledIcon className="h-6 w-6" />
      </span>
      <p className="text-justify">{message}</p>
    </div>
  )
}

export default NotificationInfo
