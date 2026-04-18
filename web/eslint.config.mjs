import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginJest from "eslint-plugin-jest";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "coverage/**",
      "playwright-report/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.test.{ts,tsx}", "test-utils/**", "jest.setup.tsx"],
    ...eslintPluginJest.configs["flat/recommended"],
    languageOptions: {
      globals: { ...globals.jest },
    },
  },
  {
    files: ["test-utils/heroui-stub.tsx"],
    rules: { "react/display-name": "off" },
  },
];

export default eslintConfig;
