'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import LoadableImage from '~/components/shared/LoadableImage'

interface ISinglePostAliderProps {
  imageUrls: string[]
}

const SinglePostSlider = ({ imageUrls }: ISinglePostAliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const thumbsPerView = Math.min(imageUrls?.length ?? 0, 3)

  return (
    <div className="xs:w-full lg:w-[80%] lg:pt-10">
      <Swiper
        style={{
          // @ts-ignore
          '--swiper-pagination-color': '#fff'
        }}
        navigation
        slidesPerView={1}
        loop
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
                  imageClassNames="block h-[500px] rounded-t-md object-cover"
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
        navigation
        loop
        spaceBetween={10}
        slidesPerView={thumbsPerView}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="box-border w-[75%] px-3 py-0"
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
                  containerHeight={130}
                  priority={index === 0}
                  imageClassNames="block h-[130px] w-full rounded-md object-cover"
                />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}

export default SinglePostSlider
