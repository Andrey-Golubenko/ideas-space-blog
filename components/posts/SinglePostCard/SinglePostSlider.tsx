'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

interface ISinglePostAliderProps {
  imageUrls: string[]
}

const SinglePostSlider = ({ imageUrls }: ISinglePostAliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const perView: number = 3
  const isLoop: boolean = perView > imageUrls.length

  return (
    <div className="min-w-0 xs:max-w-full lg:max-w-[80%] lg:pt-10">
      <Swiper
        style={{
          // @ts-ignore
          '--swiper-pagination-color': '#fff'
        }}
        loop
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mx-auto w-full !pb-8"
      >
        {!!imageUrls.length &&
          imageUrls.map((url) => {
            return (
              <SwiperSlide
                key={url}
                className="flex items-center justify-center bg-white bg-cover bg-center text-center text-lg"
              >
                <Image
                  src={url}
                  alt="Photo of the post"
                  width={700}
                  height={500}
                  className="block h-[500px] w-full rounded-md object-cover"
                />
              </SwiperSlide>
            )
          })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper as (swiper: unknown) => void}
        loop={isLoop}
        spaceBetween={10}
        slidesPerView={perView}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="box-border w-3/4 px-3 py-0"
      >
        {!!imageUrls.length &&
          imageUrls.map((url, index) => {
            return (
              <SwiperSlide
                key={url}
                className="flex w-1/4 cursor-pointer items-center justify-center bg-white bg-cover bg-center text-center text-lg grayscale"
              >
                <Image
                  src={url}
                  alt="Photo of the post"
                  width={150}
                  priority={index === 0}
                  height={150}
                  className="block h-[120px] w-[200px] rounded-md object-cover"
                />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}

export default SinglePostSlider
