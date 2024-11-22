import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import AuthCardWrapper from '~/components/shared/CardWrapper/AuthCardWrapper'
import { PATHS } from '~/utils/constants'

function ErrorCard() {
  return (
    <AuthCardWrapper
      headerLabel="Somthing went wrong!"
      backButtonHref={PATHS.logIn}
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </AuthCardWrapper>
  )
}

export default ErrorCard
