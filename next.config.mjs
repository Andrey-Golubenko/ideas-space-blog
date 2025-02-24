import withSvgr from 'next-svgr'

/** @type {import('next').NextConfig} */
const nextConfig = {
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
