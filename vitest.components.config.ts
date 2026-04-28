/**
 * Vitest config for component-only tests (jsdom, no Storybook browser workspace).
 * Use: npx vitest run --config vitest.components.config.ts
 */
import { defineConfig } from "vitest/config";
import path from "path";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@flow\/design-system/, replacement: path.resolve(__dirname, "packages/flow/src") },
      { find: /^@flow\/tokens/, replacement: path.resolve(__dirname, "packages/tokens/src") },
      { find: /^@flow\/icons/, replacement: path.resolve(__dirname, "packages/icons/src") },
      { find: /^@flow\/flags/, replacement: path.resolve(__dirname, "packages/flags/src") },
      {
        find: /^@flow\/primitives/,
        replacement: path.resolve(__dirname, "packages/primitives/src"),
      },
      {
        find: /^@flow\/components/,
        replacement: path.resolve(__dirname, "packages/components/src"),
      },
      { find: /^@flow\/patterns/, replacement: path.resolve(__dirname, "packages/patterns/src") },
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/test/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["src/test/node/**", "src/test/visual/**", "src/test/bench/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: [
        "packages/components/src/**/*.{ts,tsx}",
        "packages/patterns/src/**/*.{ts,tsx}",
        "packages/primitives/src/**/*.{ts,tsx}",
      ],
      exclude: [
        "packages/*/src/index.{ts,tsx}",
        "packages/*/src/global.d.ts",
        "**/*.stories.*",
      ],
      thresholds: {
        statements: 85,
        branches: 75,
        functions: 70,
        lines: 85,
      },
    },
  },
});
