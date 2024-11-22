import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface IFormErrorProps {
  message?: string
}

const FormError = ({ message }: IFormErrorProps) => {
  if (!message) return null

  return (
    <div className="flex w-full items-center justify-center gap-x-4 rounded-md bg-destructive/15 p-4 text-sm text-destructive">
      <span className="mr-4 h-6 w-6">
        <ExclamationTriangleIcon className="h-6 w-6" />
      </span>
      <p className="text-justify">{message}</p>
    </div>
  )
}
export default FormError
