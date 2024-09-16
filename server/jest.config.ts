import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'], // Ensure this points to your test directory
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transforms TypeScript files
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'], // Adjust if you have a setup file
  globalSetup: '<rootDir>/tests/globalSetup.ts', // Adjust if you have a global setup file
  globalTeardown: '<rootDir>/tests/globalTeardown.ts', // Adjust if you have a global teardown file
  testMatch: ['**/*.test.ts'], // Ensure Jest picks up test files with this pattern
};

export default config;
