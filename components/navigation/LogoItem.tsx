import Link from 'next/link'

import LogoImage from '~/public/icons/logo.svg'
import { cn } from '~/libs/utils'
import { PATHS } from '~/utils/constants'

interface ILogoItemProps {
  logoClassNames?: string
}

const LogoItem = ({ logoClassNames }: ILogoItemProps) => {
  return (
    <Link
      href={PATHS.home}
      className={cn('flex', logoClassNames)}
    >
      <h1 className="mr-2 flex w-max items-center justify-center whitespace-nowrap text-[hsl(var(--logo-color))]">
        Ideas space
      </h1>
      <span>
        <LogoImage
          className="size-10"
          fill="hsl(var(--logo-color))"
        />
      </span>
    </Link>
  )
}

export default LogoItem
