import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import AuthCardWrapper from '~/components/shared/CardWrapper/AuthCardWrapper'
import { PATHS } from '~/utils/constants'

const AuthErrorPageView = () => {
  return (
    <AuthCardWrapper
      headerLabel="Something went wrong!"
      backButtonHref={PATHS.logIn}
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </AuthCardWrapper>
  )
}

export default AuthErrorPageView
