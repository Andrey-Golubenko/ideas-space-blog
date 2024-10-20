'use client'

import { IMAGES_PATHS } from '~/utils/constants/constants'
import LoadableImage from '~/components/shared/LoadableImage'

const HeroBanner = () => {
  return (
    <div className="h-[550px] w-full">
      <LoadableImage
        src={IMAGES_PATHS.heroBanner}
        alt="Hero banner"
        containerHeight={550}
        priority
        imageClassNames="!animate-banner-scale object-cover"
      />
    </div>
  )
}

export default HeroBanner
