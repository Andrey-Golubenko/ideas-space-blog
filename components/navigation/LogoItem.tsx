import Link from 'next/link'
import Image from 'next/image'

import { PATHS, IMAGES_PATHS } from '~/utils/constants'

interface ILogoItemProps {
  logoClassNames?: string
}

const LogoItem = ({ logoClassNames }: ILogoItemProps) => {
  return (
    <Link
      href={PATHS.home}
      className={logoClassNames || ''}
    >
      <Image
        src={IMAGES_PATHS.logo}
        alt="Logo"
        priority
        width={80}
        height={80}
        className="h-16 w-44"
      />
    </Link>
  )
}

export default LogoItem
