import './globals.css'
import dynamic from 'next/dynamic'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import { auth } from '~/libs/auth/auth'
import { Toaster } from '~/components/ui/sonner'
import Providers from '~/components/layout/Providers'
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'
import CookiesBanner from '~/components/layout/CookiesBanner'
import ClientTrackVisit from '~/components/layout/ClientTrackVisit'
import CookiesBannerTrigger from '~/components/layout/CookiesBanner/CookiesBannerTrigger'
import ServiceWorkerRegistration from '~/components/layout/ServiceWorkerRegistration'
import { APPLE_SPLASH_IMAGES } from '~/utils/constants/apple-splash-images'

const OfflineNotification = dynamic(
  () => import('~/components/layout/OfflineNotification'),
  {
    ssr: false
  }
)

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Ideas space blog',
    default: 'Ideas space blog'
  },
  description:
    'Blog is designed to inspire and share knowledge on a wide range of topics, from technology to art',
  robots: { index: true, follow: true },
  icons: {
    icon: '/icons/favicon.ico',
    apple: [{ url: '/icons/apple-icon-180.png', sizes: '180x180' }],
    other: [
      { rel: 'mask-icon', url: '/icons/favicon.svg', color: '#5bbad5' }
    ]
  },
  appleWebApp: {
    title: 'Ideas space blog',
    capable: true,
    statusBarStyle: 'black-translucent',
    startupImage: APPLE_SPLASH_IMAGES
  }
}

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html
      lang="en"
      className="overscroll-contain scroll-smooth"
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <Providers>
          <CookiesBanner />

          <CookiesBannerTrigger />

          <div className="relative flex h-screen flex-col">
            <Header />

            <Toaster
              position="top-center"
              toastOptions={{
                className: 'min-h-[65px] text-base pl-8 md:min-w-[450px]',
                classNames: {
                  closeButton:
                    'right-0 left-auto top-1/2 -translate-x-[50%] -translate-y-[50%] !text-black mr-4 !w-6 !h-6',
                  title: 'ml-2 mr-10'
                }
              }}
            />

            {children}

            <Footer />
          </div>

          <ClientTrackVisit session={session} />

          <OfflineNotification />

          <ServiceWorkerRegistration />
        </Providers>
      </body>
    </html>
  )
}
