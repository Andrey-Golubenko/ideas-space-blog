import { Poppins } from 'next/font/google'
import { cn } from '~/libs/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

interface IAuthHeaderProps {
  title: string
  label: string
}

const CardHeaderContent = ({ title, label }: IAuthHeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className={cn('text-3xl font-semibold', font.className)}>
        {title}
      </h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export default CardHeaderContent
