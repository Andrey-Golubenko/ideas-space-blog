import { Poppins } from 'next/font/google'
import { cn } from '~/libs/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

interface IAuthHeaderProps {
  label: string
}

const AuthHeader = ({ label }: IAuthHeaderProps) => (
  <div className="flex w-full flex-col items-center justify-center gap-y-4">
    <h1 className={cn('text-3xl font-semibold', font.className)}>
      🔐 Auth
    </h1>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
)

export default AuthHeader
