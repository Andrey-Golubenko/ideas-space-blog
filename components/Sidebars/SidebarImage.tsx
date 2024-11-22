import { memo } from 'react'
import Image from 'next/image'
import { IMAGES_PATHS } from '~/utils/constants'

interface ISidebarImageProps {
  imageUrl: string
}

const SidebarImage = ({ imageUrl }: ISidebarImageProps) => {
  const itemImageUrl = imageUrl?.length ? imageUrl : IMAGES_PATHS.noImages

  return (
    <Image
      src={itemImageUrl}
      alt="Category image"
      sizes="100%"
      width={40}
      height={40}
      className="size-10 rounded-md"
    />
  )
}

SidebarImage.displayName = 'SidebarImage'

export default memo(SidebarImage)
