import withSvgr from 'next-svgr'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
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
        // Cache other routes
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate'
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

export default withSvgr(nextConfig)
