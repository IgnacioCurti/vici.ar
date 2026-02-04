import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
    restoreMocks: true,
    passWithNoTests: false,
    include: ['src/tests/**/*.spec.ts']
  },
  esbuild: {
    target: 'node16'
  }
})

// Notes:
// - `include` targets the `src/tests` folder so tests are co-located with source.
// - ESM + TypeScript is supported by Vitest's esbuild transformer.
