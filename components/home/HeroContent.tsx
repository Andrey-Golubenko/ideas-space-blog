'use client'

import { useState, useEffect } from 'react'
import { useParallax } from 'react-scroll-parallax'
import { fontPlayfairDisplay } from '~/utils/constants/fonts'

const HeroContent = () => {
  const [isReady, setIsReady] = useState(false)
  const { ref } = useParallax<HTMLDivElement>({
    speed: 15,
    opacity: [2, 0],
    startScroll: -400,
    endScroll: 400
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true)
    }, 700)

    return () => clearTimeout(timeout)
  }, [])

  console.log('isReady :>> ', isReady)

  return (
    <div
      ref={ref}
      className={`absolute z-10 transition-opacity duration-100 ${
        isReady ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <p
        className={`${fontPlayfairDisplay.className} text-outline-black px-10 text-center text-5xl font-bold !italic text-white drop-shadow-[1px_1px_2px_#000] lg:text-6xl`}
      >
        Be inspired, create, embody!
      </p>
    </div>
  )
}

export default HeroContent
