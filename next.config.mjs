import withSvgr from 'next-svgr'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, immutable'
          }
        ]
      }
    ]
  },

  images: {
    formats: ['image/avif', 'image/webp'],

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
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    }
  }
}

export default withSvgr(nextConfig)
