import withSvgr from 'next-svgr'
import crypto from 'crypto'
import fs from 'fs'

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
  },

  generateBuildId: async () => {
    // Generating a unique hash for the cache version
    const timestamp = new Date().toISOString()
    const buildHash = crypto
      .createHash('md5')
      .update(timestamp)
      .digest('hex')
      .slice(0, 8)

    // Creating the contents of the file cache-version.js
    const cacheVersionContent = `
      // This file is auto-generated during build
      self.__CACHE_VERSION = '${buildHash}';
    `.trim()

    // Writing the file to the public directory
    fs.writeFileSync('./public/cache-version.js', cacheVersionContent)

    return buildHash
  }
}

export default withSvgr(nextConfig)
