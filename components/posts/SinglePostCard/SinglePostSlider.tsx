'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import LoadableImage from '~/components/shared/LoadableImage'
import { useIsMobile } from '~/hooks/useMobile'

interface ISinglePostAliderProps {
  imageUrls: string[]
}

const SinglePostSlider = ({ imageUrls }: ISinglePostAliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const isMobil = useIsMobile()

  /** Count of the thumbnails to view for mobil and for desktop */
  const multiThumbsPerView = isMobil ? 2.5 : 3

  const thumbsPerView = Math.min(
    imageUrls?.length ?? 0,
    multiThumbsPerView
  )

  /** Set to true to enable continuous loop mode.
   * It is taken into account that the sum of the parameters 'slidesPerView' and 'slidesPerGroup' (1 - by default) for thumbnails should be no more than 3 (parameter 'slidesPerView' for thumbnails)
   */
  const isThumsInLoop = thumbsPerView - 1 >= 3

  /** Set to true to enable continuous loop mode.
   * It is taken into account that the sum of the parameters 'slidesPerView' and 'slidesPerGroup' (1 - by default) for thumbnails should be no more than 1 (parameter 'slidesPerView' for images)
   */
  const isImageInLoop = imageUrls.length - 1 >= 1

  /** The height of the slider container with thumbnails in pixels */
  const thumbsHeight = isMobil ? 95 : 130

  return (
    <div className="xs:w-full lg:w-[80%] lg:pt-10">
      <Swiper
        style={{
          // @ts-ignore
          '--swiper-pagination-color': '#fff'
        }}
        navigation
        slidesPerView={1}
        loop={isImageInLoop}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`mx-auto !mb-8 ${imageUrls?.length ? 'h-[500px]' : ''}  w-full`}
      >
        {!!imageUrls?.length &&
          imageUrls?.map((url, index) => {
            return (
              <SwiperSlide
                key={url}
                className="flex items-center justify-center bg-cover bg-center text-center text-lg"
              >
                <LoadableImage
                  src={url}
                  alt="Photo of the post"
                  containerHeight={500}
                  priority={index === 0}
                  imageClassNames="block lg:rounded-b-md rounded-t-md object-cover"
                />
              </SwiperSlide>
            )
          })}
      </Swiper>

      <Swiper
        style={{
          // @ts-ignore
          '--swiper-pagination-color': '#fff'
        }}
        onSwiper={setThumbsSwiper as (swiper: unknown) => void}
        navigation={!isMobil}
        loop={isThumsInLoop}
        spaceBetween={10}
        slidesPerView={thumbsPerView}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="box-border px-3 py-0 xs:w-[90%] sm:w-[82%] md:w-[75%]"
      >
        {!!imageUrls?.length &&
          imageUrls?.map((url, index) => {
            return (
              <SwiperSlide
                key={url}
                className="flex w-1/4 cursor-pointer items-center justify-center bg-white bg-cover bg-center text-center text-lg grayscale"
              >
                <LoadableImage
                  src={url}
                  alt="Thumbnail of the post"
                  containerHeight={thumbsHeight}
                  priority={index === 0}
                  imageClassNames="block w-full rounded-md object-cover"
                />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}

export default SinglePostSlider
