'use client'

import { useState } from 'react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { useScreen } from '~/hooks/useScreen'
import { Skeleton } from '~/components/ui/skeleton'
import MainSlider from '~/components/posts/SinglePost/SinglePostSlider/MainSlider'
import ThumbnailsSlider from '~/components/posts/SinglePost/SinglePostSlider/ThumbnailsSlider'
import { cn } from '~/libs/utils'

interface ISinglePostSliderProps {
  hasContent: boolean
  imageUrls: string[]
  isAdminPage: boolean
}

const SinglePostSlider = ({
  hasContent = false,
  imageUrls,
  isAdminPage
}: ISinglePostSliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const { isMobile } = useScreen()

  if (!hasContent) {
    return (
      <>
        <Skeleton
          className={cn(
            '!mb-8 h-[500px] w-full xl:mt-10 xl:w-[80%]',
            isAdminPage && 'xl:mt-0 xl:w-full'
          )}
        />
        <div className="flex justify-center space-x-3 px-3 py-0 xs:w-[90%] sm:w-[82%] md:w-[75%]">
          <Skeleton className="h-[100px] w-1/4" />
          <Skeleton className="h-[100px] w-1/4" />
          <Skeleton className="h-[100px] w-1/4" />
        </div>
      </>
    )
  }

  const imagesCount = imageUrls?.length ?? 0

  /** Count of the thumbnails to view for mobil and for desktop */
  const multiThumbsPerView = isMobile ? 2.5 : 3

  const thumbsPerView =
    imagesCount > multiThumbsPerView ? multiThumbsPerView : imagesCount

  /** Set to true to enable continuous loop mode.
   * It is taken into account that the sum of the parameters 'slidesPerView' and 'slidesPerGroup' (1 - by default) for thumbnails should be no more than 3 (parameter 'slidesPerView' for thumbnails)
   */
  const isThumbsInLoop = imagesCount - 1 >= 3

  /** Set to true to enable continuous loop mode.
   * It is taken into account that the sum of the parameters 'slidesPerView' and 'slidesPerGroup' (1 - by default) for thumbnails should be no more than 1 (parameter 'slidesPerView' for images)
   */
  const isImageInLoop = imagesCount - 1 >= 1

  /** The height of the slider container with thumbnails in pixels */
  const thumbsHeight = isMobile ? 95 : 130

  return (
    <div className={cn('w-full', !isAdminPage && 'xl:w-[80%] xl:pt-10')}>
      <MainSlider
        imageUrls={imageUrls}
        isImageInLoop={isImageInLoop}
        thumbsSwiper={thumbsSwiper}
      />

      <ThumbnailsSlider
        imageUrls={imageUrls}
        isMobile={isMobile}
        isThumbsInLoop={isThumbsInLoop}
        setThumbsSwiper={setThumbsSwiper}
        thumbsHeight={thumbsHeight}
        thumbsPerView={thumbsPerView}
      />
    </div>
  )
}

export default SinglePostSlider
