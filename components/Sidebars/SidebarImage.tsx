import { forwardRef, memo } from 'react'
import Image from 'next/image'

interface ISidebarImageProps {
  imageUrl: string
}

const SidebarImage = forwardRef<HTMLDivElement, ISidebarImageProps>(
  ({ imageUrl }, ref) => {
    return (
      <div
        style={{
          width: '40px',
          height: '40px',
          position: 'relative'
        }}
        ref={ref}
      >
        <Image
          src={imageUrl}
          alt="Category image"
          sizes="100%"
          fill
          className="rounded-md"
        />
      </div>
    )
  }
)

SidebarImage.displayName = 'SidebarImage'

export default memo(SidebarImage)
