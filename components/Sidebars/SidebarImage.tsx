import { memo } from 'react'
import Image from 'next/image'
import { IMAGES_PATHS } from '~/utils/constants/constants'

interface ISidebarImageProps {
  imageUrl: string
}

const SidebarImage = ({ imageUrl }: ISidebarImageProps) => {
  const itemImageUrl = imageUrl?.length ? imageUrl : IMAGES_PATHS.noImages

  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        position: 'relative'
      }}
    >
      <Image
        src={itemImageUrl}
        alt="Category image"
        sizes="100%"
        fill
        className="rounded-md"
      />
    </div>
  )
}

SidebarImage.displayName = 'SidebarImage'

export default memo(SidebarImage)
