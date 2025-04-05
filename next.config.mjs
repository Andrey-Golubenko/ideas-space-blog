import withSvgr from 'next-svgr'
import withSerwistInit from '@serwist/next'

const revision = crypto.randomUUID()

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  cacheOnNavigation: true,
  reloadOnOnline: true,
  additionalPrecacheEntries: [
    { url: '/~offline', revision },
    { url: '/', revision },
    { url: '/blog', revision },
    { url: '/categories', revision }
  ]
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      },
      {
        // Cache all static assets
        source:
          '/:all*(svg|jpg|jpeg|gif|png|webp|js|css|woff|woff2|ttf|eot)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/service-worker.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          }
        ]
      }
    ]
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com**',
        port: '',
        pathname: '**'
      }
    ]
  },

  eslint: {
    ignoreDuringBuilds: true
  },

  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    },
    optimizeServerReact: true
  },

  compress: true,
  poweredByHeader: false,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
}

export default withSerwist(withSvgr(nextConfig))
