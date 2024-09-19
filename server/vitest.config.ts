import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'istanbul', // Use 'istanbul' or 'c8' based on what’s compatible
      reportsDirectory: './coverage', // Directory where coverage reports will be saved
      reporter: ['text', 'html'], // Output formats
    },
  },
});
