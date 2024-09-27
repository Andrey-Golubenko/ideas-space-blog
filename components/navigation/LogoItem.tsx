import Link from 'next/link'
import Image from 'next/image'

import { PATHS, IMAGES_PATHS } from '~/utils/constants/constants'

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
        className="h-12 w-36"
      />
    </Link>
  )
}

export default LogoItem
