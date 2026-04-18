import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

/** @type {import("jest").Config} */
const customConfig = {
  coverageProvider: "v8",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/e2e/", "<rootDir>/.next/"],
  collectCoverageFrom: [
    "lib/**/*.{ts,tsx}",
    "store/**/*.{ts,tsx}",
    "hooks/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "app/**/*.{ts,tsx}",
    "i18n/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/e2e/**",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@heroui/react$": "<rootDir>/test-utils/heroui-stub.tsx",
  },
};

export default createJestConfig(customConfig);
