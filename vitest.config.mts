import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    alias: {
      '~': path.resolve(__dirname, './')
    },
    server: {
      deps: {
        inline: ['vitest-canvas-mock']
      }
    },
    environmentOptions: {
      jsdom: {
        resources: 'usable'
      }
    }
  }
})
