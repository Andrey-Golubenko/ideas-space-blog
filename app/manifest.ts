import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ideas Space Blog',
    short_name: 'IdeasSpace',
    description: 'Ideas Space Blog - A Blogging Platform',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/icons/manifest-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/manifest-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/manifest-icon-192.maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icons/manifest-icon-512.maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    screenshots: [
      {
        src: '/screenshots/desktop-screenshot.png',
        sizes: '1280x720',
        type: 'image/png',
        // @ts-ignore
        label: 'Desktop view',
        form_factor: 'wide'
      },
      {
        src: '/screenshots/mobile-screenshot.png',
        sizes: '441x960',
        type: 'image/png',
        // @ts-ignore
        label: 'Mobile view'
      }
    ]
  }
}
