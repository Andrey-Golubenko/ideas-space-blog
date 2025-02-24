import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  esbuild: {
    loader: 'tsx'
  },
  test: {
    alias: {
      '~': path.resolve(__dirname, './')
    },
    testTransformMode: {
      web: ['react']
    },
    environment: 'jsdom',
    deps: {
      interopDefault: true
    },
    server: {
      deps: {
        fallbackCJS: true
      }
    },
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  }
})
