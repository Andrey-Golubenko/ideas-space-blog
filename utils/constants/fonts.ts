import { Playfair_Display, Poppins } from 'next/font/google'

export const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
  preload: false
})

export const fontPlayfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false
})
