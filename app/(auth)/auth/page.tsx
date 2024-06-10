import { Poppins } from 'next/font/google'
import LoginButton from '~/components/auth/LoginButton'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

const Auth = () => (
  <div className="space-y-6 text-center">
    <h1
      className={cn(
        'text-6xl font-semibold text-white drop-shadow-md',
        font.className
      )}
    >
      🔐 Auth
    </h1>
    <p className="text-lg text-white">A simple authentication</p>
    <div>
      <LoginButton>
        <Button
          variant="secondary"
          size="lg"
        >
          Sign in
        </Button>
      </LoginButton>
    </div>
  </div>
)

export default Auth
