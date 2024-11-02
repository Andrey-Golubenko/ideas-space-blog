import withSvgr from 'next-svgr'

/** @type {import('next').NextConfig} */
const nextConfig = withSvgr({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
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
  },

  webpack(config, { isServer }) {
    // To sure that SVG files are processed using @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })

    return config
  }
})

export default nextConfig
