// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            exclude: ['**/types.ts', '**/run.ts']
        },
        testTimeout: 10000
    }
})
