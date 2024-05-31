import { PATHS } from '~/constants'
import CardWrapper from './CardWrapper'

const LoginForm = () => (
  <CardWrapper
    headerLabel="Welcome back"
    backButtonLabel="Don't have an account?"
    backButtonHref={PATHS.register}
    showSocial
  >
    LoginForm
  </CardWrapper>
)

export default LoginForm
