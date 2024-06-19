import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import CardWrapper from '~/components/auth/CardWrapper'
import { PATHS } from '~/utils/constants/constants'

function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Somthing went wrong!"
      backButtonHref={PATHS.logIn}
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  )
}

export default ErrorCard
