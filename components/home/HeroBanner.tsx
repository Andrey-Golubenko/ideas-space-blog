'use client'

import LoadableImage from '~/components/shared/LoadableImage'
import { IMAGES_PATHS } from '~/utils/constants'

const HeroBanner = () => {
  return (
    <div className="w-full">
      <LoadableImage
        src={IMAGES_PATHS.heroBanner}
        alt="Hero banner"
        containerHeight={600}
        priority
        imageClassNames="!animate-banner-scale object-cover"
      />
    </div>
  )
}

export default HeroBanner
